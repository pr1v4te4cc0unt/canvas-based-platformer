export class ObjectBase2D {

    //props
    //type int
    x;
    y;
    //type float
    xVelocity;
    yVelocity;

    //ctor
    constructor(x, y, xVelocity = 0.00, yVelocity = 0.00) {
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    //prop methods
    setX(val){
        this.x = val;
        return this;
    }

    setY(val){
        this.y = val;
        return this;
    }

    setXVelocity(val){
        this.xVelocity = val;
        return this;
    }

    setYVelocity(val){
        this.yVelocity = val;
        return this;
    }
    //

    moveXByXVelocity(){
        this.x += this.xVelocity;
    }

    moveYByYVelocity(){
        this.y += this.yVelocity;
    }
}