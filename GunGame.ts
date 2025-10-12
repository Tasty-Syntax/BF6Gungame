import * as modlib from "modlib";

/* ---------------------------------------- */
/*                  Types                   */
/* ---------------------------------------- */
type PlayerEarnedKill = {
  eventPlayer: mod.Player;
  eventOtherPlayer: mod.Player;
  eventDeathType: mod.DeathType;
  eventWeaponUnlock: mod.WeaponUnlock;
};

type PlayerDied = {
  eventPlayer: mod.Player;
  eventOtherPlayer: mod.Player;
  eventDeathType: mod.DeathType;
  eventWeaponUnlock: mod.WeaponUnlock;
};

enum WeaponType {
  Weapon,
  Gadget
};

enum GadgetPosition {
  GadgetOne = mod.InventorySlots.GadgetOne,
  GadgetTwo = mod.InventorySlots.GadgetTwo,
  MiscGadget = mod.InventorySlots.MiscGadget,
  ClassGadget = mod.InventorySlots.ClassGadget
}

type WeaponItem = {
  item: mod.Weapons | mod.Gadgets;
  weaponType: WeaponType;
  gadgetPosition?: GadgetPosition;
};

/* ---------------------------------------- */
/*                  Variables               */
/* ---------------------------------------- */
/**
 * Randomized weapons list
 */
let Weapons: Array<WeaponItem> = [];

/**
 * Max weapon playerlevel
 */
const MAX_LEVEL = 15;

/**
 * Variable IDs
 */
enum Variables {
  /** Weapon Gun Level Weapon */
  PlayerLevel = 0,
  /** Killcount to keep track of kills in each Weaponlevel */
  KillCount = 1,
}

/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */

// Event: Game mode started
function InitGameMode() {
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
}

function PrepareScoreboardForGame() {
  mod.SetScoreboardType(mod.ScoreboardType.CustomFFA);
  mod.SetScoreboardColumnNames(mod.Message("Kills"), mod.Message("Level"));
  mod.SetScoreboardHeader(mod.Message("Gun Game"));
  mod.SetScoreboardSorting(1, false);
  mod.SetGameModeTargetScore(MAX_LEVEL);
  mod.SetGameModeTimeLimit(20 * 60); // 20 minutes
}

function UpdateScoreboardForPlayer(
  eventInfo: any,
  killCount: number,
  playerLevel: number
) {
  mod.SetScoreboardPlayerValues(
    eventInfo.eventPlayer,
    killCount,
    playerLevel + 1
  );
}


// Event: Player joined - Setup player
function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))
  mod.DisplayNotificationMessage(
    mod.Message(
      "Player {} has reached the last level!",
      mod.CountOf(mod.AllPlayers()) 
    )
  );

  if (!mod.FindUIWidgetWithName("LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer))) {
    mod.AddUIText(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer),
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(150, 50, 50),
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

  UpdateScoreboardForPlayer(
    eventInfo,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    0
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
    mod.GetPlayerKills(eventInfo.eventPlayer),
    playerLevel
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

export function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };
  InitPlayerOnJoin(eventInfo);
}

export function OnPlayerDeployed(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };

  DeployPlayer(eventInfo);
}

export function OnPlayerEarnedKill(
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

  HandlePlayerKill(eventInfo);
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
  mod.AddUIText(
    "EndGameWon",
    mod.CreateVector(-50, 150, 0),
    mod.CreateVector(150, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("Player {} won the Game!", playerWon)
  );
  mod.SetUITextSize(mod.FindUIWidgetWithName("EndGameWon"), 70);
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("EndGameWon"), 0);

  mod.EndGameMode(playerWon);

  //Maybe:
  // await mod.Wait(2);
  // remove text
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
    mod.DisplayNotificationMessage(
      mod.Message(
        "Player {} has reached the last level!",
        eventInfo.eventPlayer
      )
    );

    SetKnifeWeapon(eventInfo.eventPlayer);
  }

  // To fix getting Level 0 randomly on join
  UpdateScoreboardForPlayer(
    eventInfo,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    playerLevel
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

function EquipGadget(player: mod.Player, gadget: mod.Gadgets, gadgetPosition: number = 1) {
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
      mod.GetPlayerKills(eventInfo.eventPlayer),
      playerLevel
    );
  }
}

function CreateWeaponList(): WeaponItem[] {
  const sidearms = WrapWeaponType([
    mod.Weapons.Sidearm_ES_57,
    mod.Weapons.Sidearm_M44,
    mod.Weapons.Sidearm_M45A1,
    mod.Weapons.Sidearm_P18,
  ], WeaponType.Weapon);

  const shotguns = WrapWeaponType([
    mod.Weapons.Shotgun__185KS_K,
    mod.Weapons.Shotgun_M1014,
    mod.Weapons.Shotgun_M87A1,
  ], WeaponType.Weapon);

  const smgs = WrapWeaponType([
    mod.Weapons.SMG_KV9,
    mod.Weapons.SMG_PW5A3,
    mod.Weapons.SMG_PW7A2,
    mod.Weapons.SMG_SCW_10,
    mod.Weapons.SMG_SGX,
    mod.Weapons.SMG_SL9,
    mod.Weapons.SMG_UMG_40,
    mod.Weapons.SMG_USG_90,
  ], WeaponType.Weapon);

  const assaultRifles = WrapWeaponType([
    mod.Weapons.AssaultRifle_AK4D,
    mod.Weapons.AssaultRifle_B36A4,
    mod.Weapons.AssaultRifle_KORD_6P67,
    mod.Weapons.AssaultRifle_L85A3,
    mod.Weapons.AssaultRifle_M433,
    mod.Weapons.AssaultRifle_NVO_228E,
    mod.Weapons.AssaultRifle_SOR_556_Mk2,
    mod.Weapons.AssaultRifle_TR_7,
  ], WeaponType.Weapon);

  const carbines = WrapWeaponType([
    mod.Weapons.Carbine_AK_205,
    mod.Weapons.Carbine_GRT_BC,
    mod.Weapons.Carbine_M277,
    mod.Weapons.Carbine_M417_A2,
    mod.Weapons.Carbine_M4A1,
    mod.Weapons.Carbine_QBZ_192,
    mod.Weapons.Carbine_SG_553R,
  ], WeaponType.Weapon);

  const dmrs = WrapWeaponType([
    mod.Weapons.DMR_LMR27,
    mod.Weapons.DMR_M39_EMR,
    mod.Weapons.DMR_SVDM,
    mod.Weapons.DMR_SVK_86,
  ], WeaponType.Weapon);

  const lmgs = WrapWeaponType([
    mod.Weapons.LMG_DRS_IAR,
    mod.Weapons.LMG_KTS100_MK8,
    mod.Weapons.LMG_L110,
    mod.Weapons.LMG_M_60,
    mod.Weapons.LMG_M123K,
    mod.Weapons.LMG_M240L,
    mod.Weapons.LMG_M250,
    mod.Weapons.LMG_RPKM,
  ], WeaponType.Weapon);

  const snipers = WrapWeaponType([
    mod.Weapons.Sniper_M2010_ESR,
    mod.Weapons.Sniper_PSR,
    mod.Weapons.Sniper_SV_98,
  ], WeaponType.Weapon);

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

function WrapWeaponType(weapons: Array<mod.Weapons | mod.Gadgets>, weaponType: WeaponType, gadgetPosition?: GadgetPosition): WeaponItem[] {
  return weapons.map(item => ({
    item,
    weaponType,
    gadgetPosition
  }));
}

// Nice schwanz bro: 74
