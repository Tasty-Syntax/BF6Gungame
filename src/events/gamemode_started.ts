function InitGameMode() {
  CreateVersionBox();
  Weapons = CreateWeaponList();
  mod.EnableHQ(mod.GetHQ(0), true);
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(0));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(1));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(2));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(3));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(4));
  // mod.SetHQTeam(mod.GetHQ(0), mod.GetTeam(5));

  mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
  PrepareScoreboardForGame();

  GameModeActive = true;
}
