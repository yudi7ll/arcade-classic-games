class Snake {
  constructor()
  {
	this.size = 20;
	// position coordinate
	this.pos = {
	  x: [40, 20, 0],
	  y: [0, 0, 0]
	};
	this.length = 3;

	// canvas with snake size
	this.canvas = {
	  width: canvas.width - this.size,
	  height: canvas.height - this.size
	};

	this.direction = {
	  x: 0,
	  y: 0
	};

  }

  LoopThroughLength = callback => {
	for (let i = 0; i < this.length; i++)
	  callback(i);
  }

  IsDead = () => {
	for (let i = 3; i < this.length; i++) {
	  if (this.pos.x[0] === this.pos.x[i] && this.pos.y[0] === this.pos.y[i])
		return i;
	}
	return false;
  }

  Move = () => {
	window.addEventListener('keydown', e => {

	  // set the snake direction
	  switch(e.code) {
		case 'KeyD':
		case 'ArrowRight':
		case 'KeyL':
		  // if not already moving left
		  if (this.direction.x !== -1)
			this.direction.x = 1;
		  this.direction.y = 0;
		  break;
		case 'ArrowLeft':
		case 'KeyA':
		case 'KeyJ':
		  // if not already moving right
		  if (this.direction.x !== 1)
			this.direction.x = -1;
		  this.direction.y = 0;
		  break;
		case 'ArrowUp':
		case 'KeyW':
		case 'KeyI':
		  this.direction.x = 0;
		  if (this.direction.y !== 1)
			this.direction.y = -1;
		  break;
		case 'ArrowDown':
		case 'KeyS':
		case 'KeyK':
		  this.direction.x = 0;
		  if (this.direction.y !== -1)
			this.direction.y = 1;
		  break;
		default: 
		  return;
	  }

	});

	var newPos = 0;

	// x direction
	if (this.direction.x) {

	  // right
	  if (this.direction.x === 1) {
		newPos = this.pos.x[0] + this.size;
		// add newPos into beginning of the this.pos.x
		this.pos.x.unshift(newPos <= this.canvas.width ? newPos : 0);
		// copy the first element into new first element
		this.pos.y.unshift(this.pos.y[0]);

	  // left
	  } else if (this.direction.x === -1) {
		newPos = this.pos.x[0] - this.size;
		this.pos.x.unshift(newPos >= 0 ? newPos : this.canvas.width);
		this.pos.y.unshift(this.pos.y[0]);
	  }

	// y direction
	} else if (this.direction.y) {

	  // down
	  if (this.direction.y === 1) {
		newPos = this.pos.y[0] + this.size;
		this.pos.y.unshift(newPos <= this.canvas.height ? newPos : 0);
		this.pos.x.unshift(this.pos.x[0]);

	  // up
	  } else if (this.direction.y === -1) {
		newPos = this.pos.y[0] - this.size;
		this.pos.y.unshift(newPos >= 0 ? newPos : this.canvas.height);
		this.pos.x.unshift(this.pos.x[0]);
	  }

	}

	// slice the last item
	this.pos.x = this.pos.x.slice(0, this.length);
	this.pos.y = this.pos.y.slice(0, this.length);

  }


  Draw = () => {
	this.LoopThroughLength(i => {
	  ctx.clearRect(
		this.pos.x[i],
		this.pos.y[i],
		this.size,
		this.size
	  );
	});

	this.Move();

	this.LoopThroughLength(i => {
	  ctx.save();
	  ctx.fillStyle = !i ? 'brown' : 'grey';

	  ctx.fillRect(
		this.pos.x[i], 
		this.pos.y[i],
		this.size,
		this.size
	  );
	  ctx.restore();
	});
  }

}
