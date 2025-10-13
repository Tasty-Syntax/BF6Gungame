# Gun Game Mode - Battlefield 6 Portal

A classic Gun Game implementation for Battlefield 6 Portal, where players progress through weapon tiers by earning kills and race to be the first to complete all levels.  

# Usage Information
> If you end up using our code / scripts please make sure to credit TastySyntax in your gamemode!

## Overview

Gun Game is a team based game mode where players start with basic weapons and must earn kills to progress through increasingly powerful weapon tiers. The first player to complete all weapon levels and achieve the final knife kill wins the match.

## Game Rules

### Progression System

- **15 Weapon Levels**: Players must progress through 15 different weapon tiers
- **2 Kills per Level**: Players need 2 kills with their current weapon to advance to the next level
- **Final Level**: The last level requires players to use only a combat knife 🔪

### Weapon Tiers

The weapon progression follows this structure:

1. **Sidearms** (2 levels) - Starting weapons
2. **Shotguns** (1 level) - Close-range power
3. **SMGs** (2 levels) - Mobile firepower  
4. **Assault Rifles** (3 levels) - Versatile weapons
5. **Carbines** (2 levels) - Balanced options
6. **DMRs** (2 levels) - Precision shooting
7. **LMGs** (2 levels) - Heavy firepower
8. **Snipers** (1 level) - Long-range elimination
9. **Combat Knife** (Final level) - Melee only

### Special Rules
- **Knife Setback**: If killed by melee damage, players lose one weapon level (unless already at level 1)
- **Random Weapon Selection**: Each match randomly selects weapons from each category for variety
- **Auto-Spawn**: Players automatically respawn to keep the action flowing

## Features

### User Interface
- **Level Display**: Shows current weapon level in the top-left corner
- **Custom Scoreboard**: Displays kills and current level for all players
- **Level Up Notifications**: Highlighted messages when advancing weapon tiers
- **Win Announcement**: Full-screen victory message for the winning player

### Match Settings
- **Target Score**: First to complete all last meele kill after 15 levels wins

## Technical Details

### Key Components

- **Weapon Pool Management**: Randomized selection from predefined weapon categories
- **Player Progress Tracking**: Individual level and kill count variables per player
- **Dynamic Equipment**: Automatic weapon switching based on player level  
- **UI Management**: Real-time level display and scoreboard updates

### Event Handlers

- `OnGameModeStarted()`: Initializes weapon list and game settings
- `OnPlayerJoinGame()`: Sets up UI and scoreboard for new players  
- `OnPlayerDeployed()`: Equips appropriate weapon for player's level
- `OnPlayerEarnedKill()`: Handles level progression and weapon upgrades
- `OnPlayerDied()`: Manages knife death penalties

## Customization Options

### Weapon Categories
You can modify the weapon pools in the `CreateWeaponList()` function:
- Add or remove weapons from any category
- Adjust the number of weapons selected per tier
- Modify the `PickRandom()` counts for different match variety
