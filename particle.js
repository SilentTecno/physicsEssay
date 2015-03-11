var Particle = ( function(){
	var _particle = this;

	function Particle() {
		_particle = this;

		this.init = function (p) {
			_particle.mass = p.mass || 0.1;
			_particle.cr = p.bounciness || -0.5 // Coefficient of restitution
			_particle.aceleration = p.aceleration;
			_particle.radius = p.height;
			_particle.color = p.color;
			_particle.position = new Vector(p.position);
			_particle.velocity = new Vector({x:0, y: 0});
			_particle.acceleration = new Vector({x:0, y: 0});
			_particle.forces = new Vector({x:0, y: 0});
		};

		this.draw = function(ctx) {
			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = this.color || 'blue';
			ctx.fill();
			ctx.closePath();

			if (window.debug_mode) {
				//console.debug('I´m', this);
				//this.position.debug();
			}
		};

		this.animate = function() {
			_particle.draw();
		};
	}

	return Particle;
})();