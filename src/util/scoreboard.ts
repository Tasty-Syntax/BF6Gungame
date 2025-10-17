function PrepareScoreboardForGame(): void {
  new CustomScoreboard()
    .setType(mod.ScoreboardType.CustomFFA)
    .setHeaders("GunGame")
    .setColumnLabels("Level", "Kills", "Deaths")
    .setColumnWidth(1, 1, 1, 0, 0)
    .setSortingColumn(1, true);

  mod.SetGameModeTargetScore(MAX_LEVEL);
  mod.SetGameModeTimeLimit(20 * 60); // 20 minutes
}

function UpdateScoreboardForPlayer(
  eventInfo: any,
  playerLevel: number,
  killCount: number,
  deathCount: number
) {
  mod.SetScoreboardPlayerValues(
    eventInfo.eventPlayer,
    playerLevel + 1,
    killCount,
    deathCount
  );
}
