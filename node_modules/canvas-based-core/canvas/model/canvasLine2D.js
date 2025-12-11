import { Line2D } from "../../model/line2D.js";

export class CanvasLine2D extends Line2D {

    ctx;
    style;

    constructor(ctx, originX, originY, targetX, targetY, style = "#000000"){
        super(originX, originY, targetX, targetY);
        this.ctx = ctx;
        this.style = style;
    }

    setCTX(val){
        this.ctx = val;
        return this;
    }

    draw(){
        this.ctx.strokeStyle = this.style;
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.targetX, this.targetY);
        this.ctx.stroke();
    }
}