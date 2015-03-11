var Controls = ( function() {
	var _controlsEngine = this;

	function Controls() {
		controlsEngine = this;

		this.init = function (p) {

			controlsEngine.activated = p.activated || false;

			if (controlsEngine.activated)
				window.addEventListener('keypress', function(e) {controlsEngine.triggerEvent(e);});
		};

		this.triggerEvent = function(e){
			var _key;
			var p = particles[1] || particles[0];
			switch (e.keyCode) {
				case 119:
					_key = 'up';
					if (p.position.y + p.radius >= _canvas.height)
						p.forces.subtract({y: p.mass * 200});
					//p.acceleration.debug();
					//p.velocity.debug();
				break;
				case 97:
					_key = 'left';
					p.forces.subtract({x: p.mass * 3});
				break;
				case 115:
					_key = 'down';
					p.forces.add({y: p.mass * 30});
				break;
				case 100:
					_key = 'right';
					p.forces.add({x: p.mass * 3});
				break;
			};
			if (_key)
				console.debug(_key);
		};

	}

	return Controls;
})();