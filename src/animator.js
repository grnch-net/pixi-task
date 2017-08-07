export class Animator {
	constructor({
		app
	}) {
		this.model = app.model;
		this._stack = [];
		this._lastTime = performance.now();

		app.ticker.add(this._update.bind(this));
	}

	add({
		type,
		time = 1000,
		delay = 0,
		process,
		callback,
	}) {
		let newAnimation = {
			type: type,
			time: 0,
			timeLength: time,
			delay: delay,
			process: process,
			callback: callback
		};

		if (newAnimation.process === undefined
			&& newAnimation.callback === undefined
		) return;

		this._stack.push(newAnimation);

		return newAnimation;
	}

	remove(anim, isCallback = false) {
		var index = this._stack.indexOf(anim);

		if (index >= this._stack.length
			|| index < 0
		) return;

		var item = this._stack.splice(index, 1)[0];

		if (isCallback && item.callback)
			item.callback();
	}

	timeout(callback, time) {
		return this.add({
			type: 'timeout',
			time,
			callback
		});
	}

	_update(nowTime) {
		var frameTime = nowTime * this.model.gravity;

		for (let index = this._stack.length -1; index > -1; index--) {
			let anim = this._stack[index];

			anim.time += frameTime;

			let progress = anim.time / anim.timeLength;

			if (progress > 1)
				progress = 1;

			if (anim.process)
				anim.process(progress);

			if (progress === 1)
				this.remove(anim, true);
		}

	}
}
