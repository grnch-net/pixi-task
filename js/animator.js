class Animator {
	constructor(param) {
		this._stack = [];
		this._lastTime = performance.now();
		this.loop = function() {};

		this.element = param.renderer.view;

		window.requestAnimationFrame(this.update.bind(this), this.element);
	}

	/*	param: {
			time: number, (milisec)
			*process: function(progress) {},
			*callback: function() {},
			*delay: number (milisec)
		}	*/
	add(param) {
		let newAnimation = {
			time: 0,
			timeLength: param.time,
			delay: 0,
			type: param.type
		};

		if (typeof(param.process) === 'function')
			newAnimation.process = param.process;

		if (typeof(param.callback) === 'function')
			newAnimation.callback = param.callback;

		if (newAnimation.process === undefined
			&& newAnimation.callback === undefined
		) return;


		if (typeof(param.delay) === 'number')
			newAnimation.delay = param.delay;

		this._stack.push(newAnimation);

		return newAnimation;
	}

	/*	index: string,
		isCallback: boolean	*/
	remove(anim, isCallback = false) {
		let index = anim;
		if (typeof(index) !== 'number')
			index = this._stack.indexOf(anim);

		if (index >= this._stack.length
			|| index < 0
		) return;

		anim = this._stack.splice(index, 1)[0];

		if (isCallback && anim.callback)
			anim.callback();
	}

	timeout(callback, time) {
		return this.add({
			time,
			callback,
			type: 'timeout'
		});
	}

	update(nowTime) {
		let frameTime = nowTime - this._lastTime;
		this._lastTime = nowTime;

		for (let index = this._stack.length -1; index > -1; index--) {
			let anim = this._stack[index];

			if (anim.type != 'timeout')
				frameTime = frameTime * parameters.gravity;

			anim.time += frameTime;

			let progress = anim.time / anim.timeLength;

			if (progress > 1)
				progress = 1;

			if (anim.process)
				anim.process(progress, frameTime);

			if (progress === 1)
				this.remove(anim, true);
		}

		this.loop(frameTime * parameters.gravity);

		window.requestAnimationFrame(this.update.bind(this), this.element);
	}
}
