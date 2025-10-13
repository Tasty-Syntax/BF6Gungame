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

function UnequipAll(player: mod.Player) {
  mod.RemoveEquipment(player, mod.InventorySlots.PrimaryWeapon);
  mod.RemoveEquipment(player, mod.InventorySlots.SecondaryWeapon);
  mod.RemoveEquipment(player, mod.InventorySlots.GadgetOne);
  mod.RemoveEquipment(player, mod.InventorySlots.GadgetTwo);
  mod.RemoveEquipment(player, mod.InventorySlots.Throwable);
}

function SetKnifeWeapon(player: mod.Player) {
  // Remove old weapon
  UnequipAll(player);
  mod.AddEquipment(player, mod.Gadgets.Melee_Combat_Knife);
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
