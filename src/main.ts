/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */

// Event: Game mode started
function InitGameMode() {
  CreateVersionBox();
  Weapons = CreateWeaponList();
  mod.EnableHQ(mod.GetHQ(0), true);
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(0));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(1));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(2));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(3));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(4));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(5));

  mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
  PrepareScoreboardForGame();

  GameModeActive = true;
}

let timestamp = 0;
function HandleOngoingPlayer(conditionState: any, eventInfo: any) {
  if (timestamp === mod.GetMatchTimeElapsed()) {
    return;
  }

  timestamp = mod.GetMatchTimeElapsed();

  // +1 to sync time with time in TAB UI
  const Time = Math.floor(mod.GetMatchTimeElapsed() + 1);
  const Minutes = Math.floor(Time / 60);
  const Seconds = Time % 60;

  if (mod.GetMatchTimeElapsed() == 0) {
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("Time"),
      mod.Message("Game not started!")
    );
  } else {
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("Time"),
      mod.Message("{} min : {} sec ", Minutes, Seconds)
    );
  }
}

function CreateVersionBox() {
  mod.AddUIText(
    "VersionBox",
    mod.CreateVector(15, 5, 10),
    mod.CreateVector(100, 50, 50),
    mod.UIAnchor.TopRight,
    mod.Message("v{}", VERSION)
  );
  mod.SetUITextSize(mod.FindUIWidgetWithName("VersionBox"), 20);
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("VersionBox"), 0);
}

function PrepareScoreboardForGame() {
  mod.SetScoreboardType(mod.ScoreboardType.CustomFFA);
  mod.SetScoreboardColumnNames(
    mod.Message("Level"),
    mod.Message("Kills"),
    mod.Message("Deaths")
  );
  mod.SetScoreboardColumnWidths(1, 1, 1, 0, 0);
  mod.SetScoreboardHeader(mod.Message("Gun Game"));
  mod.SetScoreboardSorting(1, false);
  mod.SetGameModeTargetScore(MAX_LEVEL);
  mod.SetGameModeTimeLimit(20 * 60); // 20 minutes
}

function UpdateScoreboardForPlayer(
  eventInfo: any,
  playerLevel: number,
  killCount: number,
  deathCount: number
) {
  mod.SetScoreboardPlayerValues(
    eventInfo.eventPlayer,
    playerLevel + 1,
    killCount,
    deathCount
  );
}

// Event: Player joined - Setup player
function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))

  if (
    !mod.FindUIWidgetWithName(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    )
  ) {
    mod.AddUIText(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer),
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(130, 50, 50),
      mod.UIAnchor.CenterLeft,
      mod.Message("Level: {}", 1),
      eventInfo.eventPlayer
    );
    mod.SetUIWidgetBgAlpha(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      0.25
    );
    mod.SetUITextSize(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      30
    );
  }

  if (!mod.FindUIWidgetWithName("Time")) {
    mod.AddUIText(
      "Time",
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(190, 50, 50),
      mod.UIAnchor.TopCenter,
      mod.Message("Match Time: {}", 1),
      eventInfo.eventPlayer
    );
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("Time"), 0.3);
    mod.SetUITextSize(mod.FindUIWidgetWithName("Time"), 25);
    mod.SetUITextAnchor(mod.FindUIWidgetWithName("Time"), mod.UIAnchor.Center);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    0,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}

// Event: Player respawned
function DeployPlayer(eventInfo: any) {
  SetupPlayer(eventInfo);
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(mod.CountOf(mod.AllPlayers()) + 1));
}

// Event: Player killed
function HandlePlayerKill(eventInfo: PlayerEarnedKill) {
  const getKillCount = () =>
    mod.GetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount)
    );

  mod.SetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
    mod.Add(getKillCount(), 1)
  );

  let playerLevel = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (playerLevel >= MAX_LEVEL) {
    EndGame(eventInfo.eventPlayer);
    return;
  }

  // If player reached 2 kills, level up
  if (getKillCount() >= 2) {
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      mod.Add(playerLevel, 1)
    );
    playerLevel += 1;

    mod.DisplayHighlightedWorldLogMessage(
      mod.Message("Level up!"),
      eventInfo.eventPlayer
    );
    PlaySoundPlayer(
      eventInfo.eventPlayer,
      mod.RuntimeSpawn_Common.SFX_UI_EOR_RankUp_Normal_OneShot2D,
      500
    );

    mod.SetUITextLabel(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      mod.Message("Level: {}", playerLevel + 1)
    );

    // reset killcount to 0
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
      0
    );

    // set new player inventory
    SetupPlayer(eventInfo);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    playerLevel,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}

// Event: Player died
function HandlePlayerDied(eventInfo: PlayerDied) {
  HandlePlayerLoseLevelOnKnifeDeath(eventInfo);
}

/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */
export function OnGameModeStarted() {
  const eventInfo = {};
  InitGameMode();
}

export function OngoingPlayer(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer: eventPlayer };
  let eventNum = 0;
  HandleOngoingPlayer(
    modlib.getPlayerCondition(eventPlayer, eventNum++),
    eventInfo
  );
}

export function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };
  InitPlayerOnJoin(eventInfo);
}

export function OnPlayerDeployed(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };

  DeployPlayer(eventInfo);
}

export async function OnPlayerEarnedKill(
  eventPlayer: mod.Player,
  eventOtherPlayer: mod.Player,
  eventDeathType: mod.DeathType,
  eventWeaponUnlock: mod.WeaponUnlock
) {
  const eventInfo: PlayerEarnedKill = {
    eventPlayer,
    eventOtherPlayer,
    eventDeathType,
    eventWeaponUnlock,
  };

  if (GameModeActive == false) {
    return;
  }

  HandlePlayerKill(eventInfo);

  const playerLevel: number = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  // Maybe put this into a new function
  if (playerLevel == MAX_LEVEL) {
    if (
      mod.EventDeathTypeCompare(
        eventInfo.eventDeathType,
        mod.PlayerDeathTypes.Melee
      )
    ) {
      return;
    }

    mod.AddUIText(
      "FinalLevel",
      mod.CreateVector(0, 250, 0),
      mod.CreateVector(600, 50, 50),
      mod.UIAnchor.TopCenter,
      mod.Message(
        "Player {} has reached the last level!",
        eventInfo.eventPlayer
      )
    );
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("FinalLevel"), 0.5);
    mod.SetUITextSize(mod.FindUIWidgetWithName("FinalLevel"), 25);
    mod.SetUIWidgetBgColor(
      mod.FindUIWidgetWithName("FinalLevel"),
      mod.CreateVector(1, 0.5, 0)
    );
    mod.SetUITextAnchor(
      mod.FindUIWidgetWithName("FinalLevel"),
      mod.UIAnchor.Center
    );

    PlaySound(mod.RuntimeSpawn_Common.SFX_UI_Matchmaking_Start_OneShot2D, 1000);
    PlaySound(
      mod.RuntimeSpawn_Common.SFX_UI_Notification_SectorTaken_Reveal_OneShot2D,
      1000
    );

    await mod.Wait(5);
    mod.DeleteUIWidget(mod.FindUIWidgetWithName("FinalLevel"));
  }
}

export function OnPlayerDied(
  eventPlayer: mod.Player,
  eventOtherPlayer: mod.Player,
  eventDeathType: mod.DeathType,
  eventWeaponUnlock: mod.WeaponUnlock
) {
  const eventInfo: PlayerDied = {
    eventPlayer,
    eventOtherPlayer,
    eventDeathType,
    eventWeaponUnlock,
  };

  HandlePlayerDied(eventInfo);
}

// ########## Game functions ##########//

function EndGame(playerWon: mod.Player) {
  if (!GameModeActive) {
    return;
  }

  mod.AddUIText(
    "EndGameWon",
    mod.CreateVector(0, 150, 0),
    mod.CreateVector(1000, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("{}", playerWon)
  );

  mod.AddUIText(
    "WonTheGame",
    mod.CreateVector(0, 250, 0),
    mod.CreateVector(535, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("has won the Game!")
  );

  mod.SetUITextSize(mod.FindUIWidgetWithName("EndGameWon"), 70);
  mod.SetUITextAnchor(
    mod.FindUIWidgetWithName("EndGameWon"),
    mod.UIAnchor.Center
  );
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("EndGameWon"), 0);
  mod.SetUITextSize(mod.FindUIWidgetWithName("WonTheGame"), 70);
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("WonTheGame"), 0);
  mod.SetUITextAnchor(
    mod.FindUIWidgetWithName("WonTheGame"),
    mod.UIAnchor.Center
  );

  GameModeActive = false;
  mod.EndGameMode(playerWon);
}

function SetupPlayer(eventInfo: any) {
  mod.RemoveEquipment(eventInfo.eventPlayer, mod.InventorySlots.PrimaryWeapon);
  mod.RemoveEquipment(eventInfo.eventPlayer, mod.InventorySlots.MeleeWeapon);
  mod.RemoveEquipment(eventInfo.eventPlayer, mod.InventorySlots.Throwable);
  mod.RemoveEquipment(
    eventInfo.eventPlayer,
    mod.InventorySlots.SecondaryWeapon
  );

  const playerLevel: number = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (playerLevel < MAX_LEVEL) {
    const item = Weapons[playerLevel];
    Equip(item, eventInfo.eventPlayer);
    // mod.AddEquipment(eventInfo.eventPlayer, );
    // mod.AddEquipment(eventInfo.eventPlayer, mod.Gadgets.Melee_Combat_Knife);
  } else {
    SetKnifeWeapon(eventInfo.eventPlayer);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    playerLevel,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}

function SetKnifeWeapon(player: mod.Player) {
  // Remove old weapon
  UnequipAll(player);
  mod.AddEquipment(player, mod.Gadgets.Melee_Combat_Knife);
}

function UnequipAll(player: mod.Player) {
  mod.RemoveEquipment(player, mod.InventorySlots.PrimaryWeapon);
  mod.RemoveEquipment(player, mod.InventorySlots.SecondaryWeapon);
  mod.RemoveEquipment(player, mod.InventorySlots.GadgetOne);
  mod.RemoveEquipment(player, mod.InventorySlots.GadgetTwo);
  mod.RemoveEquipment(player, mod.InventorySlots.Throwable);
}

function Equip(item: WeaponItem, player: mod.Player) {
  if (item.weaponType === WeaponType.Weapon) {
    EquipWeapon(player, item.item as mod.Weapons);
  } else if (item.weaponType === WeaponType.Gadget) {
    EquipGadget(player, item.item as mod.Gadgets, item.gadgetPosition);
  }
  mod.AddEquipment(player, mod.Gadgets.Melee_Combat_Knife);
}

function EquipGadget(
  player: mod.Player,
  gadget: mod.Gadgets,
  gadgetPosition: number = 1
) {
  UnequipAll(player);
  mod.AddEquipment(player, gadget, mod.InventorySlots.GadgetOne);
  mod.ForceSwitchInventory(player, mod.InventorySlots.GadgetOne);
}

function EquipWeapon(player: mod.Player, weapon: mod.Weapons) {
  UnequipAll(player);

  mod.AddEquipment(player, weapon);
  mod.ForceSwitchInventory(player, mod.InventorySlots.PrimaryWeapon);
}

function HandlePlayerLoseLevelOnKnifeDeath(eventInfo: PlayerDied) {
  let playerLevel: number = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (playerLevel == 0) {
    return;
  }

  // Was player killed by melee?
  if (
    mod.EventDeathTypeCompare(
      eventInfo.eventDeathType,
      mod.PlayerDeathTypes.Melee
    )
  ) {
    playerLevel -= 1;

    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      playerLevel
    );

    // Maybe put this into a function to save some lines of code
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      mod.Message("Level: {}", playerLevel + 1)
    );

    UpdateScoreboardForPlayer(
      eventInfo,
      playerLevel,
      mod.GetPlayerKills(eventInfo.eventPlayer),
      mod.GetPlayerDeaths(eventInfo.eventPlayer)
    );
  }
}

function CreateWeaponList(): WeaponItem[] {
  const sidearms = WrapWeaponType(
    [
      mod.Weapons.Sidearm_ES_57,
      mod.Weapons.Sidearm_M44,
      mod.Weapons.Sidearm_M45A1,
      mod.Weapons.Sidearm_P18,
    ],
    WeaponType.Weapon
  );

  const shotguns = WrapWeaponType(
    [
      mod.Weapons.Shotgun__185KS_K,
      mod.Weapons.Shotgun_M1014,
      mod.Weapons.Shotgun_M87A1,
    ],
    WeaponType.Weapon
  );

  const smgs = WrapWeaponType(
    [
      mod.Weapons.SMG_KV9,
      mod.Weapons.SMG_PW5A3,
      mod.Weapons.SMG_PW7A2,
      mod.Weapons.SMG_SCW_10,
      mod.Weapons.SMG_SGX,
      mod.Weapons.SMG_SL9,
      mod.Weapons.SMG_UMG_40,
      mod.Weapons.SMG_USG_90,
    ],
    WeaponType.Weapon
  );

  const assaultRifles = WrapWeaponType(
    [
      mod.Weapons.AssaultRifle_AK4D,
      mod.Weapons.AssaultRifle_B36A4,
      mod.Weapons.AssaultRifle_KORD_6P67,
      mod.Weapons.AssaultRifle_L85A3,
      mod.Weapons.AssaultRifle_M433,
      mod.Weapons.AssaultRifle_NVO_228E,
      mod.Weapons.AssaultRifle_SOR_556_Mk2,
      mod.Weapons.AssaultRifle_TR_7,
    ],
    WeaponType.Weapon
  );

  const carbines = WrapWeaponType(
    [
      mod.Weapons.Carbine_AK_205,
      mod.Weapons.Carbine_GRT_BC,
      mod.Weapons.Carbine_M277,
      mod.Weapons.Carbine_M417_A2,
      mod.Weapons.Carbine_M4A1,
      mod.Weapons.Carbine_QBZ_192,
      mod.Weapons.Carbine_SG_553R,
    ],
    WeaponType.Weapon
  );

  const dmrs = WrapWeaponType(
    [
      mod.Weapons.DMR_LMR27,
      mod.Weapons.DMR_M39_EMR,
      mod.Weapons.DMR_SVDM,
      mod.Weapons.DMR_SVK_86,
    ],
    WeaponType.Weapon
  );

  const lmgs = WrapWeaponType(
    [
      mod.Weapons.LMG_DRS_IAR,
      mod.Weapons.LMG_KTS100_MK8,
      mod.Weapons.LMG_L110,
      mod.Weapons.LMG_M_60,
      mod.Weapons.LMG_M123K,
      mod.Weapons.LMG_M240L,
      mod.Weapons.LMG_M250,
      mod.Weapons.LMG_RPKM,
    ],
    WeaponType.Weapon
  );

  const snipers = WrapWeaponType(
    [
      mod.Weapons.Sniper_M2010_ESR,
      mod.Weapons.Sniper_PSR,
      mod.Weapons.Sniper_SV_98,
    ],
    WeaponType.Weapon
  );

  // const rocketLaunchers: WeaponItem[] = WrapWeaponType([
  //   mod.Gadgets.Launcher_Unguided_Rocket,
  // ], WeaponType.Gadget, GadgetPosition.GadgetOne);

  function PickRandom<T>(arr: T[], n: number): T[] {
    const len = arr.length;
    if (n >= len) {
      return arr.slice();
    }
    const a = arr.slice();
    for (let i = len - 1; i > len - 1 - n; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(len - n);
  }

  const result: WeaponItem[] = [
    ...PickRandom(sidearms, 2),
    // ...PickRandom(rocketLaunchers, 1),
    ...PickRandom(shotguns, 1),
    ...PickRandom(smgs, 2),
    ...PickRandom(assaultRifles, 3),
    ...PickRandom(carbines, 2),
    ...PickRandom(dmrs, 2),
    ...PickRandom(lmgs, 2),
    ...PickRandom(snipers, 1),
  ];

  return result;
}

function PlaySound(SoundEffect: any, Volume: number = 100) {
  var StartSFX = mod.SpawnObject(
    SoundEffect,
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0)
  );
  mod.EnableSFX(StartSFX, true);
  mod.PlaySound(StartSFX, Volume);
}

function PlaySoundPlayer(
  player: mod.Player,
  SoundEffect: any,
  Volume: number = 100
) {
  var StartSFX = mod.SpawnObject(
    SoundEffect,
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0)
  );
  mod.EnableSFX(StartSFX, true);
  mod.PlaySound(StartSFX, Volume, player);
}

function WrapWeaponType(
  weapons: Array<mod.Weapons | mod.Gadgets>,
  weaponType: WeaponType,
  gadgetPosition?: GadgetPosition
): WeaponItem[] {
  return weapons.map((item) => ({
    item,
    weaponType,
    gadgetPosition,
  }));
}
