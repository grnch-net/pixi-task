class Shape {
	constructor(param = {}) {
		this.parent = param.parent;

		this.view(param.x, param.y);
		this.moveAnimate(param.y);
		this.touchEvent();

		++parameters.shapesCount;
	}

	touchEvent() {
		this.figure.interactive = true;
		this.figure.on('pointerdown', ()=>{
			animator.remove(this.anim, true);
		});
	}

	moveAnimate(y) {
		this.liveTime = (parameters.height + 100) * parameters.moveSpeed;

		this.anim = animator.add({
			time: this.liveTime,
			process: (progress, frame) => {
				this.figure.y += frame * parameters.moveSpeed / 100;
			},
			callback: ()=>{
				--parameters.shapesCount;
				this.figure.destroy();
			}
		});
	}

	view(x, y) {
		var type = ['circle', 'ellipse', 'polygon3', 'polygon4', 'polygon5', 'polygon6', 'gibrid'];


		var color = '0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

		switch(type[randomInt(0, type.length-1)]) {
			case 'circle':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				this.figure.drawCircle(0, 0, randomInt(10, 50));
				this.figure.endFill();
				break;
			case 'ellipse':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				this.figure.drawEllipse(0, 0, randomInt(10, 50), randomInt(10, 50));
				this.figure.endFill();
				this.figure.rotation = Math.random;
				break;
			case 'polygon3':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    0, size[0],
				    size[1]/2, -size[1]/2,
				    -size[2]/2, size[2]/2
				]);
				this.figure.endFill();
				break;
			case 'polygon4':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[1]/2, size[1]/2,
				    size[2]/2, size[2]/2,
				    size[3]/2, -size[3]/2
				]);
				this.figure.endFill();
				break;
			case 'polygon5':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[1]/2, size[1]/2,
				    0, size[2],
				    size[3]/2, size[3]/2,
				    size[4]/2, -size[4]/2
				]);
				this.figure.endFill();
				break;
			case 'polygon6':
				this.figure = new PIXI.Graphics();
				this.figure.beginFill(color);
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[0]/2, size[0]/2,
				    0, size[1],
				    size[2]/2, size[2]/2,
				    size[2]/2, -size[2]/2,
					0, -size[1],
				]);
				this.figure.endFill();
				break;
			case 'gibrid':
				this.figure = new PIXI.Container();
				var figure1 = new PIXI.Graphics();
				figure1.beginFill(color);

				var size = randomInt(10, 40);
				figure1.drawCircle(0, 0, size);

				size = size * (1 + (0.5 * Math.random()));
				figure1.drawEllipse(0, 0, size, size/2);
				figure1.endFill();
				figure1.rotation = -Math.random();
				this.figure.addChild(figure1);

				var figure2 = new PIXI.Graphics();
				figure2.beginFill(color);
				figure2.drawEllipse(0, 0, size, size/2);
				figure2.rotation = Math.random();
				this.figure.addChild(figure2);
				break;
		}

		this.figure.x = x || 0;
		this.figure.y = (y || 0) - this.parent.y;

		this.parent.addChild(this.figure);
	}
}
