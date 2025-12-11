import { Rect2D } from "../../model/rect2D.js";
import { StyleType } from "../styleType.js";

export class CanvasRect2D extends Rect2D {

    //props
    ctx;
    styleType;
    style;

    constructor(ctx, x, y, height, width, style = "#000000", styleType = StyleType.FILL, xVelocity = 0.00, yVelocity = 0.00) {
        super(x, y, height, width, xVelocity, yVelocity);
        this.ctx = ctx;
        this.styleType = styleType;
        this.style = style;
    }

    setCTX(val){
        this.ctx = val;
        return this;
    }

    setStyleType(val){
        this.styleType = val;
        return this;
    }

    setStyle(val){
        this.style = val;
        return this;
    }

    draw(){
        this.#resolveDraw();
    }

    #resolveDraw(){
        switch(this.styleType){
            case StyleType.FILL:
                this.ctx.fillStyle = this.style;
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case StyleType.STROKE:
                this.ctx.strokeStyle = this.style;
                this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    clear(){
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    rotate(degree){
        this.ctx.save();
        this.degree = (this.degree + degree) % 360;
        const rad = this.degree * (Math.PI / 180);
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(rad);
        this.ctx.fillRect((-this.width / 2), (-this.height / 2), this.width, this.height);
        this.ctx.resetTransform();
        this.ctx.restore();
    }

}