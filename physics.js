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

				var fy = 0;

				for (var i in particles) {

					var particle = particles[i];

					fy += particle.mass * 9.81 /6; // cálculo de la fuerza de gravedad (por lo pronto es la única fuerza que existe)

					// aquí se usa algo llamado velvet integration (o integración velvet)

					var dy = particle.vy * dt + (0.5 * particle.ay * Math.pow(dt, 2));

					particle.vector.y += (dy * 100); // se hace un ajuste para escalar los mts a cms

					var old_ay = particle.ay;

					particle.ay = fy / particle.mass;

					var avg_ay = 0.5 * ( old_ay + particle.ay);

					particle.vy += avg_ay * dt;

					if ( particle.vector.y + particle.radius > _canvas.height && particle.vy > 0) {// rudimentario detector de colisión con el piso
						particle.vy *= particle.cr;
						particle.vector.y = _canvas.height - particle.radius;
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