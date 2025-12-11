import { 
    StyleType 
} from "../node_modules/canvas-based-core/module.js";
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