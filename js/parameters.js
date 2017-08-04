var parameters = {
	width: 800,
	height: 600,
	moveSpeed: 10,

	_shapesCount: 0,
	get shapesCount() {
		return this._shapesCount;
	},
	set shapesCount(val) {
		this._shapesCount = val;
		gameInterface.drawShapesCount(this._shapesCount);
	},

	_gravity: 1,
	get gravity() {
		return +this._gravity;
	},
	set gravity(val) {
		if (val < 0) return;

		this._gravity = val.toFixed(1);
		gameInterface.drawGravity(this._gravity);
	},

	_speedCreate: 1,
	get speedCreate() {
		return +this._speedCreate;
	},
	set speedCreate(val) {
		if (val < 0) return;

		this._speedCreate = val;
		gameInterface.drawSpeedCreate(this._speedCreate);
	}
}
