/**
 * Randomized weapons list
 */
let Weapons: Array<WeaponItem> = [];

/**
 * Max weapon playerlevel
 */
const MAX_LEVEL = 15;

/**
 * Gamemode Version
 */
const VERSION = "1.0.0";

/**
 * Variable IDs
 */
enum Variables {
  /** Weapon Gun Level Weapon */
  PlayerLevel = 0,
  /** Killcount to keep track of kills in each Weaponlevel */
  KillCount = 1,
}
