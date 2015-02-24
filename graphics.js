var Graphics = (function () {
	var graphicsEngine = this;

	var graphicsClock = function(f) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f, 1000/window.graphics_fps);
		}

	}();

		function Graphics() {
			graphicsEngine = this;

			this.canvas = null;
			this.bodyElement = null;

			this.init = function (p) {

				this.bodyElement = this.dq('body')[0];
				this.canvas = this.initCanvas(p);

				this.fps = p.fps;
				this.interval = 1000/this.fps;
				this.now;
				this.delta;
				this.then = Date.now();
				this.beginning = this.then;
				this._frames = 0;
				this.context = window._canvas.getContext('2d');

			}


			this.animate = function() {
				graphicsClock(graphicsEngine.animate);

				graphicsEngine.now = Date.now();

				var delta = graphicsEngine.now - graphicsEngine.then;

				if (delta > graphicsEngine.interval) {

					graphicsEngine.then = graphicsEngine.now - (delta % graphicsEngine.interval);

					/*
					A partir de aquí inicia nuestro experimento de gravedad
					*/

					var tiempo_trans = (graphicsEngine.then - graphicsEngine.beginning) / 1000;

					if (window.debug_mode == true)
						document.getElementById('graphics_fps').innerHTML = 'Graphics: ' + ++graphicsEngine._frames + "f / " + parseInt(tiempo_trans) + "s = " + parseInt(graphicsEngine._frames / tiempo_trans) + "fps";

					graphicsEngine.draw();

				}


			}

			this.draw = function() {

				clear();

				window.particle.draw(graphicsEngine.context);

			}

			this.dq = function (p) {
				var search = null;
				if (p && typeof p === 'string') {
					if (p.length > 1) {
						if (p[0] === '#') {
							search = p.substring(1, p.length);
							return document.getElementById(search);
						}
						else if (p[0] === '.') {
							search = p.substring(1, p.length);
							return document.getElementsByClassName(search);
						}
						else {
							return document.getElementsByTagName(p);	
						}
					}
					else if (p.length > 0) {
						return document.getElementsByTagName(p);
					}
				}
			}

			this.initCanvas = function() {
			}

		}

		function clear() {
			graphicsEngine.context.clearRect(0, 0, _canvas.width, _canvas.height);
		}

	return Graphics;
})();