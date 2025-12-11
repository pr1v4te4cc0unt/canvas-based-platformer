import { Arc2D } from "../../model/arc2D.js";
import { StyleType } from "../styleType.js";

export class CanvasArc2D extends Arc2D {

    //props
    ctx;
    styleType;
    style;

    constructor(ctx, x, y, radius = 0, startAngle = 0, endAngle = 0, styleType = StyleType.FILL, style = "#000000", xVelocity = 0.00, yVelocity = 0.00) {
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
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
                this.ctx.fill();
                break;
            case StyleType.STROKE:
                this.ctx.strokeStyle = this.style;
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
                this.ctx.stroke();
        }
    }

    clear(){
        const x = (this.x - this.radius);
        const y = (this.y - this.radius);
        const diameter = (this.radius * 2);
        this.ctx.clearRect(x, y, diameter, diameter);
    }
}