import { Graphics } from 'pixi.js';

export class Background extends Graphics {
	constructor({ app }) {
		super();

		this.app = app;

		this.draw();
		this.addTouchEvent();
	}

	draw() {
		this.beginFill(0x000000);
		this.drawRect(0, 0, this.app.width, this.app.height);
		this.endFill();
		this.app.stage.addChild(this);
	}

	addTouchEvent() {
		this.interactive = true;
		this.on('pointerdown', function(e) {
			this.app.addShape({ x: e.data.global.x, y: e.data.global.y });
		});
	}
}
