LD30
====

Team Rollo's Ludum Dare #30 Game Jam entry.  The game was created in 48 hours on 8/23/2014 - 8/24/2014.  The theme for this contest was "Connected Worlds."

You can view the game live at [http://periodic.github.io/LD30/](http://periodic.github.io/LD30/)

Map-Hook Entity Types
---------------------

For our designers:

* StartPosition: The player will use this object for their start position.  Create an object-area with this name or type to place where the player starts.  There should only be one per map.
* Goal: When both players are on goal blocks the level ends.  There should only be one per map.
* Ground: The ground layer helps define the base movable area.  Any empty tile in the ground layer is impassable.
* Impassable: Anything tagged as impassable is impassable.
* Pushable: The items with this tag will be pushable by the player.
* Hole: An object that acts as an impassable hole until a block is moved over it.  Once a Pushable is moved over the hole it will disappear and the Hole will be filled and passable by the player.

Credits
-------

Art: Zoe Patrick
Design: Brian Torrence, Lindasy Haven
Engineering: Drew Haven
Audio: Lindsay Haven
Production: Lindsay Haven

Volume and reload icons are from [Batch](http://adamwhitcroft.com/batch/) by Adam Whitcroft.
Music by Wolf Asylum via CC share-alike.
