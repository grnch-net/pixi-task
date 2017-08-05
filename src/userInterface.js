import { model } from './model';

export class UserInterface {
	constructor({ model }) {
		this.model = model;

		this.elements = {
			shapesCount: document.getElementById('count'),
			shapesArea: document.getElementById('area'),
			gravity: document.querySelector('#gravity span'),
			speedCreate: document.querySelector('#speedCreate span'),
		};

		this.addEvent();

		this.setShapesCoun = this.model.shapesCount;
		this.shapesArea = this.model.shapesArea;
		this.gravity = this.model.gravity;
		this.speedCreate = this.model.gravity;
	}

	addEvent() {
		document.querySelector('#gravity .minus').addEventListener('click', ()=>{
			this.gravity = (this.gravity * 10 - 2) / 10;
		});

		document.querySelector('#gravity .plus').addEventListener('click', ()=>{
			this.gravity = (this.gravity * 10 + 2) / 10;
		});

		document.querySelector('#speedCreate .minus').addEventListener('click', ()=>{
			this.speedCreate -= 1;
		});

		document.querySelector('#speedCreate .plus').addEventListener('click', ()=>{
			this.speedCreate += 1;
		});
	}

	get shapesCount() { return this.model.shapesCount; }
	set shapesCount(val) {
		this.model.shapesCount = val;
		this.elements.shapesCount.innerHTML = `Current shapes: ${val}`;
	}

	get shapesArea() { return this.model.shapesArea; }
	set shapesArea(val) {
		this.model.shapesArea = val;
		this.elements.shapesArea.innerHTML = `Area(px^2): ${Math.sqrt(val).toFixed()}`;
	}

	get gravity() { return this.model.gravity; }
	set gravity(val) {
		if (val < 0) return;

		this.model.gravity = +val.toFixed(1);
		this.elements.gravity.innerHTML = `Gravity: ${val}`;
	}

	get speedCreate() { return this.model.speedCreate; }
	set speedCreate(val) {
		if (val < 0) return;

		this.model.speedCreate = +val;
		this.elements.speedCreate.innerHTML = `Shapes per second: ${val}`;
	}
}
