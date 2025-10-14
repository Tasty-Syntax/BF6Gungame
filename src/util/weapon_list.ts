function WrapWeaponType(
  weapons: Array<mod.Weapons | mod.Gadgets>,
  weaponType: WeaponType,
  gadgetPosition?: GadgetPosition
): WeaponItem[] {
  return weapons.map((item) => ({
    item,
    weaponType,
    gadgetPosition,
  }));
}

function CreateWeaponList(): WeaponItem[] {
  const sidearms = WrapWeaponType(
    [
      mod.Weapons.Sidearm_ES_57,
      mod.Weapons.Sidearm_M44,
      mod.Weapons.Sidearm_M45A1,
      mod.Weapons.Sidearm_P18,
    ],
    WeaponType.Weapon
  );

  const shotguns = WrapWeaponType(
    [
      mod.Weapons.Shotgun__185KS_K,
      mod.Weapons.Shotgun_M1014,
      mod.Weapons.Shotgun_M87A1,
    ],
    WeaponType.Weapon
  );

  const smgs = WrapWeaponType(
    [
      mod.Weapons.SMG_KV9,
      mod.Weapons.SMG_PW5A3,
      mod.Weapons.SMG_PW7A2,
      mod.Weapons.SMG_SCW_10,
      mod.Weapons.SMG_SGX,
      mod.Weapons.SMG_SL9,
      mod.Weapons.SMG_UMG_40,
      mod.Weapons.SMG_USG_90,
    ],
    WeaponType.Weapon
  );

  const assaultRifles = WrapWeaponType(
    [
      mod.Weapons.AssaultRifle_AK4D,
      mod.Weapons.AssaultRifle_B36A4,
      mod.Weapons.AssaultRifle_KORD_6P67,
      mod.Weapons.AssaultRifle_L85A3,
      mod.Weapons.AssaultRifle_M433,
      mod.Weapons.AssaultRifle_NVO_228E,
      mod.Weapons.AssaultRifle_SOR_556_Mk2,
      mod.Weapons.AssaultRifle_TR_7,
    ],
    WeaponType.Weapon
  );

  const carbines = WrapWeaponType(
    [
      mod.Weapons.Carbine_AK_205,
      mod.Weapons.Carbine_GRT_BC,
      mod.Weapons.Carbine_M277,
      mod.Weapons.Carbine_M417_A2,
      mod.Weapons.Carbine_M4A1,
      mod.Weapons.Carbine_QBZ_192,
      mod.Weapons.Carbine_SG_553R,
    ],
    WeaponType.Weapon
  );

  const dmrs = WrapWeaponType(
    [
      mod.Weapons.DMR_LMR27,
      mod.Weapons.DMR_M39_EMR,
      mod.Weapons.DMR_SVDM,
      mod.Weapons.DMR_SVK_86,
    ],
    WeaponType.Weapon
  );

  const lmgs = WrapWeaponType(
    [
      mod.Weapons.LMG_DRS_IAR,
      mod.Weapons.LMG_KTS100_MK8,
      mod.Weapons.LMG_L110,
      mod.Weapons.LMG_M_60,
      mod.Weapons.LMG_M123K,
      mod.Weapons.LMG_M240L,
      mod.Weapons.LMG_M250,
      mod.Weapons.LMG_RPKM,
    ],
    WeaponType.Weapon
  );

  const snipers = WrapWeaponType(
    [
      mod.Weapons.Sniper_M2010_ESR,
      mod.Weapons.Sniper_PSR,
      mod.Weapons.Sniper_SV_98,
    ],
    WeaponType.Weapon
  );

  // const rocketLaunchers: WeaponItem[] = WrapWeaponType([
  //   mod.Gadgets.Launcher_Unguided_Rocket,
  // ], WeaponType.Gadget, GadgetPosition.GadgetOne);

  function PickRandom<T>(arr: T[], n: number): T[] {
    const len = arr.length;
    if (n >= len) {
      return arr.slice();
    }
    const a = arr.slice();
    for (let i = len - 1; i > len - 1 - n; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(len - n);
  }

  const result: WeaponItem[] = [
    ...PickRandom(sidearms, 2),
    // ...PickRandom(rocketLaunchers, 1),
    ...PickRandom(shotguns, 1),
    ...PickRandom(smgs, 2),
    ...PickRandom(assaultRifles, 3),
    ...PickRandom(carbines, 2),
    ...PickRandom(dmrs, 2),
    ...PickRandom(lmgs, 2),
    ...PickRandom(snipers, 1),
  ];

  return result;
}
