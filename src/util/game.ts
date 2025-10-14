function EndGame(playerWon: mod.Player) {
  if (!GameModeActive) {
    return;
  }

  mod.AddUIText(
    "EndGameWon",
    mod.CreateVector(0, 150, 0),
    mod.CreateVector(1000, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("{}", playerWon)
  );

  mod.AddUIText(
    "WonTheGame",
    mod.CreateVector(0, 250, 0),
    mod.CreateVector(535, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("has won the Game!")
  );

  mod.SetUITextSize(mod.FindUIWidgetWithName("EndGameWon"), 70);
  mod.SetUITextAnchor(
    mod.FindUIWidgetWithName("EndGameWon"),
    mod.UIAnchor.Center
  );
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("EndGameWon"), 0);
  mod.SetUITextSize(mod.FindUIWidgetWithName("WonTheGame"), 70);
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("WonTheGame"), 0);
  mod.SetUITextAnchor(
    mod.FindUIWidgetWithName("WonTheGame"),
    mod.UIAnchor.Center
  );

  GameModeActive = false;
  mod.EndGameMode(playerWon);
}
