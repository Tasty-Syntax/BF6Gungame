function PrepareScoreboardForGame(): void {
  CustomScoreboard.prepareScoreboard()
    .setScoreboardType(mod.ScoreboardType.CustomFFA)
    .setScoreBoardHeader("GunGame")
    .setScoreboardColumns("Level", "Kills", "Deaths")
    .setScoreboardColumnWidths(1, 1, 1, 0, 0);

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
