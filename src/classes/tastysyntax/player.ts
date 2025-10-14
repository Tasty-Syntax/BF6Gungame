/**
 * Player utility class
 * @author TastySyntax
 */
class Player {
  /**
   * Player Wrapper
   * @param _player player (BF6)
   */
  constructor(private _player: mod.Player) {}

  /**
   * get player id
   */
  get id(): number {
    return mod.GetObjId(this._player);
  }

  /**
   * get player name
   */
  get name(): string {
    return String(this._player);
  }

  /**
   * get kill count
   */
  get kills(): number {
    return mod.GetPlayerKills(this._player);
  }

  /**
   * get death count
   */
  get deaths(): number {
    return mod.GetPlayerDeaths(this._player);
  }

  /**
   * get current vehicle of player
   */
  get vehicle(): mod.Vehicle | null {
    return mod.GetVehicleFromPlayer(this._player);
  }

  /**
   * Set value of a player variable
   * @param variable variable id
   * @param value new value
   */
  setVar(variable: number, value: any): void {
    mod.SetVariable(mod.ObjectVariable(this._player, variable), value);
  }

  /**
   * Get value of a player variable
   * @param variable variable id
   * @returns value
   */
  getVar(variable: number): any {
    return mod.GetVariable(mod.ObjectVariable(this._player, variable));
  }

  /**
   * Equip weapon
   * @param item weapon
   */
  equip(item: mod.Weapons): void;
  /**
   * Equip gadget
   * @param item gadget
   * @param gadgetPosition gadget position
   */
  equip(item: mod.Gadgets, gadgetPosition: mod.InventorySlots): void;
  /**
   * Equip gadget or position
   * @param item weapon / gadget
   * @param gadgetPosition position
   */
  equip(
    item: mod.Weapons | mod.Gadgets,
    gadgetPosition: mod.InventorySlots = mod.InventorySlots.GadgetOne
  ): void {
    if (mod.IsType(item, mod.Types.Enum_Weapons)) {
      this.equipWeapon(item as mod.Weapons);
    } else {
      this.equipGadget(item as mod.Gadgets, gadgetPosition);
    }
  }

  /**
   * Equip gadget
   * @param gadget gadget
   * @param gadgetPosition inventory position
   */
  equipGadget(
    gadget: mod.Gadgets,
    gadgetPosition: mod.InventorySlots = mod.InventorySlots.GadgetOne
  ) {
    mod.AddEquipment(this._player, gadget, gadgetPosition);
  }

  /**
   * Equip weapon
   * @param weapon weapon
   */
  equipWeapon(weapon: mod.Weapons) {
    mod.AddEquipment(this._player, weapon);
  }

  /**
   * Force switch player to inventory position
   * @param inventorySlot inventory position
   */
  forceSwitch(inventorySlot: mod.InventorySlots) {
    mod.ForceSwitchInventory(this._player, inventorySlot);
  }

  /**
   * Unequip gadget / weapon from inventory position
   * @param inventorySlot inventory position
   */
  unequip(inventorySlot: mod.InventorySlots) {
    mod.RemoveEquipment(this._player, inventorySlot);
  }

  /**
   * Unequip all inventory slots
   */
  unequipAll() {
    mod.RemoveEquipment(this._player, mod.InventorySlots.PrimaryWeapon);
    mod.RemoveEquipment(this._player, mod.InventorySlots.SecondaryWeapon);
    mod.RemoveEquipment(this._player, mod.InventorySlots.GadgetOne);
    mod.RemoveEquipment(this._player, mod.InventorySlots.GadgetTwo);
    mod.RemoveEquipment(this._player, mod.InventorySlots.MeleeWeapon);
    mod.RemoveEquipment(this._player, mod.InventorySlots.MiscGadget);
    mod.RemoveEquipment(this._player, mod.InventorySlots.ClassGadget);
    mod.RemoveEquipment(this._player, mod.InventorySlots.Throwable);
  }
}
