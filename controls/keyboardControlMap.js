import { 
    KeyCode,
    KeyboardControlMapBase 
} from "../node_modules/canvas-based-core/module.js";

export class KeyboardControlMap extends KeyboardControlMapBase{

    action;

    constructor(up = KeyCode.ArrowUp, down = KeyCode.ArrowDown, left = KeyCode.ArrowLeft, right = KeyCode.ArrowRight, action = KeyCode.Space){
        super(up, down, left, right);
        this.action = action;
    }

}