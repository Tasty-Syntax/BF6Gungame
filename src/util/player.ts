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
