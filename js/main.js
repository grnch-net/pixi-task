var type = (PIXI.utils.isWebGLSupported())? "WebGL" : "canvas";
PIXI.utils.sayHello(type)

var renderer = PIXI.autoDetectRenderer();
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var Graphics = PIXI.Graphics;
