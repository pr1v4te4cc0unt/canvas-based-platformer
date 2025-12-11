import * as Core from "./moduleExport.js";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var circle = new Core.CanvasCircle2D(ctx, 50, 50, 10);
console.log(circle);

setInterval(() => circle.draw(), 1000);
setInterval(() => circle.clear(), 2000);

var rectOne = new Core.CanvasRect2D(ctx, 100, 50, 10, 10).setStyle("black");
rectOne.draw();
// console.log(rectOne);

var rectTwo = new Core.CanvasRect2D(ctx, 120, 50, 10, 10).setStyle("green");
rectTwo.draw();
// console.log(rectTwo);

var rectThree = new Core.CanvasRect2D(ctx, 140, 50, 10, 10).setStyle("blue");
rectThree.draw();

rectOne.draw();
rectTwo.draw();
rectThree.draw();
// console.log(rectOne);

