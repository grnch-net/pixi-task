import { Graphics, Container } from 'pixi.js';

export class Shape {
	constructor({
		app,
		x = 0,
		y = 0
	}) {
		this.parent = app.shapesContainer;

		this._draw(x, y);
		this._addMoveAnimate(y, app);
		this._adddTouchEvent(app);
	}

	_adddTouchEvent(app) {
		this.figure.interactive = true;
		this.figure.on('pointerdown', ()=>{
			app.animator.remove(this.anim, true);
		});
	}

	_addMoveAnimate(y, app) {
		var endPosition = app.height + 100;
		var pathLength = endPosition - y;
		var liveTime = pathLength / app.model.moveSpeed;

		this.anim = app.animator.add({
			time: liveTime,
			process: (progress, frame) => {
				this.figure.y = y + progress * pathLength;
			},
			callback: ()=>{
				app.userInterface.shapesCount -= 1;
				this.figure.destroy();
			}
		});
	}

	_draw(x, y) {
		var color = this._generateRandomColor();

		this.figure = this._getRandomFigure(color);

		this.figure.x = x || 0;
		this.figure.y = y || 0;

		this.parent.addChild(this.figure);
	}

	_generateRandomColor() {
		return '0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
	}

	_getRandomFigure(color, random = true) {
		var types = ['circle', 'ellipse', 'polygon3', 'polygon4', 'polygon5', 'polygon6', 'random'];

		var typesLength = (random)? types.length-1 : types.length-2;
		var figureType = types[this._randomInt(0, typesLength)];
		switch(figureType) {
			case 'circle':
				return this._drawCircle(color);
			case 'ellipse':
				return this._drawEllipse(color);
			case 'polygon3':
				return this._drawPolygon3(color);
			case 'polygon4':
				return this._drawPolygon4(color);
			case 'polygon5':
				return this._drawPolygon5(color);
			case 'polygon6':
				return this._drawPolygon6(color);
			case 'random':
				return this._drawRandom(color);
		}
	}

	_drawCircle(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		figure.drawCircle(0, 0, this._randomInt(10, 50));
		figure.endFill();
		return figure;
	}

	_drawEllipse(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		figure.drawEllipse(0, 0, this._randomInt(10, 50), this._randomInt(10, 50));
		figure.endFill();
		figure.rotation = Math.random();
		return figure;
	}

	_drawPolygon3(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		var sides = [this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100)];
		figure.drawPolygon([
			0, sides[0],
			sides[1]/2, -sides[1]/2,
			-sides[2]/2, sides[2]/2
		]);
		figure.endFill();
		return figure;
	}

	_drawPolygon4(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		var sides = [this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100)];
		figure.drawPolygon([
			-sides[0]/2, -sides[0]/2,
			-sides[1]/2, sides[1]/2,
			sides[2]/2, sides[2]/2,
			sides[3]/2, -sides[3]/2
		]);
		figure.endFill();
		return figure;
	}

	_drawPolygon5(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		var sides = [this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100)];
		figure.drawPolygon([
			-sides[0]/2, -sides[0]/2,
			-sides[1]/2, sides[1]/2,
			0, sides[2],
			sides[3]/2, sides[3]/2,
			sides[4]/2, -sides[4]/2
		]);
		figure.endFill();
		return figure;
	}

	_drawPolygon6(color) {
		var figure = new Graphics();
		figure.beginFill(color);
		var sides = [this._randomInt(10, 100), this._randomInt(10, 100), this._randomInt(10, 100)];
		figure.drawPolygon([
			-sides[0]/2, -sides[0]/2,
			-sides[0]/2, sides[0]/2,
			0, sides[1],
			sides[2]/2, sides[2]/2,
			sides[2]/2, -sides[2]/2,
			0, -sides[1],
		]);
		figure.endFill();
		return figure;
	}

	_drawRandom(color) {
		var container = new Container();

		var figure1 = this._getRandomFigure(color, false);
		container.addChild(figure1);

		var figure2 = this._getRandomFigure(color, false);
		container.addChild(figure2);

		var figure3 = this._getRandomFigure(color, false);
		container.addChild(figure3);

		return container;
	}

	_randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
