export class Line2D {

    originX;
    originX;
    targetX;
    targetY;

    constructor(originX, originY, targetX, targetY){
        this.originX = originX;
        this.originY = originY;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    setOriginX(val){
        this.originX = val;
        return this;
    }

    setOriginY(val){
        this.originY = val;
        return this;
    }

    setTargetX(val){
        this.targetX = val;
        return this;
    }

    setTargetY(val){
        this.targetY = val;
        return this;
    }
}