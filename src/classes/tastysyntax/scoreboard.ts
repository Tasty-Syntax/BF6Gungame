type ScoreBoardColLabel = string | mod.Message;

/**
 * scoreboard creation and modification utility class
 * @author TastySyntax
 */
class CustomScoreboard {
  constructor() {}

  setHeaders(text1: string | mod.Message): CustomScoreboard;
  setHeaders(
    text1: string | mod.Message,
    text2?: string | mod.Message
  ): CustomScoreboard {
    text1 = typeof text1 === "string" ? mod.Message(text1) : text1;

    if (!text2) {
      mod.SetScoreboardHeader(text1);
      return this;
    }

    text2 = typeof text2 === "string" ? mod.Message(text2) : text2;
    mod.SetScoreboardHeader(text1, text2);

    return this;
  }
  /**
   * Sets scoreboard type
   */
  setType(type: mod.ScoreboardType) {
    mod.SetScoreboardType(type);
    return this;
  }

  setColumnLabels(col1: ScoreBoardColLabel): CustomScoreboard;
  setColumnLabels(
    col1: ScoreBoardColLabel,
    col2: ScoreBoardColLabel
  ): CustomScoreboard;
  setColumnLabels(
    col1: ScoreBoardColLabel,
    col2: ScoreBoardColLabel,
    col3: ScoreBoardColLabel
  ): CustomScoreboard;
  setColumnLabels(
    col1: ScoreBoardColLabel,
    col2: ScoreBoardColLabel,
    col3: ScoreBoardColLabel,
    col4: ScoreBoardColLabel
  ): CustomScoreboard;
  setColumnLabels(
    col1: ScoreBoardColLabel,
    col2: ScoreBoardColLabel,
    col3: ScoreBoardColLabel,
    col4: ScoreBoardColLabel,
    col5: ScoreBoardColLabel
  ): CustomScoreboard;
  setColumnLabels(...cols: ScoreBoardColLabel[]): CustomScoreboard {
    const labels = cols.map((label) => {
      if (typeof label === "string") {
        return mod.Message(label);
      }

      return label;
    });

    switch (labels.length) {
      case 1:
        mod.SetScoreboardColumnNames(labels[0]);
        break;
      case 2:
        mod.SetScoreboardColumnNames(labels[0], labels[1]);
        break;
      case 3:
        mod.SetScoreboardColumnNames(labels[0], labels[1], labels[2]);
        break;
      case 4:
        mod.SetScoreboardColumnNames(
          labels[0],
          labels[1],
          labels[2],
          labels[3]
        );
        break;
      case 5:
        mod.SetScoreboardColumnNames(
          labels[0],
          labels[1],
          labels[2],
          labels[3],
          labels[4]
        );
        break;
      default:
        throw new Error("Invalid number of columns. Must be between 1 and 5.");
    }

    return this;
  }
  setColumnWidth(col1: number): CustomScoreboard;
  setColumnWidth(col1: number, col2: number): CustomScoreboard;
  setColumnWidth(col1: number, col2: number, col3: number): CustomScoreboard;
  setColumnWidth(
    col1: number,
    col2: number,
    col3: number,
    col4: number
  ): CustomScoreboard;
  setColumnWidth(
    col1: number,
    col2: number,
    col3: number,
    col4: number,
    col5: number
  ): CustomScoreboard;
  setColumnWidth(...cols: number[]): CustomScoreboard {
    switch (cols.length) {
      case 1:
        mod.SetScoreboardColumnWidths(cols[0]);
        break;
      case 2:
        mod.SetScoreboardColumnWidths(cols[0], cols[1]);
        break;
      case 3:
        mod.SetScoreboardColumnWidths(cols[0], cols[1], cols[2]);
        break;
      case 4:
        mod.SetScoreboardColumnWidths(cols[0], cols[1], cols[2], cols[3]);
        break;
      case 5:
        mod.SetScoreboardColumnWidths(
          cols[0],
          cols[1],
          cols[2],
          cols[3],
          cols[4]
        );
        break;
      default:
        throw new Error("Invalid number of columns. Must be between 1 and 5.");
    }

    return this;
  }

  setSortingColumn(column: number, sortingDirection = false) {
    mod.SetScoreboardSorting(column, sortingDirection);
    return this;
  }
}
