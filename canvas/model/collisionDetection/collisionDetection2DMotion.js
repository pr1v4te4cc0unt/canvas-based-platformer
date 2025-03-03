import { CollisionDetection } from "./collisionDetection.js";
import { CollisionDetection2D } from "./collisionDetection2D.js";
import { Point2D } from "../../../geometry/point2D.js";

export class CollisionDetection2DMotion extends CollisionDetection2D {

    constructor(){
        super();
    }

    static leftWillCollideDetected(source, target){
        return ((source.x + source.currentXVelocity) >= (target.x + target.currentXVelocity)) && 
               ((source.x + source.currentXVelocity) <= (target.x + target.width + target.currentXVelocity)) && 
               this.isWithinYRange(source, target);
    }

    static rightWillCollideDetected(source, target){
        return ((source.x + source.width + source.currentXVelocity) >= (target.x + target.currentXVelocity)) && 
               ((source.x + source.width + source.currentXVelocity) <= (target.x + target.width + target.currentXVelocity)) &&
               this.isWithinYRange(source, target); 
    }

    static horizontalWillCollideDetected(source, target){
        return this.leftWillCollideDetected(source, target) || this.rightWillCollideDetected(source, target);
    }

    static getLeftWillCollideDetected(source, target){
        if(this.leftWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static getRightWillCollideDetected(source, target){
        if(this.rightWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static getHorizontalWillCollideDetected(source, target){
        if(this.horizontalWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static topWillCollideDetected(source, target){
        return ((source.y + source.currentYVelocity) >= (target.y + target.currentYVelocity)) && 
               ((source.y + source.currentYVelocity) <= (target.y + target.height + target.currentYVelocity)) &&
               this.isWithinXRange(source, target);
    }

    static bottomWillCollideDetected(source, target){
        return ((source.y + source.height + source.currentYVelocity) >= (target.y + target.currentYVelocity)) && 
               ((source.y + source.height + source.currentYVelocity) <= (target.y + target.height + target.currentYVelocity)) &&
               this.isWithinXRange(source, target);
    }

    static verticalWillCollideDetected(source, target){
        return this.topWillCollideDetected(source, target) || this.bottomWillCollideDetected(source, target);
    }

    static getTopWillCollideDetected(source, target){
        if(this.topWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static getBottomWillCollideDetected(source, target){
        if(this.bottomWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static getVerticalWillCollideDetected(source, target){
        if(this.verticalWillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

    static willCollideDetected(source, target){
        return this.horizontalWillCollideDetected(source, target) || this.verticalWillCollideDetected(source, target);
    }

    static getWillCollideDetected(source, target){
        if(this.WillCollideDetected(source, target)){
            return {
                source: new Point2D(source.x, source.y),
                target: new Point2D(target.x, target.y)
            }
        }
    }

}