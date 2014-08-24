LD30
====

Team Rolo's Ludum Dare 72 entry.

Map-Hook Entity Types
---------------------

* StartPosition: The player will use this object for their start position.  Create an object-area with this name or type to place where the player starts.  There should only be one per map.
* Goal: When both players are on goal blocks the level ends.  There should only be one per map.
* Ground: The ground layer helps define the base movable area.  Any empty tile in the ground layer is impassable.
* Impassable: Anything tagged as impassable is impassable.
* Pushable: The items with this tag will be pushable by the player.


