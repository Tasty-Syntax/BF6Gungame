/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */

// Event: Player killed
function HandlePlayerKill(eventInfo: PlayerEarnedKill) {
  const getKillCount = () =>
    mod.GetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount)
    );

  mod.SetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
    mod.Add(getKillCount(), 1)
  );

  let playerLevel = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (playerLevel >= MAX_LEVEL) {
    EndGame(eventInfo.eventPlayer);
    return;
  }

  // If player reached 2 kills, level up
  if (getKillCount() >= 2) {
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      mod.Add(playerLevel, 1)
    );
    playerLevel += 1;

    mod.DisplayHighlightedWorldLogMessage(
      mod.Message("Level up!"),
      eventInfo.eventPlayer
    );
    PlaySoundPlayer(
      eventInfo.eventPlayer,
      mod.RuntimeSpawn_Common.SFX_UI_EOR_RankUp_Normal_OneShot2D,
      500
    );

    mod.SetUITextLabel(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      mod.Message("Level: {}", playerLevel + 1)
    );

    // reset killcount to 0
    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.KillCount),
      0
    );

    // set new player inventory
    SetupPlayer(eventInfo);
  }

  UpdateScoreboardForPlayer(
    eventInfo,
    playerLevel,
    mod.GetPlayerKills(eventInfo.eventPlayer),
    mod.GetPlayerDeaths(eventInfo.eventPlayer)
  );
}

// Event: Player died
function HandlePlayerDied(eventInfo: PlayerDied) {
  HandlePlayerLoseLevelOnKnifeDeath(eventInfo);
}

/* ---------------------------------------- */
/*                Event Handler             */
/* ---------------------------------------- */
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

// ########## Game functions ##########//

function HandlePlayerLoseLevelOnKnifeDeath(eventInfo: PlayerDied) {
  let playerLevel: number = mod.GetVariable(
    mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel)
  );

  if (playerLevel == 0) {
    return;
  }

  // Was player killed by melee?
  if (
    mod.EventDeathTypeCompare(
      eventInfo.eventDeathType,
      mod.PlayerDeathTypes.Melee
    )
  ) {
    playerLevel -= 1;

    mod.SetVariable(
      mod.ObjectVariable(eventInfo.eventPlayer, Variables.PlayerLevel),
      playerLevel
    );

    // Maybe put this into a function to save some lines of code
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName(
        "LevelMessage_" + mod.GetObjId(eventInfo.eventPlayer)
      ),
      mod.Message("Level: {}", playerLevel + 1)
    );

    UpdateScoreboardForPlayer(
      eventInfo,
      playerLevel,
      mod.GetPlayerKills(eventInfo.eventPlayer),
      mod.GetPlayerDeaths(eventInfo.eventPlayer)
    );
  }
}

