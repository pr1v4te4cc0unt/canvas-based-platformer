import { CanvasCollisionDetection2D } from "../canvas/environment/canvasCollisionDetection2D.js";
import { CollisionDetection } from "../canvas/model/collisionDetection/collisionDetection.js";
import { CollisionDetection2D } from "../canvas/model/collisionDetection/collisionDetection2D.js";
import { StyleType } from "../canvas/model/styleType.js";
import { GameObjectType } from "./gameObjectType.js";
import { GameObject } from "./gameObject.js";

export class Platform extends GameObject {

    //property, ctor

    constructor(ctx, x, y, height = 5, width = 10, xVelocity = 0, yVelocity = 0, styleType = StyleType.STROKE, style = "#000000"){
        super(ctx, x, y, height, width, xVelocity, yVelocity, styleType, style);
        this.gameObjectType = GameObjectType.PLATFORM;
    }

    update() {
        this.resolveDraw();
    }
}