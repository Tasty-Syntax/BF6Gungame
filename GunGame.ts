import * as modlib from "modlib";
const Weapons = [
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
];

const PlayerLevel = 0;
const KillCount = 1;

// function OnPlayerDeployed_Neue_Regel_Condition(eventInfo: any): boolean {
//   const newState = mod.Equals(true, true);
//   return newState;
// }

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
    mod.ObjectVariable(eventInfo.eventPlayer, KillCount),
    mod.Add(
      mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, KillCount)),
      1
    )
  );
  mod.DisplayNotificationMessage(
    mod.Message("KILL EARNED"),
    eventInfo.eventPlayer
  );

  if (
    mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, KillCount)) >= 2
  ) {
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, PlayerLevel),
      mod.Add(
        mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, PlayerLevel)),
        1
      )
    );
    mod.DisplayNotificationMessage(
      mod.Message("LEVEL UP"),
      eventInfo.eventPlayer
    );
    mod.SetVariable(mod.ObjectVariable(eventInfo.eventPlayer, KillCount), 0);

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
      mod.GetVariable(mod.ObjectVariable(eventInfo.eventPlayer, PlayerLevel))
    ]
  );
}

// Utility functions
const shuffle = (temp: any) => {
  temp.sort(() => Math.random() - 0.5);
};
