import { 
    CanvasRect2D, 
    StyleType 
} from "../node_modules/canvas-based-core/module.js";

export class GameObject extends CanvasRect2D {

    //property, ctor
    gameObjectType;
    xVelocity = 0;
    yVelocity = 0;
    currentXVelocity = 0;
    currentYVelocity = 0;
    incrementingXVelocity = 0.00;
    incrementingYVelocity = 0.00;
    defaultGravity = 0.00;
    gravitySpeed = 0;
    styleType = StyleType.FILL;
    style = "#000000";
    keyboardControlMap = null;

    constructor(ctx, x, y, height, width, xVelocity = 0, yVelocity = 0, styleType = StyleType.FILL, style = "#000000", keyboardControlMap = null, currentXVelocity = 0, currentYVelocity = 0, incrementingXVelocity = 0.00, incrementingYVelocity = 0.00, defaultGravity = 0.00){
        super(ctx, x, y, height, width);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.currentXVelocity = currentXVelocity;
        this.currentYVelocity = currentYVelocity;
        this.incrementingXVelocity = incrementingXVelocity;
        this.incrementingYVelocity = incrementingYVelocity;
        this.defaultGravity = defaultGravity;
        this.styleType = styleType;
        this.style = style;
        this.keyboardControlMap = keyboardControlMap;
    }

    setGameObjectType(val){
        this.gameObjectType = val;
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

    setCurrentXVelocity(val){
        this.currentXVelocity = val;
        return this;
    }

    setCurrentYVelocity(val){
        this.currentYVelocity = val;
        return this;
    }

    setIncrementingXVelocity(val){
        this.incrementingXVelocity = val;
        return this;
    }

    setIncrementingYVelocity(val){
        this.incrementingYVelocity = val;
        return this;
    }

    setDefaultGravity(val){
        this.defaultGravity = val;
        return this;
    }

    setGravitySpeed(val){
        this.gravitySpeed = val;
        return this;
    }

    setKeyBoardControlMap(val){
        this.keyboardControlMap = val;
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

    reverseCurrentXVelocity(){
        this.currentXVelocity = (-1 * this.currentXVelocity);
    }

    reverseCurrentYVelocity(){
        this.currentYVelocity = (-1 * this.currentYVelocity);
    }

    resetCurrentXVelocity(){
        this.currentXVelocity = this.xVelocity;
    }

    resetCurrentYVelocity(){
        this.currentYVelocity = this.YVelocity;
    }

    incrementXVelocity(){
        if(this.currentXVelocity < 0){
            this.currentXVelocity = (this.currentXVelocity - (-1 * this.incrementingXVelocity));
        }
        else{
            this.currentXVelocity = (this.currentXVelocity + this.incrementingXVelocity);
        }
    }

    incrementYVelocity(){
        if(this.currentYVelocity < 0){
            this.currentYVelocity = (this.currentYVelocity - (-1 * this.incrementingYVelocity));
        }
        else{
            this.currentYVelocity = (this.currentYVelocity + this.incrementingYVelocity);
        }
    }

    clear(){
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    resolveDraw(){
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

    //

    update() {
        this.clear();
        this.#calculateXPosition();
        this.#calculateYPosition();
        this.resolveDraw();
    }

    #calculateXPosition(){
        this.x += this.currentXVelocity;
    }
    
    #calculateYPosition(){
        this.y += this.currentYVelocity;
    }

    //actions

    #move(event){
        console.log("move");
        switch(event.code){
            case this.keyboardControlMap.up:
                // console.log("ArrowUp");
                this.setCurrentYVelocity((-1 * this.yVelocity));
                break;
            case this.keyboardControlMap.down:
                // console.log("ArrowDown");
                this.setCurrentYVelocity(Math.abs(this.yVelocity));
                break;
            case this.keyboardControlMap.left:
                // console.log("ArrowLeft");
                this.setCurrentXVelocity((-1 * this.xVelocity));
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowRight");
                this.setCurrentXVelocity(Math.abs(this.xVelocity));
                break;
        }
    }

    #stop(event){
        // console.log("stop");
        switch(event.code){
            case this.keyboardControlMap.up:
                // console.log("ArrowUp");
                this.setCurrentYVelocity(0);
                break;
            case this.keyboardControlMap.down:
                // console.log("ArrowDown");
                this.setCurrentYVelocity(0);
                break;
            case this.keyboardControlMap.left:
                // console.log("ArrowLeft");
                this.setCurrentXVelocity(0);
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowRight");
                this.setCurrentXVelocity(0);
                break;
        }
    }

    //listeners
    registerEventListeners(document){
        document.addEventListener('keydown', (event) => {

            this.#move(event);
        
        }, false);
        
        document.addEventListener('keyup', (event) => {
            
            this.#stop(event);
        
        }, false);
    }

    deregisterEventListeners(document){
        document.removeEventListener('keydown', (event) => {

            this.#move(event);
        
        }, false);
        
        document.removeEventListener('keyup', (event) => {
            
            this.#stop(event);
        
        }, false);
    }
}