type PlayerEarnedKill = {
  eventPlayer: mod.Player;
  eventOtherPlayer: mod.Player;
  eventDeathType: mod.DeathType;
  eventWeaponUnlock: mod.WeaponUnlock;
};

type PlayerDied = {
  eventPlayer: mod.Player;
  eventOtherPlayer: mod.Player;
  eventDeathType: mod.DeathType;
  eventWeaponUnlock: mod.WeaponUnlock;
};

enum WeaponType {
  Weapon,
  Gadget,
}

enum GadgetPosition {
  GadgetOne = mod.InventorySlots.GadgetOne,
  GadgetTwo = mod.InventorySlots.GadgetTwo,
  MiscGadget = mod.InventorySlots.MiscGadget,
  ClassGadget = mod.InventorySlots.ClassGadget,
}

type WeaponItem = {
  item: mod.Weapons | mod.Gadgets;
  weaponType: WeaponType;
  gadgetPosition?: GadgetPosition;
};
