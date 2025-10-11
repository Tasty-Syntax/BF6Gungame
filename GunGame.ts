import * as modlib from "modlib";

/* ---------------------------------------- */
/*                  Types                   */
/* ---------------------------------------- */
type PlayerEarnedKill = {
    eventPlayer: mod.Player,
    eventOtherPlayer: mod.Player,
    eventDeathType: mod.DeathType,
    eventWeaponUnlock: mod.WeaponUnlock
}

/* ---------------------------------------- */
/*                  Variables               */
/* ---------------------------------------- */
let Weapons: Array<any> = [];

let currentWeapon = 0;
const MAX_LEVEL = 15;

enum Variables {
  PlayerLevel = 0,
  KillCount = 1
}

/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */

//########## Game event functions ##########//

// Event: Game mode started
function OnGameModeStarted_Prepare_Gamemode(conditionState: any) {
  let newState = true;
  if (!conditionState.update(newState)) {
    return;
  }
  RandomizeWeaponArray();
  mod.EnableHQ(mod.GetHQ(1), true);
}

// Event: Player respawned
function OnPlayerDeployed_GunGame(conditionState: any, eventInfo: any) {
  // let newState = true;
  // if (!conditionState.update(newState)) {
  //   return;
  // }

  SetupPlayer(eventInfo);
}

// Event: Player killed

function OnPlayerEarnedKill_GunGame(conditionState: any, eventInfo: any) {
  // let newState = OnPlayerDeployed_Neue_Regel_Condition(eventInfo);
  // if (!conditionState.update(newState)) {
  //   return;
  //   }

  mod.SetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
    mod.Add(
      mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount)),
      1
    )
  );
  mod.DisplayNotificationMessage(
    mod.Message("KILL EARNED"),
    eventInfo.eventPlayer
  );

  if (
    mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount)) >= 2
  ) {
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      mod.Add(
        mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)),
        1
      )
    );
    mod.DisplayNotificationMessage(
      mod.Message("LEVEL UP"),
      eventInfo.eventPlayer
    );
    mod.SetVariable(mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount), 0);

    SetupPlayer(eventInfo);
  }
}

// ######## Game events ##########//

export function OnGameModeStarted() {
  const eventInfo = {};
  let eventNum = 0;
  OnGameModeStarted_Prepare_Gamemode(modlib.getGlobalCondition(eventNum++));
}

export function OnPlayerDeployed(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };
  let eventNum = 2;
  OnPlayerDeployed_GunGame(
    modlib.getPlayerCondition(eventPlayer, eventNum++),
    eventInfo
  );
}


export function OnPlayerEarnedKill(
  eventPlayer: mod.Player,
  eventOtherPlayer: mod.Player,
  eventDeathType: mod.DeathType,
  eventWeaponUnlock: mod.WeaponUnlock
) {
  const eventInfo = {
    eventPlayer,
    eventOtherPlayer,
    eventDeathType,
    eventWeaponUnlock,
  };
  let eventNum = 3;
  OnPlayerEarnedKill_GunGame(
    modlib.getPlayerCondition(eventPlayer, eventNum++),
    eventInfo
  );
}

// ########## Game functions ##########//

function RandomizeWeaponArray() {
  shuffle(Weapons);
}

function SetupPlayer(eventInfo: any) {
  mod.RemoveEquipment(eventInfo.eventPlayer, mod.InventorySlots.PrimaryWeapon);
  mod.RemoveEquipment(eventInfo.eventPlayer, mod.InventorySlots.Throwable);
  mod.RemoveEquipment(
    eventInfo.eventPlayer,
    mod.InventorySlots.SecondaryWeapon
  );

  mod.AddEquipment(
    eventInfo.eventPlayer,
    Weapons[
      mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel))
    ]
  );
}

// Utility functions
const shuffle = (temp: any) => {
  temp.sort(() => Math.random() - 0.5);
};

function setKnifeWeapon(player: mod.Player) {
    // Remove old weapon
    mod.RemoveEquipment(player, mod.InventorySlots.PrimaryWeapon);
    mod.RemoveEquipment(
        player,
        mod.InventorySlots.SecondaryWeapon
    );
}

function createWeaponList(): any[] {

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

    // create list with pattern, two sidearms, one shotgun, two smgs, three assault rifles, two carbines, two dmrs, two lmgs, one sniper
    function pickRandom<T>(arr: T[], n: number): T[]  {
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
        ...pickRandom(sidearms, 2),
        ...pickRandom(shotguns, 1),
        ...pickRandom(smgs, 2),
        ...pickRandom(assaultRifles, 3),
        ...pickRandom(carbines, 2),
        ...pickRandom(dmrs, 2),
        ...pickRandom(lmgs, 2),
        ...pickRandom(snipers, 1),
    ];

    return result;

}


/*
    mod.Weapons.AssaultRifle_AK4D,
    mod.Weapons.AssaultRifle_B36A4,
    mod.Weapons.AssaultRifle_KORD_6P67,
    mod.Weapons.AssaultRifle_L85A3,
    mod.Weapons.AssaultRifle_M433,
    mod.Weapons.AssaultRifle_NVO_228E,
    mod.Weapons.AssaultRifle_SOR_556_Mk2,
    mod.Weapons.AssaultRifle_TR_7,
    mod.Weapons.Carbine_AK_205,
    mod.Weapons.Carbine_GRT_BC,
    mod.Weapons.Carbine_M277,
    mod.Weapons.Carbine_M417_A2,
    mod.Weapons.Carbine_M4A1,
    mod.Weapons.Carbine_QBZ_192,
    mod.Weapons.Carbine_SG_553R,
    mod.Weapons.DMR_LMR27,
    mod.Weapons.DMR_M39_EMR,
    mod.Weapons.DMR_SVDM,
    mod.Weapons.DMR_SVK_86,
    mod.Weapons.LMG_DRS_IAR,
    mod.Weapons.LMG_KTS100_MK8,
    mod.Weapons.LMG_L110,
    mod.Weapons.LMG_M_60,
    mod.Weapons.LMG_M123K,
    mod.Weapons.LMG_M240L,
    mod.Weapons.LMG_M250,
    mod.Weapons.LMG_RPKM,
    mod.Weapons.Shotgun__185KS_K,
    mod.Weapons.Shotgun_M1014,
    mod.Weapons.Shotgun_M87A1,
    mod.Weapons.Sidearm_ES_57,
    mod.Weapons.Sidearm_M44,
    mod.Weapons.Sidearm_M45A1,
    mod.Weapons.Sidearm_P18,
    mod.Weapons.SMG_KV9,
    mod.Weapons.SMG_PW5A3,
    mod.Weapons.SMG_PW7A2,
    mod.Weapons.SMG_SCW_10,
    mod.Weapons.SMG_SGX,
    mod.Weapons.SMG_SL9,
    mod.Weapons.SMG_UMG_40,
    mod.Weapons.SMG_USG_90,
    mod.Weapons.Sniper_M2010_ESR,
    mod.Weapons.Sniper_PSR,
    mod.Weapons.Sniper_SV_98,
    */