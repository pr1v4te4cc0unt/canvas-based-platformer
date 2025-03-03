import { KeyCode } from "./keyCode.js";

export class KeyboardControlMap {

    up;
    down;
    left;
    right;
    action;

    constructor(up = KeyCode.ArrowUp, down = KeyCode.ArrowDown, left = KeyCode.ArrowLeft, right = KeyCode.ArrowRight, action = KeyCode.Space){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.action = action;
    }

}