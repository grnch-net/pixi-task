class Shape {
	constructor(param = {}) {
		var type = ['circle', 'ellipse', 'polygon3', 'polygon4', 'polygon5', 'polygon6'];
		this.figure = new PIXI.Graphics();

		// Generate random color
		var color = '0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		this.figure.beginFill(color);

		// Draw
		// switch(type[randomInt(0, type.length)]) {
		switch(type[5]) {
			case 'circle':
				this.figure.drawCircle(0, 0, randomInt(10, 50));
				break;
			case 'ellipse':
				this.figure.drawEllipse(0, 0, randomInt(10, 50), randomInt(10, 50));
				break;
			case 'polygon3':
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    0, size[0],
				    size[1]/2, -size[1]/2,
				    -size[2]/2, size[2]/2
				]);
				break;
			case 'polygon4':
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[1]/2, size[1]/2,
				    size[2]/2, size[2]/2,
				    size[3]/2, -size[3]/2
				]);
				break;
				break;
			case 'polygon5':
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[1]/2, size[1]/2,
				    0, size[2],
				    size[3]/2, size[3]/2,
				    size[4]/2, -size[4]/2
				]);
				break;
			case 'polygon6':
				var size = [randomInt(10, 100), randomInt(10, 100), randomInt(10, 100)];
				this.figure.drawPolygon([
				    -size[0]/2, -size[0]/2,
				    -size[0]/2, size[0]/2,
				    0, size[1],
				    size[2]/2, size[2]/2,
				    size[2]/2, -size[2]/2,
					0, -size[1],
				]);
				break;
		}
		this.figure.endFill();

		this.figure.x = param.x || 0;
		this.figure.y = param.y || 0;

		if (param.stage) param.stage.addChild(this.figure);
	}
}
