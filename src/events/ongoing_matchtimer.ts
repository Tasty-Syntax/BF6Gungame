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
    UiText.get("Time").setMessage("Game not started!");
  } else {
    UiText.get("Time").setMessage(
      mod.Message("{0} min : {1} sec", Minutes, Seconds)
    );
  }
}
