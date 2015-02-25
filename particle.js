var Particle = ( function(){
	var _particle = this;

	function Particle() {
		_particle = this;

		this.init = function (p) {
			_particle.vector = p.vector;
			_particle.mass = p.mass || 0.1;
			_particle.cr = p.bounciness || -0.5 // Coefficient of restitution
			_particle.aceleration = p.aceleration;
			_particle.radius = p.height;
			_particle.color = p.color;
			_particle.ay = 0; // aceleración vertical
			_particle.vy = 0; // velocidad vertical
			_particle.ax = 0; // aceleración horizontal
		};

		this.draw = function(ctx) {
			ctx.beginPath();
			ctx.arc(this.vector.x, this.vector.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = this.color || 'blue';
			ctx.fill();
			ctx.closePath();

			if (window.debug_mode) {
				console.debug('I´m', this);
			}
		};

		this.animate = function() {
			_particle.draw();
		};
	}

	return Particle;
})();