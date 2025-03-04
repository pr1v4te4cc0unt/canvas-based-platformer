import { CanvasCollisionDetection2D } from "../canvas/environment/canvasCollisionDetection2D.js";
import { CollisionDetection } from "../canvas/model/collisionDetection/collisionDetection.js";
import { CollisionDetection2D } from "../canvas/model/collisionDetection/collisionDetection2D.js";
import { StyleType } from "../canvas/model/styleType.js";
import { GameObject } from "./gameObject.js";
import { GameObjectType } from "./gameObjectType.js";

export class Player extends GameObject {

    //property, ctor
    isColliding = false;
    isGrounded = false;
    jumpAudio = new Audio("../assets/sounds/maro-jump-sound-effect_1.mp3");
    deathAudio = new Audio('../assets/sounds/08. Lost a Life.mp3');

    constructor(ctx, x, y, height = 5, width = 5, xVelocity = 2, yVelocity = 4, styleType = StyleType.FILL, style = "#000000", keyboardControlMap = null, currentXVelocity = 0, currentYVelocity = 0, incrementingXVelocity = 0.10, incrementingYVelocity = 0.10, defaultGravity = 0.05){
        super(ctx, x, y, height, width, xVelocity, yVelocity, styleType, style, keyboardControlMap, currentXVelocity, currentYVelocity, incrementingXVelocity, incrementingYVelocity, defaultGravity);
        this.GameObjectType = GameObjectType.PLAYER;
    }

    //

    update(objArray) {
        this.#calculateXPosition();
        this.#calculateYPosition();
        this.resolveDraw();
        this.onEnvironmentCollision();
    }

    onCollision(objArray){
        this.onGameObjectCollision(objArray);
        this.onEnvironmentCollision();
    }

    onEnvironmentCollision(){
        if(CanvasCollisionDetection2D.topCollisionDetected(this, this.ctx)){
            console.log("Environment collision detected: TOP.");
            this.setCurrentYVelocity(0);
        }
        
        if(CanvasCollisionDetection2D.bottomCollisionDetected(this, this.ctx)){
            console.log("Environment collision detected: BOTTOM.");
            this.setCurrentYVelocity(0);
        }

        if(CanvasCollisionDetection2D.leftCollisionDetected(this, this.ctx)){
            console.log("Environment collision detected: LEFT.");
            this.setCurrentXVelocity(0);
        }
        
        if(CanvasCollisionDetection2D.rightCollisionDetected(this, this.ctx)){
            console.log("Environment collision detected: RIGHT.");
            this.setCurrentXVelocity(0);
        }
    }

    onGameObjectCollision(obj){
        let collisionDetected = false;
        switch(obj.gameObjectType){
            case GameObjectType.PLATFORM:
                console.log(`${obj.gameObjectType} collision detected!`);
                collisionDetected = this.#onPlatformCollision(obj);
                break;
            case GameObjectType.ENEMY:
                console.log(`${obj.gameObjectType} collision detected!`);
                collisionDetected = this.#onEnemyCollision(obj);
                break;
        }
    }

    #onPlatformCollision(obj){
        if(CollisionDetection2D.topCollisionDetected(this, obj)){
            this.setCurrentYVelocity(0);
        }
        else if(CollisionDetection2D.bottomCollisionDetected(this, obj)){
            this.setCurrentYVelocity(0);
            this.isGrounded = true;
        }
        else if(CollisionDetection2D.leftCollisionDetected(this, obj)){
            this.setCurrentXVelocity(0);
        }
        else if(CollisionDetection2D.rightCollisionDetected(this, obj)){
            this.setCurrentXVelocity(0);
        }
    }

    #onEnemyCollision(obj){
        if(CollisionDetection2D.collisionDetected(this, obj)){
            if(CollisionDetection2D.topCollisionDetected(this, obj)){
                this.setCurrentXVelocity(0);
                this.setCurrentYVelocity(0);
            }
            else if(CollisionDetection2D.bottomCollisionDetected(this, obj)){
                this.setCurrentYVelocity(0);
            }
            else if(CollisionDetection2D.leftCollisionDetected(this, obj)){
                this.setCurrentXVelocity(0);
                this.setCurrentYVelocity(0);
            }
            else if(CollisionDetection2D.rightCollisionDetected(this, obj)){
                this.setCurrentXVelocity(0);
                this.setCurrentYVelocity(0);
            }
        }
    }

    #calculateXPosition(){
        this.x += this.currentXVelocity;
    }
    
    #calculateYPosition(){
        this.#calculateGravitySpeed();
        this.y += this.currentYVelocity + this.gravitySpeed;
    }

    #calculateGravitySpeed(){
        if(this.isGrounded){
            this.setGravitySpeed(0);
        }
        else{
            if(this.gravitySpeed < 50){
                this.gravitySpeed += this.defaultGravity;
            }
        }
    }

    //actions

    jump(){
        if(this.isGrounded){
            this.playAudio(this.jumpAudio);
            this.setCurrentYVelocity((-1 * this.yVelocity));
            this.isGrounded = false;
        }
    }

    #move(event){
        console.log(`${this.constructor.name} move`);
        switch(event.code){
            case this.keyboardControlMap.action:
                // console.log("ArrowUp");
                this.jump();
                break;
            case this.keyboardControlMap.down:
                // console.log("ArrowDown");
                this.setCurrentYVelocity(Math.abs(this.yVelocity));
                break;
            case this.keyboardControlMap.left:
                // console.log("ArrowLeft");
                this.setCurrentXVelocity((-1 * this.xVelocity));
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowRight");
                this.setCurrentXVelocity(Math.abs(this.xVelocity));
                break;
        }
    }

    #stop(event){
        console.log(`${this.constructor.name} stop`);
        switch(event.code){
            case this.keyboardControlMap.action:
                // console.log("ArrowUp");
                this.setCurrentYVelocity(0);
                break;
            case this.keyboardControlMap.down:
                // console.log("ArrowDown");
                this.setCurrentYVelocity(0);
                break;
            case this.keyboardControlMap.left:
                // console.log("ArrowLeft");
                this.setCurrentXVelocity(0);
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowRight");
                this.setCurrentXVelocity(0);
                break;
        }
    }

    //listeners
    registerEventListeners(document){
        document.addEventListener('keydown', (event) => {

            this.#move(event);
        
        }, false);
        
        document.addEventListener('keyup', (event) => {
            
            this.#stop(event);
        
        }, false);
    }

    deregisterEventListeners(document){
        document.removeEventListener('keydown', (event) => {

            this.#move(event);
        
        }, false);
        
        document.removeEventListener('keyup', (event) => {
            
            this.#stop(event);
        
        }, false);
    }

    //audio
    playAudio(val){
        val.currentTime = 0;
        val.play();
    }
}