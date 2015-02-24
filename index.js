var physics_fps = 50;
var graphics_fps = 30;
var debug_mode = true;
var particle = new Particle();
var _canvas = document.getElementById('generalCanvas');

window.onload = function () {

	/* Esto del requestAnimFrame hay que ver dónde ponerlo luego */

	var physicsEngine = new Physics();
	var graphicsEngine = new Graphics();

	physicsEngine.init({
		universe: null,
		fps: physics_fps
	});

	graphicsEngine.init({
		fps: graphics_fps
	});

	particle.init({ vector:{x: 100, y: 100}, height: 5, color: 'red', mass: 1.0});

	physicsEngine.animate();
	graphicsEngine.animate();

};