var type = (PIXI.utils.isWebGLSupported())? "WebGL" : "canvas";
PIXI.utils.sayHello(type)

var renderer = PIXI.autoDetectRenderer(parameters.width, parameters.height);
document.getElementById('work-area').appendChild(renderer.view);

var animator = new Animator({ renderer });
var stage = new PIXI.Container();

var moveArea = new PIXI.Container();
gameArea.init(stage, moveArea);
stage.addChild(moveArea);
animator.loop = (frame) => {
	// moveArea.y += frame * parameters.moveSpeed;

	this.renderer.render(stage);
}

gameInterface.init();

function shapeRain() {
	animator.timeout(()=>{
		new Shape({ x: randomInt(0, parameters.width), y: -50, parent: moveArea });
		shapeRain();
	}, 1000 / parameters.speedCreate);
};
shapeRain();




// addShape(64, 130);
