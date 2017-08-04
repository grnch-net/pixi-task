var gameArea = {
	init: function(stage, moveArea) {
		this.view(stage);
		this.touchEvent(moveArea);
	},

	view: function(stage) {
		this.elment = new PIXI.Graphics();
		this.elment.beginFill(0x000000);
		this.elment.drawRect(0, 0, parameters.width, parameters.height);
		this.elment.endFill();
		stage.addChild(this.elment);
	},

	touchEvent(moveArea) {
		this.elment.interactive = true;
		this.elment.on('pointerdown', function(e) {
			new Shape({ x: e.data.global.x, y: e.data.global.y, parent: moveArea });
		});
	}
}
