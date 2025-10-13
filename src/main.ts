export function OnGameModeStarted() {
  InitGameMode();
}

export function OngoingPlayer(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer: eventPlayer };
  let eventNum = 0;

  HandleOngoingPlayer(
    modlib.getPlayerCondition(eventPlayer, eventNum++),
    eventInfo
  );

}
export function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };
  InitPlayerOnJoin(eventInfo);
}

export function OnPlayerDeployed(eventPlayer: mod.Player) {
  const eventInfo = { eventPlayer };

  DeployPlayer(eventInfo);
}

export async function OnPlayerEarnedKill(
  eventPlayer: mod.Player,
  eventOtherPlayer: mod.Player,
  eventDeathType: mod.DeathType,
  eventWeaponUnlock: mod.WeaponUnlock
) {
  const eventInfo: PlayerEarnedKill = {
    eventPlayer,
    eventOtherPlayer,
    eventDeathType,
    eventWeaponUnlock,
  };

  if (GameModeActive == false) {
    return;
  }

  HandlePlayerKill(eventInfo);

  const playerLevel: number = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  // Maybe put this into a new function
  if (playerLevel == MAX_LEVEL) {
    if (
      mod.EventDeathTypeCompare(
        eventInfo.eventDeathType,
        mod.PlayerDeathTypes.Melee
      )
    ) {
      return;
    }

    mod.AddUIText(
      "FinalLevel",
      mod.CreateVector(0, 250, 0),
      mod.CreateVector(600, 50, 50),
      mod.UIAnchor.TopCenter,
      mod.Message(
        "Player {} has reached the last level!",
        eventInfo.eventPlayer
      )
    );
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("FinalLevel"), 0.5);
    mod.SetUITextSize(mod.FindUIWidgetWithName("FinalLevel"), 25);
    mod.SetUIWidgetBgColor(
      mod.FindUIWidgetWithName("FinalLevel"),
      mod.CreateVector(1, 0.5, 0)
    );
    mod.SetUITextAnchor(
      mod.FindUIWidgetWithName("FinalLevel"),
      mod.UIAnchor.Center
    );

    PlaySound(mod.RuntimeSpawn_Common.SFX_UI_Matchmaking_Start_OneShot2D, 1000);
    PlaySound(
      mod.RuntimeSpawn_Common.SFX_UI_Notification_SectorTaken_Reveal_OneShot2D,
      1000
    );

    await mod.Wait(5);
    mod.DeleteUIWidget(mod.FindUIWidgetWithName("FinalLevel"));
  }
}

export function OnPlayerDied(
  eventPlayer: mod.Player,
  eventOtherPlayer: mod.Player,
  eventDeathType: mod.DeathType,
  eventWeaponUnlock: mod.WeaponUnlock
) {
  const eventInfo: PlayerDied = {
    eventPlayer,
    eventOtherPlayer,
    eventDeathType,
    eventWeaponUnlock,
  };

  HandlePlayerDied(eventInfo);
}

