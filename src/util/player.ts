function SetupPlayer(eventInfo: any) {
  const player = new Player(eventInfo.eventPlayer);
  player.unequipAll();
  player.equipGadget(
    mod.Gadgets.Melee_Combat_Knife,
    mod.InventorySlots.MeleeWeapon
  );

  const playerLevel: number = player.getVar(Variables.PlayerLevel);

  if (playerLevel < MAX_LEVEL) {
    const item = Weapons[playerLevel];
    if (item.weaponType === WeaponType.Weapon) {
      player.equipWeapon(item.item as mod.Weapons);
      player.forceSwitch(mod.InventorySlots.PrimaryWeapon);
    } else {
      player.equipGadget(item.item as mod.Gadgets, 1);
      player.forceSwitch(mod.InventorySlots.GadgetOne);
    }
  } else {
    player.unequipAll();
    player.equipGadget(mod.Gadgets.Melee_Hunting_Knife);
    player.forceSwitch(mod.InventorySlots.MeleeWeapon);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    playerLevel,
    player.kills,
    player.deaths
  );
}

function HandlePlayerLoseLevelOnKnifeDeath(eventInfo: PlayerDied) {
  const player = new Player(eventInfo.eventPlayer);

  let playerLevel: number = player.getVar(Variables.PlayerLevel);

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

    player.setVar(Variables.PlayerLevel, playerLevel);

    UiText.get(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    ).setMessage(mod.Message("Level: {}", playerLevel + 1));

    UpdateScoreboardForPlayer(
      eventInfo,
      playerLevel,
      mod.GetPlayerKills(eventInfo.eventPlayer),
      mod.GetPlayerDeaths(eventInfo.eventPlayer)
    );
  }
}
