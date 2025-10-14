/**
 * scoreboard creation and modification utility class
 * @author TastySyntax
 */

class CustomScoreboard {
  constructor() {}
  static prepareScoreboard() {
    return new CustomScoreboard();
  }

  //Sets scoreboard header
  setScoreBoardHeader(scoreBoardText: string): CustomScoreboard;
  setScoreBoardHeader(scoreBoardText: mod.Message): CustomScoreboard;
  setScoreBoardHeader(
    scoreBoardTeam1: string | mod.Message,
    scoreBoardTeam2: string | mod.Message
  ): CustomScoreboard;
  setScoreBoardHeader(
    scoreBoardText1: string | mod.Message,
    scoreBoardText2?: string | mod.Message
  ) {
    if (typeof scoreBoardText1 === "string") {
      scoreBoardText1 = mod.Message(scoreBoardText1);
    }
    if (scoreBoardText2) {
      if (typeof scoreBoardText2 === "string") {
        scoreBoardText2 = mod.Message(scoreBoardText2);
      }
      mod.SetScoreboardHeader(scoreBoardText1, scoreBoardText2);
    } else {
      mod.SetScoreboardHeader(scoreBoardText1);
    }
    return this;
  }

  //Sets scoreboard type
  setScoreboardType(scoreBoardType: mod.ScoreboardType) {
    mod.SetScoreboardType(scoreBoardType);
    return this;
  }

  //Sets scoreboard column names
  setScoreboardColumns(column1: string): CustomScoreboard;
  setScoreboardColumns(column1: mod.Message): CustomScoreboard;
  setScoreboardColumns(
    column1: string | mod.Message,
    column2: string | mod.Message
  ): CustomScoreboard;
  setScoreboardColumns(
    column1: string | mod.Message,
    column2: string | mod.Message,
    column3: string | mod.Message
  ): CustomScoreboard;
  setScoreboardColumns(
    column1: string | mod.Message,
    column2: string | mod.Message,
    column3: string | mod.Message,
    column4: string | mod.Message
  ): CustomScoreboard;
  setScoreboardColumns(
    column1: string | mod.Message,
    column2: string | mod.Message,
    column3: string | mod.Message,
    column4: string | mod.Message,
    column5: string | mod.Message
  ): CustomScoreboard;
  setScoreboardColumns(
    column1: string | mod.Message,
    column2?: string | mod.Message,
    column3?: string | mod.Message,
    column4?: string | mod.Message,
    column5?: string | mod.Message
  ) {
    if (column2 && !column3) {
      if (typeof column1 === "string") {
        column1 = mod.Message(column1);
      }
      if (typeof column2 === "string") {
        column2 = mod.Message(column2);
      }
      mod.SetScoreboardColumnNames(column1, column2);
    } else if (column2 && column3 && !column4) {
      if (typeof column1 === "string") {
        column1 = mod.Message(column1);
      }
      if (typeof column2 === "string") {
        column2 = mod.Message(column2);
      }
      if (typeof column3 === "string") {
        column3 = mod.Message(column3);
      }
      mod.SetScoreboardColumnNames(column1, column2, column3);
    } else if (column2 && column3 && column4 && !column5) {
      if (typeof column1 === "string") {
        column1 = mod.Message(column1);
      }
      if (typeof column2 === "string") {
        column2 = mod.Message(column2);
      }
      if (typeof column3 === "string") {
        column3 = mod.Message(column3);
      }
      if (typeof column4 === "string") {
        column4 = mod.Message(column4);
      }
      mod.SetScoreboardColumnNames(column1, column2, column3, column4);
    } else if (column2 && column3 && column4 && column5) {
      if (typeof column1 === "string") {
        column1 = mod.Message(column1);
      }
      if (typeof column2 === "string") {
        column2 = mod.Message(column2);
      }
      if (typeof column3 === "string") {
        column3 = mod.Message(column3);
      }
      if (typeof column4 === "string") {
        column4 = mod.Message(column4);
      }
      if (typeof column5 === "string") {
        column5 = mod.Message(column5);
      }
      mod.SetScoreboardColumnNames(column1, column2, column3, column4, column5);
    } else {
      if (typeof column1 === "string") {
        column1 = mod.Message(column1);
      }
      mod.SetScoreboardColumnNames(column1);
    }
    return this;
  }

  //Sets scoreboard column widths
  setScoreboardColumnWidths(column1Width: number): CustomScoreboard;
  setScoreboardColumnWidths(
    column1Width: number,
    column2width: number
  ): CustomScoreboard;
  setScoreboardColumnWidths(
    column1Width: number,
    column2width: number,
    column3width: number
  ): CustomScoreboard;
  setScoreboardColumnWidths(
    column1Width: number,
    column2width: number,
    column3width: number,
    column4width: number
  ): CustomScoreboard;
  setScoreboardColumnWidths(
    column1Width: number,
    column2width: number,
    column3width: number,
    column4width: number,
    column5width: number
  ): CustomScoreboard;

  setScoreboardColumnWidths(
    column1Width: number,
    column2Width?: number,
    column3Width?: number,
    column4Width?: number,
    column5Width?: number
  ) {
    if (column2Width && !column2Width) {
      mod.SetScoreboardColumnWidths(column1Width, column2Width);
    } else if (column2Width && column3Width && !column4Width) {
      mod.SetScoreboardColumnWidths(column1Width, column2Width, column3Width);
    } else if (column2Width && column3Width && column4Width && !column5Width) {
      mod.SetScoreboardColumnWidths(
        column1Width,
        column2Width,
        column3Width,
        column4Width
      );
    } else if (column2Width && column3Width && column4Width && column5Width) {
      mod.SetScoreboardColumnWidths(
        column1Width,
        column2Width,
        column3Width,
        column4Width,
        column5Width
      );
    } else {
      mod.SetScoreboardColumnWidths(column1Width);
    }
    return this;
  }

  //Defines sorting on scoreboard
  setScoreboardSorting(scoreBoardSorting: number, sortingDirection = false) {
    mod.SetScoreboardSorting(scoreBoardSorting, sortingDirection);
    return this;
  }
}
