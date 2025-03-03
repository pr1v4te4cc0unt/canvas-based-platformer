import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { Enemy } from "./enemy.js";

export class Level {

    ctx;
    levelSchema;
    id;
    name;
    player;
    platforms;
    enemies;
    items;


    constructor(ctx, levelSchema) {
        this.id = levelSchema.id;
        this.name = levelSchema.name;
        this.#generate();
    }

    #generate(){
        this.player = this.#generatePlayer();
        this.platforms = this.#generatePlatforms();
        this.enemies = this.#generateEnemies();
    }

    #generatePlayer(){
        return new Player(this.ctx, this.levelSchema.playerPosition[0], this.levelSchema.playerPosition[1]);
    }

    #generatePlatforms(){
        let platforms = [];
        for(let i = 0; i < this.platformPositions.length; i++){
            platforms.push(new Platform(this.ctx, this.levelSchema.platformPositions[0], this.levelSchema.platformPositions[1]));
        }
        return platforms;
    }

    #generateEnemies(){
        let enemies = [];
        for(let i = 0; i < this.enemyPositions.length; i++){
            enemies.push(new Platform(this.ctx, this.levelSchema.enemyPositions[0], this.levelSchema.enemyPositions[1]));
        }
        return enemies;
    }

}