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

/* ---------------------------------------- */
/*                  Variables               */
/* ---------------------------------------- */
/**
 * Randomized weapons list
 */
let Weapons: Array<mod.Weapons> = [];

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
  mod.EnableHQ(mod.GetHQ(1), true);
  mod.SetSpawnMode(mod.SpawnModes.AutoSpawn)
  PrepareScoreboardForGame();
}

function PrepareScoreboardForGame() {
  mod.SetScoreboardType(mod.ScoreboardType.CustomFFA)
  mod.SetScoreboardColumnNames(mod.Message("Player"), mod.Message("Kills"), mod.Message("Level"))
  mod.SetScoreboardHeader(mod.Message("Gun Game"))
  mod.SetScoreboardSorting(2, false)
  mod.SetGameModeTargetScore(MAX_LEVEL)
}

function UpdateScoreboardForPlayer(eventInfo: any, killCount: number, playerLevel: number) {
  mod.SetScoreboardPlayerValues(eventInfo.eventPlayer, eventInfo.eventPlayer, killCount, playerLevel)
}

// Event: Player joined - Setup player
function DrawPlayerLevelUiText(eventInfo: any) {
  mod.AddUIText(
    "LevelMessage_" + String(eventInfo.eventPlayer),
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(150, 50, 50),
    mod.UIAnchor.CenterLeft,
    mod.Message("Level: {}", 1),
    eventInfo.eventPlayer
  );
  mod.SetUIWidgetBgAlpha(
    mod.FindUIWidgetWithName("LevelMessage_" + String(eventInfo.eventPlayer)),
    0.25
  );
  mod.SetUITextSize(
    mod.FindUIWidgetWithName("LevelMessage_" + String(eventInfo.eventPlayer)),
    30
  );
}

// Event: Player respawned
function DeployPlayer(eventInfo: any) {
  SetupPlayer(eventInfo);
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
  

  const playerLevel = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (getKillCount() >= 2) {
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      mod.Add(playerLevel, 1)
    );

    mod.DisplayHighlightedWorldLogMessage(
      mod.Message("Level up!"),
      eventInfo.eventPlayer
    );
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("LevelMessage_" + String(eventInfo.eventPlayer)),
      mod.Message("Level: {}", playerLevel + 1)
    );

    // reset killcount to 0
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
      0
    );

    UpdateScoreboardForPlayer(eventInfo, mod.GetPlayerKills(eventInfo.eventPlayer), playerLevel);
    // set new player inventory
    SetupPlayer(eventInfo);
  }
}

// Event: Player died
function HandlePlayerDied(eventInfo: PlayerDied) {
  mod.DeployPlayer(eventInfo.eventPlayer);
}

/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */
export function OnGameModeStarted() {
  const eventInfo = {};
  let eventNum = 0;
  InitGameMode();
}

export function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };
  let eventNum = 0;
  DrawPlayerLevelUiText(
    eventInfo
  );
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
    mod.AddEquipment(eventInfo.eventPlayer, Weapons[playerLevel]);
    mod.AddEquipment(eventInfo.eventPlayer, mod.Gadgets.Melee_Combat_Knife);
  } else {
    SetKnifeWeapon(eventInfo.eventPlayer);
  } 
}

function SetKnifeWeapon(player: mod.Player) {
  // Remove old weapon
  mod.RemoveEquipment(player, mod.InventorySlots.PrimaryWeapon);
  mod.RemoveEquipment(player, mod.InventorySlots.SecondaryWeapon);
  mod.AddEquipment(player, mod.Gadgets.Misc_Defibrillator);

  mod.ForceSwitchInventory(player, mod.InventorySlots.GadgetOne);
}

function CreateWeaponList(): any[] {
  const sidearms = [
    mod.Weapons.Sidearm_ES_57,
    mod.Weapons.Sidearm_M44,
    mod.Weapons.Sidearm_M45A1,
    mod.Weapons.Sidearm_P18,
  ];

  const shotguns = [
    mod.Weapons.Shotgun__185KS_K,
    mod.Weapons.Shotgun_M1014,
    mod.Weapons.Shotgun_M87A1,
  ];

  const smgs = [
    mod.Weapons.SMG_KV9,
    mod.Weapons.SMG_PW5A3,
    mod.Weapons.SMG_PW7A2,
    mod.Weapons.SMG_SCW_10,
    mod.Weapons.SMG_SGX,
    mod.Weapons.SMG_SL9,
    mod.Weapons.SMG_UMG_40,
    mod.Weapons.SMG_USG_90,
  ];

  const assaultRifles = [
    mod.Weapons.AssaultRifle_AK4D,
    mod.Weapons.AssaultRifle_B36A4,
    mod.Weapons.AssaultRifle_KORD_6P67,
    mod.Weapons.AssaultRifle_L85A3,
    mod.Weapons.AssaultRifle_M433,
    mod.Weapons.AssaultRifle_NVO_228E,
    mod.Weapons.AssaultRifle_SOR_556_Mk2,
    mod.Weapons.AssaultRifle_TR_7,
  ];

  const carbines = [
    mod.Weapons.Carbine_AK_205,
    mod.Weapons.Carbine_GRT_BC,
    mod.Weapons.Carbine_M277,
    mod.Weapons.Carbine_M417_A2,
    mod.Weapons.Carbine_M4A1,
    mod.Weapons.Carbine_QBZ_192,
    mod.Weapons.Carbine_SG_553R,
  ];

  const dmrs = [
    mod.Weapons.DMR_LMR27,
    mod.Weapons.DMR_M39_EMR,
    mod.Weapons.DMR_SVDM,
    mod.Weapons.DMR_SVK_86,
  ];

  const lmgs = [
    mod.Weapons.LMG_DRS_IAR,
    mod.Weapons.LMG_KTS100_MK8,
    mod.Weapons.LMG_L110,
    mod.Weapons.LMG_M_60,
    mod.Weapons.LMG_M123K,
    mod.Weapons.LMG_M240L,
    mod.Weapons.LMG_M250,
    mod.Weapons.LMG_RPKM,
  ];

  const snipers = [
    mod.Weapons.Sniper_M2010_ESR,
    mod.Weapons.Sniper_PSR,
    mod.Weapons.Sniper_SV_98,
  ];

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

  const result = [
    ...PickRandom(sidearms, 2),
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