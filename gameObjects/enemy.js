import { CanvasCollisionDetection2D } from "../canvas/environment/canvasCollisionDetection2D.js";
import { CollisionDetection } from "../canvas/model/collisionDetection/collisionDetection.js";
import { CollisionDetection2D } from "../canvas/model/collisionDetection/collisionDetection2D.js";
import { StyleType } from "../canvas/model/styleType.js";
import { GameObjectType } from "./gameObjectType.js";
import { GameObject } from "./gameObject.js";

export class Enemy extends GameObject {

    //property, ctor
    isGrounded = false;

    constructor(ctx, x, y, height = 5, width = 5, xVelocity = -0.1, yVelocity = 0, styleType = StyleType.STROKE, style = "#000000"){
        super(ctx, x, y, height, width, xVelocity, yVelocity, styleType, style);
        this.gameObjectType = GameObjectType.ENEMY;
        this.defaultGravity = 0.05;
    }

    //

    async update() {
        this.#calculateXPosition();
        this.#calculateYPosition();
        super.resolveDraw();
        this.onEnvironmentCollision();
        this.#move();
    }

    async onEnvironmentCollision(){
        if(CanvasCollisionDetection2D.topCollisionDetected(this, this.ctx)){
            this.setCurrentYVelocity(0);
        }
        
        if(CanvasCollisionDetection2D.bottomCollisionDetected(this, this.ctx)){
            this.setCurrentYVelocity(0);
            this.isGrounded = true;
        }

        if(CanvasCollisionDetection2D.leftCollisionDetected(this, this.ctx)){
            this.setCurrentXVelocity(0);
        }
        
        if(CanvasCollisionDetection2D.rightCollisionDetected(this, this.ctx)){
            this.setCurrentXVelocity(0);
        }
    }

    async onGameObjectCollision(obj){
        let collisionDetected = false;
        switch(obj.gameObjectType){
            case GameObjectType.PLATFORM:
                console.log(`${obj.gameObjectType} collision detected!`);
                collisionDetected = await this.#onPlatformCollision(obj);
                break;
        }
    }

    async #onPlatformCollision(obj){
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
            this.gravitySpeed += this.defaultGravity;
        }
    }

    #move(){
        this.x += this.xVelocity;
    }
}