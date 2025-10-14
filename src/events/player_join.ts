function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))

  if (
    !mod.FindUIWidgetWithName(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    )
  ) {
    mod.AddUIText(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer),
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(130, 50, 50),
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

  if (!mod.FindUIWidgetWithName("Time")) {
    mod.AddUIText(
      "Time",
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(190, 50, 50),
      mod.UIAnchor.TopCenter,
      mod.Message("Match Time: {}", 1),
      eventInfo.eventPlayer
    );
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("Time"), 0.3);
    mod.SetUITextSize(mod.FindUIWidgetWithName("Time"), 25);
    mod.SetUITextAnchor(mod.FindUIWidgetWithName("Time"), mod.UIAnchor.Center);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    0,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}
