function EndGame(playerWon: mod.Player) {
  if (!GameModeActive) {
    return;
  }

  UiText.displayCustomNotification(
    "EndGameWon",
    mod.CreateVector(0, 150, 0),
    mod.CreateVector(1000, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("{}", playerWon)
  )
    .setTextSize(70)
    .setTextAnchor(mod.UIAnchor.Center)
    .setTextBoxAlpha(0);

  UiText.displayCustomNotification(
    "WonTheGame",
    mod.CreateVector(0, 250, 0),
    mod.CreateVector(535, 50, 50),
    mod.UIAnchor.TopCenter,
    mod.Message("has won the Game!")
  )
    .setTextSize(70)
    .setTextBoxAlpha(0)
    .setTextAnchor(mod.UIAnchor.Center);

  GameModeActive = false;
  mod.EndGameMode(playerWon);
}
