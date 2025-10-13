function PrepareScoreboardForGame() {
  mod.SetScoreboardType(mod.ScoreboardType.CustomFFA);
  mod.SetScoreboardColumnNames(
    mod.Message("Level"),
    mod.Message("Kills"),
    mod.Message("Deaths")
  );
  mod.SetScoreboardColumnWidths(1, 1, 1, 0, 0);
  mod.SetScoreboardHeader(mod.Message("Gun Game"));
  mod.SetScoreboardSorting(1, false);
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
