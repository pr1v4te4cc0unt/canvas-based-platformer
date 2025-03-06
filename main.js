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

    await gameObjects.forEach(async (gameObject) => {
        await gameObject.update();
    });

    await environmentObjects.forEach(async (environmentObject) => {
        await player.onGameObjectCollision(environmentObject);
        await enemies.forEach((enemy) => {
            enemy.onGameObjectCollision(environmentObject);
        });
        environmentObject.x -= player.currentXVelocity;
    });

    onGoalCollision();
    onDeath();
}

function pauseGame(){
    IS_PAUSED = !IS_PAUSED;
}

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var IS_PAUSED = true;

var currentLevel = 0;

const levelsJson = await getJsonFileAsync("./assets/levels.json");

var playerKeyBoardControlMap = new KeyboardControlMap(KeyCode.KeyW, KeyCode.KeyS, KeyCode.KeyA, KeyCode.KeyD, KeyCode.Space);
var player = new Player(ctx, 0, (canvas.height / 2), 5, 5)
             .setKeyBoardControlMap(playerKeyBoardControlMap);
player.registerEventListeners(document);

var backgroundMusic = new Audio(levelsJson.levels[currentLevel].backgroundMusic);

var platforms = levelsJson.levels[currentLevel].platformPositions.map((platformPosition) => new Platform(ctx, platformPosition[0], platformPosition[1]));

var goal = new Goal(ctx, levelsJson.levels[currentLevel].goalPosition[0], levelsJson.levels[0].goalPosition[1]);

var enemies = levelsJson.levels[currentLevel].enemyPositions.map((enemyPosition) => new Enemy(ctx, enemyPosition[0], enemyPosition[1]));

var environmentObjects = [...platforms, goal, ...enemies];

var gameObjects = [player, ...environmentObjects];

const startGameContainer = document.querySelector("#startGameContainer");
const startButton = document.querySelector("#startButton");
const gameContainer = document.querySelector("#gameContainer");
const gameButtonContainer = document.querySelector("#gameButtonContainer");
const pauseButton = document.querySelector("#pauseButton");
const restartButton = document.querySelector("#restartButton");

const levelCompleteAudio = new Audio("./assets/music/06. Level Complete.mp3");
const deathAudio = new Audio('./assets/sounds/08. Lost a Life.mp3');

function onGoalCollision(){
    if(CollisionDetection2D.collisionDetected(goal, player)){
        if(CollisionDetection2D.topCollisionDetected(goal, player)){
            player.setCurrentXVelocity(0);
            player.setCurrentYVelocity(0);
        }
        else if(CollisionDetection2D.bottomCollisionDetected(goal, player)){
            player.setCurrentYVelocity(0);
        }
        else if(CollisionDetection2D.leftCollisionDetected(goal, player)){
            player.setCurrentXVelocity(0);
            player.setCurrentYVelocity(0);
        }
        else if(CollisionDetection2D.rightCollisionDetected(goal, player)){
            player.setCurrentXVelocity(0);
            player.setCurrentYVelocity(0);
        }
        backgroundMusic.pause();
        levelCompleteAudio.play();
        pauseGame();

        setTimeout(async () => { 
            await loadNextLevel();
            pauseGame(IS_PAUSED);
            await animate();
        }, 10000)
    }
};

function onDeath(){
    if(CanvasCollisionDetection2D.bottomCollisionDetected(player, ctx)){
        backgroundMusic.pause();
        player.deathAudio.play();
        pauseGame();
        setTimeout(async () => { 
            await generateLevel();
            pauseGame(IS_PAUSED);
            await animate();
        }, 5000)
    }
}

async function generateLevel(){
    player.deregisterEventListeners(document);
    player = new Player(ctx, 0, (canvas.height / 2), 5, 5)
             .setKeyBoardControlMap(playerKeyBoardControlMap);
    player.registerEventListeners(document);
    backgroundMusic = new Audio(levelsJson.levels[currentLevel].backgroundMusic);
    platforms = levelsJson.levels[currentLevel].platformPositions.map((platformPosition) => new Platform(ctx, platformPosition[0], platformPosition[1]));
    goal = new Goal(ctx, levelsJson.levels[currentLevel].goalPosition[0], levelsJson.levels[0].goalPosition[1]);
    enemies = levelsJson.levels[currentLevel].enemyPositions.map((enemyPosition) => new Enemy(ctx, enemyPosition[0], enemyPosition[1]));
    environmentObjects = [...platforms, goal, ...enemies];
    gameObjects = [player, ...environmentObjects];
    backgroundMusic.play();
}

async function loadNextLevel(){
    currentLevel++;
    await generateLevel();
}

pauseButton.addEventListener('click', (event) => {
    
    pauseGame(IS_PAUSED);
    animate();

}, false);

startButton.addEventListener('click', (event) => {

    startGameContainer.style.display = "none";
    gameContainer.style.display = "flex";
    gameButtonContainer.style.display = "flex";

    setTimeout(async () => { 
        await generateLevel();
        pauseGame(IS_PAUSED);
        await animate();
    }, 1000)

}, false);