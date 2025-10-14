/**
 * sfx source creation and modification utility class
 * @author TastySyntax
 */

class Sfx {
  private static playSoundPlayer(
    soundEffect: mod.RuntimeSpawn_Common,
    volume: number,
    recipient: mod.Player
  ) {
    var StartSFX = mod.SpawnObject(
      soundEffect,
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(0, 0, 0)
    );

    mod.EnableSFX(StartSFX, true);
    mod.PlaySound(StartSFX, volume, recipient);
  }

  private static playSoundTeam(
    soundEffect: mod.RuntimeSpawn_Common,
    volume: number,
    recipient: mod.Team
  ) {
    var StartSFX = mod.SpawnObject(
      soundEffect,
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(0, 0, 0),
      mod.CreateVector(0, 0, 0)
    );

    mod.EnableSFX(StartSFX, true);
    mod.PlaySound(StartSFX, volume, recipient);
  }

  static playSound(soundEffect: mod.RuntimeSpawn_Common, volume: number): void;

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
    if (mod.IsType(recipient, mod.Types.Player)) {
      this.playSoundPlayer(soundEffect, volume, recipient as mod.Player);
    } else if (mod.IsType(recipient, mod.Types.Team)) {
      this.playSoundTeam(soundEffect, volume, recipient as mod.Team);
    } else {
      var StartSFX = mod.SpawnObject(
        soundEffect,
        mod.CreateVector(0, 0, 0),
        mod.CreateVector(0, 0, 0),
        mod.CreateVector(0, 0, 0)
      );
      mod.EnableSFX(StartSFX, true);
      mod.PlaySound(StartSFX, volume);
    }
  }
}
