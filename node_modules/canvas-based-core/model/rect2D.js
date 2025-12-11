import { ObjectBase2D } from "./ObjectBase2D.js";

export class Rect2D extends ObjectBase2D {

    //props
    //type int
    height;
    width;

    constructor(x, y, height, width, xVelocity = 0.00, yVelocity = 0.00) {
        super(x, y, xVelocity, yVelocity);
        this.height = height;
        this.width = width;
    }

    setHeight(val){
        this.height = val;
        return this;
    }

    setWidth(val){
        this.width = val;
        return this;
    }

    getTopLeftCoord(){
        const x = this.x;
        const y = this.y;
        return new Point2D(x, y);
    }

    getTopRightCoord(){
        const x = (this.x + this.width);
        const y = this.y;
        return new Point2D(x, y);
    }

    getBottomRightCoord(){
        const x = (this.x + this.width);
        const y = (this.y + this.height);
        return new Point2D(x, y);
    }

    getBottomLeftCoord(){
        const x = this.x;
        const y = (this.y + this.height);
        return new Point2D(x, y);
    }

    getCenterCoord(){
        const x = ((this.x + this.width) / 2);
        const y = ((this.y + this.height) / 2);
        return new Point2D(x, y);
    }

    getCoordinates(){
        //clockwise from origin x, y ie topleft
        //[topleft, topright, bottomright, bottomleft, center]
        return [this.getTopLeftCoord(), this.getTopRightCoord(), this.getBottomRightCoord(), this.getBottomLeftCoord(), this.getCenterCoord()];
    }

}