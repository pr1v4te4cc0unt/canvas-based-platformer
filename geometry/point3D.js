import { Point2D } from "./point2D.js";

export class Point3D extends Point2D {

    z;

    constructor(x, y){
        super(x, y);
        this.z = z;
    }

    setZ(val){
        this.z = val;
        return this;
    }

}