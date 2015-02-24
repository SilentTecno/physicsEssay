var Particle = ( function(){
	var _particle = _particle;

	function Particle() {
		//_particle = this;

		this.init = function (p) {
			_particle = this;
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
			ctx.arc(_particle.vector.x, _particle.vector.y, _particle.radius, 0, 2*Math.PI);
			ctx.fillStyle = _particle.color || 'blue';
			//ctx.stroke();
			ctx.fill();
		};

		this.animate = function() {
			_particle.draw();
		};
	}

	return Particle;
})();