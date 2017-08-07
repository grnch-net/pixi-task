import { Application, Container } from 'pixi.js';
import { Animator } from './animator';
import { UserInterface } from './userInterface';
import { Background } from './background';
import { Shape } from './shape';

export class Scene extends Application {

	constructor(width, height, model) {
		super(width, height);

		this.width = width;
		this.height = height;
		this.model = model;

		this.animator = new Animator({ app: this });
		this.userInterface = new UserInterface({ model: this.model });
		this.background = new Background({ app: this });

		this._addToHTML();
		this._createShapesContainer();
		this._shapeRain();
		this._checkArea();
	}

	_addToHTML() {
		document.querySelector('#work-area').appendChild(this.view);
	}

	_createShapesContainer() {
		this.shapesContainer = new Container();
        this.stage.addChild(this.shapesContainer);
	}

	addShape({x, y}) {
		this.userInterface.shapesCount += 1;
		new Shape({ app: this, x, y });
	}

	_shapeRain() {
		if (this.model.speedCreate == 0) {
			setTimeout(this._shapeRain.bind(this), 1000);
			return;
		}

		var randomPosition = this._randomInt(0, this.model.width);
		this.addShape({ x: randomPosition, y: -100 });

		setTimeout(this._shapeRain.bind(this), 1000 / this.model.speedCreate);
	}

	_randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	_checkArea() {
        this.userInterface.shapesArea = this.renderer.extract.pixels(this.shapesContainer).length;

		setTimeout(this._checkArea.bind(this), 100);
    }
}
