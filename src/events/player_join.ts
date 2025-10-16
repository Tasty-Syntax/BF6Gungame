function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))
  const player = new Player(eventInfo.eventPlayer);

  if (
    !mod.FindUIWidgetWithName(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    )
  ) {
    player
      .displayCustomNotification(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer),
        Vector3.zero().toModVector(),
        new Vector3(130, 50, 50).toModVector(),
        mod.UIAnchor.CenterLeft,
        mod.Message("Level: {}", 1)
      )
      .setTextBoxAlpha(0.25)
      .setTextSize(30);
  }

  player
    .displayCustomNotification(
      "Time",
      Vector3.zero().toModVector(),
      new Vector3(190, 50, 50).toModVector(),
      mod.UIAnchor.TopCenter,
      mod.Message("Match Time: {}", 1)
    )
    .setTextBoxAlpha(0.3)
    .setTextSize(25)
    .setTextAnchor(mod.UIAnchor.Center);

  UpdateScoreboardForPlayer(
    eventInfo,
    0,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}
