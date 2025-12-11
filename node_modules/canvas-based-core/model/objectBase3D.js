import { ObjectBase2D } from "./ObjectBase2D.js";

export class ObjectBase3D extends ObjectBase2D {

    //props
    //type int
    z;
    //type float
    zVelocity;

    constructor(x, y, z, xVelocity = 0.00, yVelocity = 0.00, zVelocity = 0.00) {
        super(x, y, xVelocity, yVelocity);
        this.z = z;
        this.zVelocity = zVelocity;
    }

    setZ(val){
        this.z = val;
        return this;
    }

    setZVelocity(val){
        this.zVelocity = val;
        return this;
    }

    moveZByZVelocity(){
        this.z += this.zVelocity; 
    }

}