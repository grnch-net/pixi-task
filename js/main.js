var type = (PIXI.utils.isWebGLSupported())? "WebGL" : "canvas";
PIXI.utils.sayHello(type)

var renderer = PIXI.autoDetectRenderer();
document.getElementById('work-area').appendChild(renderer.view);

var stage = new PIXI.Container();

var gameArea = new PIXI.Graphics();
gameArea.beginFill(0x000000);
gameArea.drawRect(0, 0, renderer.view.width, renderer.view.height);
gameArea.endFill();
stage.addChild(gameArea);
gameArea.interactive = true;
gameArea.on('pointerdown', function(e) {
	new Shape({
		x: e.data.global.x,
		y: e.data.global.y,
		stage
	});
});

var shape = new Shape({
	x: 64,
	y: 130,
	stage
});


function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
}
update();
