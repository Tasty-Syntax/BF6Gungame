/**
 * sfx source creation and modification utility class
 * @author TastySyntax
 */

class Sfx {
  static playSound(soundEffect: mod.RuntimeSpawn_Common, volume: number): void;

  /**
   * Play a sound effect at a given volume for a single player.
   * @param soundEffect Sound effect enum value
   * @param volume Sound volume (0-100)
   * @param recipient Player to play the sound for
   */
  static playSound(
    soundEffect: mod.RuntimeSpawn_Common,
    volume: number,
    recipient: mod.Player
  ): void;

  static playSound(
    soundEffect: mod.RuntimeSpawn_Common,
    volume: number,
    recipient: mod.Team
  ): void;

  static playSound(
    soundEffect: mod.RuntimeSpawn_Common,
    volume: number = 100,
    recipient?: mod.Player | mod.Team
  ): void {
    const sound = this.spawnSoundObject(soundEffect);

    if (!recipient) {
      mod.PlaySound(sound, volume);
      return;
    }

    if (mod.IsType(recipient, mod.Types.Player)) {
      const player = new Player(recipient as mod.Player);
      player.playSoundPlayer(sound, volume);
    } else {
      mod.PlaySound(sound, volume, recipient as mod.Team);
    }
  }

  /**
   * Creates a soundobject that can be used for sound playing
   * @param soundEffect Soundeffect enum value
   * @param position Object position
   * @param rotation Object rotation
   * @param scale Object scale
   */
  private static spawnSoundObject(
    effect: mod.RuntimeSpawn_Common,
    position = mod.CreateVector(0, 0, 0),
    rotation = mod.CreateVector(0, 0, 0),
    scale = mod.CreateVector(0, 0, 0)
  ): mod.SFX {
    return mod.SpawnObject(effect, position, rotation, scale);
  }
}
