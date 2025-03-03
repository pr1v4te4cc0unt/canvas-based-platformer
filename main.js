import { Shape } from "./canvas/model/shape.js";
import { FillShape } from "./canvas/model/fillShape.js";
import { FillRect } from "./canvas/model/fillRect.js";
import { StrokeShape } from "./canvas/model/strokeShape.js";
import { StrokeRect } from "./canvas/model/strokeRect.js";
import { CollisionDetection } from "./canvas/model/collisionDetection/collisionDetection.js";
import { CollisionDetection2D } from "./canvas/model/collisionDetection/collisionDetection2D.js";
import { Point2D } from "./geometry/point2D.js";
import { CanvasCollisionDetection } from "./canvas/environment/canvasCollisionDetection.js";
import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";
import { KeyCode } from "./controls/keyCode.js";
import { KeyboardControlMap } from "./controls/keyboardControlMap.js";
import { Platform } from "./gameObjects/platform.js";
import { Player } from "./gameObjects/player.js";
import { GameObject } from "./gameObjects/gameObject.js";
import { GameObjectType } from "./gameObjects/gameObjectType.js";
import { Goal } from "./gameObjects/goal.js";
import { Enemy } from "./gameObjects/enemy.js";
import { LevelSchema } from "./gameObjects/levelSchema.js";
import { Level } from "./gameObjects/level.js";
import { getJsonFileAsync } from "./utility/utility.js";
import { StyleType } from "./canvas/model/styleType.js";

async function animate(){
    if(IS_PAUSED){
        return;
    }

    requestAnimationFrame(await animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();

    platforms.forEach((platform) => {
        platform.update();
    });

    player.onGameObjectCollision(platforms);

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.onGameObjectCollision(platforms);
    });

    // player.update();
    // player.onGameObjectCollision(platforms);
    // player.onGameObjectCollision(enemies);
    
    // for(let i = 0; i < enemies.length; i++){
    //     console.log(i);
    //     enemies[i].onGameObjectCollision(platforms);
    // }

    // if(CanvasCollisionDetection2D.bottomCollisionDetected(player, ctx)){
    //     levelAudio.pause();
    //     pauseGame();
    // }

    // if(CollisionDetection2D.collisionDetected(player, goal)){
    //     levelAudio.pause();
    //     levelCompleteAudio.play();
    //     pauseGame();
    // }
}

function pauseGame(){
    IS_PAUSED = !IS_PAUSED;
}

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var IS_PAUSED = true;

var playerKeyBoardControlMap = new KeyboardControlMap(KeyCode.KeyW, KeyCode.KeyS, KeyCode.KeyA, KeyCode.KeyD, KeyCode.Space);
var player = new Player(ctx, 0, (canvas.height / 2), 5, 5)
             .setKeyBoardControlMap(playerKeyBoardControlMap);
player.registerEventListeners(document);

var enemyOne = new Enemy(ctx, 30, (canvas.height / 2));
var enemyTwo = new Enemy(ctx, 90, (canvas.height / 2));
var enemies = [enemyOne, enemyTwo];

const levelsJson = await getJsonFileAsync("./assets/levels.json");

var levelTwo = levelsJson.levels[1];

var platforms = levelTwo.platformPositions.map((platformPosition) => new Platform(ctx, platformPosition[0], platformPosition[1]));

var goal = new Goal(ctx, levelTwo.goalPosition[0], levelTwo.goalPosition[1]);

var environmentObjects = [...platforms, goal, ...enemies];

const startGameContainer = document.querySelector("#startGameContainer");
const startButton = document.querySelector("#startButton");
const gameContainer = document.querySelector("#gameContainer");
const gameButtonContainer = document.querySelector("#gameButtonContainer");
const pauseButton = document.querySelector("#pauseButton");
const restartButton = document.querySelector("#restartButton");

const levelCompleteAudio = new Audio("./assets/music/06. Level Complete.mp3");
const levelAudio = new Audio('./assets/music/01. Ground Theme.mp3');
const deathAudio = new Audio('./assets/sounds/08. Lost a Life.mp3');


pauseButton.addEventListener('click', (event) => {
    
    pauseGame(IS_PAUSED);
    animate();

}, false);

startButton.addEventListener('click', (event) => {
    
    setGame();

    startGameContainer.style.display = "none";
    gameContainer.style.display = "flex";
    gameButtonContainer.style.display = "flex";

    setTimeout(async () => { 
        pauseGame(IS_PAUSED);
        await animate();
        levelAudio.play();
    }, 1000)

}, false);

function setGame(){

}