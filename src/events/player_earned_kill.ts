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

    UiText.displayWorldLogNotification(
      mod.Message("Level up!"),
      eventInfo.eventPlayer
    );

    Sfx.playSound(
      mod.RuntimeSpawn_Common.SFX_UI_EOR_RankUp_Normal_OneShot2D,
      500,
      eventInfo.eventPlayer
    );

    UiText.get(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    ).setMessage(mod.Message("Level: {}", playerLevel + 1));

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
