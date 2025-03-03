import { FillRect } from "../canvas/model/fillRect.js";
import { CanvasCollisionDetection2D } from "../canvas/environment/canvasCollisionDetection2D.js";
import { CollisionDetection2D } from "../canvas/model/collisionDetection/collisionDetection2D.js";
import { CollisionDetection2DMotion } from "../canvas/model/collisionDetection/collisionDetection2DMotion.js";
import { GameObjectType } from "./gameObjectType.js";

export class Goal extends FillRect {

    //property, ctor
    gameObjectType = GameObjectType.GOAL;
    xVelocity;
    yVelocity;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = 0, height = 40, width = 2, fillStyle = "#000000") {
        super(ctx, x, y, height, width, fillStyle);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    setXVelocity(val){
        this.xVelocity = val;
        return this;
    }

    setYVelocity(val){
        this.yVelocity = val;
        return this;
    }

    update() {
        this.draw();
    }
}