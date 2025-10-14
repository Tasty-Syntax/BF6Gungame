function PlaySound(SoundEffect: any, Volume: number = 100) {
  var StartSFX = mod.SpawnObject(
    SoundEffect,
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0)
  );
  mod.EnableSFX(StartSFX, true);
  mod.PlaySound(StartSFX, Volume);
}

function PlaySoundPlayer(
  player: mod.Player,
  SoundEffect: any,
  Volume: number = 100
) {
  var StartSFX = mod.SpawnObject(
    SoundEffect,
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0),
    mod.CreateVector(0, 0, 0)
  );
  mod.EnableSFX(StartSFX, true);
  mod.PlaySound(StartSFX, Volume, player);
}
