import { 
    CanvasRect2D, 
    StyleType 
} from "../node_modules/canvas-based-core/module.js";
import { GameObjectType } from "./gameObjectType.js";

export class Goal extends CanvasRect2D {

    //property, ctor
    gameObjectType = GameObjectType.GOAL;
    xVelocity;
    yVelocity;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = 0, height = 40, width = 2, fillStyle = "#000000") {
        super(ctx, x, y, height, width, fillStyle);
        this.styleType = StyleType.FILL;
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

    async update() {
        super.draw();
    }
}