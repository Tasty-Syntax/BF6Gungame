/**
 * Initializes a player on join.
 *
 * This function is called when a player joins the game. It sets up the player's UI and scoreboard.
 *
 * @param {any} eventInfo - The event info object passed to the function.
 */
function InitPlayerOnJoin(eventInfo: any) {
  // mod.SetTeam(eventInfo.eventPlayer, mod.GetTeam(2))

  if (
    !mod.FindUIWidgetWithName(
      "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
    )
  ) {
    //TODO: Move to player on next refactor
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

  //TODO: Move to player on next refactor
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
