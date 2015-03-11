var physics_fps = 50;
var graphics_fps = 30;
var debug_mode = false;
var particles = [];
var _canvas = document.getElementById('generalCanvas');

window.onload = function () {

	/* Esto del requestAnimFrame hay que ver dónde ponerlo luego */

	var physicsEngine = new Physics();
	var graphicsEngine = new Graphics();
	var controlsEngine = new Controls();

	physicsEngine.init({
		fps: physics_fps
	});

	graphicsEngine.init({
		fps: graphics_fps
	});

	controlsEngine.init({
		activated: true
	});

	for (var i = 0; i < 3;  i++) {
		var particle = new Particle();

		var _color, _cr;

		switch(i){
			case 0: _color = 'red'; _cr = -0.3; break;
			case 1: _color = 'blue'; _cr = -0.1; break;
			case 2: _color = 'green'; _cr = -0.0; break;
		}

		particle.init({ bounciness: _cr,  position:{x: 100 * i + (5), y: 10}, height: 10, color: _color, mass: 1.0 * i});

		particles.push(particle);

	}

	physicsEngine.animate();
	graphicsEngine.animate();

};