var physics_fps = 50;
var graphics_fps = 30;
var debug_mode = false;
var particles = [];
var _canvas = document.getElementById('generalCanvas');

window.onload = function () {

	/* Esto del requestAnimFrame hay que ver dónde ponerlo luego */

	var physicsEngine = new Physics();
	var graphicsEngine = new Graphics();

	physicsEngine.init({
		fps: physics_fps
	});

	graphicsEngine.init({
		fps: graphics_fps
	});

	for (var i = 0; i < 3;  i++) {
		var particle = new Particle();

		var _color;

		switch(i){
			case 0: _color = 'red'; break;
			case 1: _color = 'blue'; break;
			case 2: _color = 'green'; break;
		}

		particle.init({ vector:{x: 100 * i + (5), y: 100}, height: (5 * i) + 5, color: _color, mass: 1.0 * i});

		particles.push(particle);
	}

	physicsEngine.animate();
	graphicsEngine.animate();

};