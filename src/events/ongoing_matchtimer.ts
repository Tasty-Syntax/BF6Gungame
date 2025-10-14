let timestamp = 0;
function HandleOngoingPlayer(conditionState: any, eventInfo: any) {
  if (timestamp === mod.GetMatchTimeElapsed()) {
    return;
  }

  timestamp = mod.GetMatchTimeElapsed();

  // +1 to sync time with time in TAB UI
  const Time = Math.floor(mod.GetMatchTimeElapsed() + 1);
  const Minutes = Math.floor(Time / 60);
  const Seconds = Time % 60;

  if (mod.GetMatchTimeElapsed() == 0) {
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("Time"),
      mod.Message("Game not started!")
    );
  } else {
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("Time"),
      mod.Message("{} min : {} sec ", Minutes, Seconds)
    );
  }
}
