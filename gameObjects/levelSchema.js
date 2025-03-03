import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { Enemy } from "./enemy.js";

export class LevelSchema {
    
    id;
    name;
    playerPosition;
    platformPositions;
    enemyPositions;
    itemPositions;

    constructor(levelSchema) {
        this.id = levelSchema.id;
        this.name = levelSchema.name;
        this.playerPosition = levelSchema.playerPosition;
        this.platformPositions = levelSchema.platformPositions;
        this.itemPositions = levelSchema.itemPositions;
    }
}