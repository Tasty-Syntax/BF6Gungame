/**
 * Player utility class
 * @author TastySyntax
 */

class Team {
  /**
   * Player Wrapper
   * @param _team team (BF6)
   */
  constructor(private _team: mod.Team) {}

  get id(): number {
    return mod.GetObjId(this._team);
  }

  /**
   * get team name
   */
  get name(): string {
    return String(this._team);
  }

  playSoundTeam(soundEffect: mod.SFX, volume: number, recipient: mod.Team) {
    mod.EnableSFX(soundEffect, true);
    mod.PlaySound(soundEffect, volume, this._team);
  }

  displayCustomNotification(
    ...args: Parameters<(typeof UiText)["displayCustomNotification"]>
  ) {
    UiText.displayCustomNotification(...args);
  }
}
