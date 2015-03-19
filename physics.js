var Physics = ( function () {
	var physicsEngine = this;

	var physicsClock = function(f) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f, 1000/window.physics_fps);
		}

	}();

	var beginning
		,dt
		,fps
		,frames
		,interval
		,now
		,then;

	function Physics() {
		physicsEngine = this;

		this.init = function (p) {
			fps = p.fps;
			interval = 1000/fps;
			dt = fps/1000;
			then = beginning = Date.now();
			frames = 0;
		}

		this.animate = function() {

			physicsClock(physicsEngine.animate);

			now = Date.now();

			var delta = now - then;

			if (delta > interval) {

				then = now - (delta % interval);

				/*
				A partir de aquí inicia nuestro experimento de gravedad
				*/

				for (var i in particles) {

					var p = particles[i];

					if (!p.grounded.y) {

						p.forces.add({y: p.mass * 9.18 / 60});

						// aquí se usa algo llamado velvet integration (o integración velvet)

						var dy = p.velocity.y * dt + (0.5 * p.acceleration.y * Math.pow(dt, 2));

						p.position.add({y: dy * 10});

						var old_ay = p.acceleration.y;

						p.acceleration.set({y: p.forces.y / p.mass});

						var avg_ay = 0.5 * ( old_ay + p.acceleration.y);

						p.velocity.add({y: avg_ay * dt});

						if ( p.position.y + p.radius > _canvas.height && p.velocity.y > 0) {// rudimentario detector de colisión con el piso
							p.velocity.y *= p.cr;

							var velocity_factor = (p.lastVelocity.y - p.velocity.y)/p.cr;
							p.grounded.y = Math.floor(velocity_factor) == 0;
							p.lastVelocity.y = p.velocity.y;
							p.position.y = _canvas.height - p.radius;
						}

						if (p.position.y + p.radius == _canvas.height) {
							console.debug('Debería detenerme?:', p.grounded.y);
						}
					}

					if (!p.grounded.x) {

						var dx = p.velocity.x * dt + (0.5 * p.acceleration.x * Math.pow(dt, 2));

						p.position.add({x: dx * 10});

						var old_ax = p.acceleration.x;

						p.acceleration.set({x: p.forces.x / p.mass});

						var avg_ax = 0.5 * ( old_ax + p.acceleration.x);

						p.velocity.add({x: avg_ax * dt});

						if ( p.position.x + p.radius > _canvas.width && p.velocity.x > 0) {// rudimentario detector de colisión con la pared derecha
							p.velocity.x *= p.cr;
							p.position.x = _canvas.width - p.radius;
						}

					}

				}

				if (window.debug_mode) {
					var tiempo_trans = (then - beginning) / 1000;
					document.getElementById('physics_fps').innerHTML = 'Physics: ' + (++frames) + "f / " + parseInt(tiempo_trans) + "s = " + parseInt(frames / tiempo_trans) + "fps";
				}

			}

		}

	}

	return Physics;
})();