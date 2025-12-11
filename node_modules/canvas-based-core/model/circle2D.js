import { Arc2D } from "./arc2D.js";

export class Circle2D extends Arc2D {

    constructor(x, y, radius = 0, xVelocity = 0.00, yVelocity = 0.00) {
        super(x, y, radius, 0, (Math.PI * 2), xVelocity, yVelocity);
    }

}