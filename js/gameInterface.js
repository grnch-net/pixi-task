var gameInterface = {
	init: function() {
		this.elements = {
			shapesCount: document.getElementById('count'),
			gravity: document.querySelector('#gravity span'),
			speedCreate: document.querySelector('#speedCreate span'),
		};

		this.addEvent();

		this.drawShapesCount(parameters.shapesCount);
		this.drawGravity(parameters.gravity);
		this.drawSpeedCreate(parameters.gravity);
	},

	addEvent() {
		document.querySelector('#gravity .minus').addEventListener('click', ()=>{
			parameters.gravity -= 0.2;
		});
		document.querySelector('#gravity .plus').addEventListener('click', ()=>{
			parameters.gravity += 0.2;
		});
		document.querySelector('#speedCreate .minus').addEventListener('click', ()=>{
			parameters.speedCreate -= 1;
		});
		document.querySelector('#speedCreate .plus').addEventListener('click', ()=>{
			parameters.speedCreate += 1;
		});
	},

	drawShapesCount: function(val) {
		this.elements.shapesCount.innerHTML = `Current shapes: ${val}`;
	},

	drawGravity: function(val) {
		this.elements.gravity.innerHTML = `Gravity: ${val}`;
	},

	drawSpeedCreate: function(val) {
		this.elements.speedCreate.innerHTML = `Shapes per second: ${val}`;
	},

}
