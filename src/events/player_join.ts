function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))

  if (
    !mod.FindUIWidgetWithName(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    )
  ) {
    UiText.displayCustomNotification(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer),
      Vector3.zero().toModVector(),
      new Vector3(130, 50, 50).toModVector(),
      mod.UIAnchor.CenterLeft,
      mod.Message("Level: {}", 1),
      eventInfo.eventPlayer
    )
      .setTextBoxAlpha(0.25)
      .setTextSize(30);
  }

  UiText.displayCustomNotification(
    "Time",
    Vector3.zero().toModVector(),
    new Vector3(190, 50, 50).toModVector(),
    mod.UIAnchor.TopCenter,
    mod.Message("Match Time: {}", 1),
    eventInfo.eventPlayer
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
