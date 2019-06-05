class Blocks {
  constructor()
  {
	// size of one block
	this.size = Global.size;
	// how much block used for 1 tetrominoes
	this.length = Global.length;
	// the blocks
	this.tetrominoes = [
	  // ====
	  {
		x: [0, this.size, this.size * 2, this.size * 3],
		y: [0, 0, 0, 0],
		color: 'skyblue'
	  },
	  // L
	  {
		x: [0, 0, this.size, this.size * 2],
		y: [0, this.size, this.size, this.size],
		color: 'darkblue'
	  },
	  // J
	  {
		x: [0, this.size, this.size * 2, this.size * 2],
		y: [this.size, this.size, this.size, 0],
		color: 'darkorange'
	  },
	  // O
	  {
		x: [0, this.size, 0, this.size],
		y: [0, 0, this.size, this.size],
		color: 'magenta'
	  },
	  // S
	  {
		x: [this.size, this.size * 2, 0, this.size],
		y: [0, 0, this.size, this.size],
		color: 'green'
	  },
	  // Z
	  {
		x: [0, this.size, this.size, this.size * 2],
		y: [0, 0, this.size, this.size],
		color: 'purple'
	  },
	  // T
	  {
		x: [this.size, 0, this.size, this.size * 2],
		y: [0, this.size, this.size, this.size],
		color: 'darkred'
	  }
	];

	// is the block placed
	this.isPlaced = false;
	// canvas context from global var
	this.ctx = Global.ctx;
	// Loop function from global var
	this.LoopThroughLength = Global.LoopThroughLength;
	// current block index selected
	this.currentBlock = Global.NewBlockIndex();
	// initial position
	this.pos = {
	  x: this.tetrominoes[this.currentBlock].x.slice(),
	  y: this.tetrominoes[this.currentBlock].y.slice()
	}
  }

  NewBlock = () => {
	this.pos = {
	  x: this.tetrominoes[this.currentBlock].x.slice(),
	  y: this.tetrominoes[this.currentBlock].y.slice()
	}
  }

  Move = code => {
	this.LoopThroughLength(i => {
	  this.ctx.clearRect(
		this.pos.x[i],
		this.pos.y[i],
		this.size,
		this.size
	  );
	});
	switch(code) {
	  case 'ArrowRight':
		this.LoopThroughLength(i => {
		  if (this.pos.x[i] + this.size <= Global.canvas.width)
			this.pos.x[i] += this.size;
		});
		break;
	  case 'ArrowLeft':
		this.LoopThroughLength(i => {
		  if (this.pos.x.find(posX => posX - this.size < 0) == undefined)
			this.pos.x[i] -= this.size;
		});
		break;
	  default:
		break;
	}
  }

  Draw = () => {
	this.LoopThroughLength(i => {
	  this.ctx.clearRect(
		this.pos.x[i],
		this.pos.y[i],
		this.size,
		this.size
	  );
	});

	this.LoopThroughLength(i => {
	  this.pos.y[i] += this.size;
	});

	this.LoopThroughLength(i => {
	  this.ctx.save();
	  this.ctx.fillStyle = this.tetrominoes[this.currentBlock].color;
	  this.ctx.fillRect(
		this.pos.x[i],
		this.pos.y[i],
		this.size,
		this.size
	  );
	  this.ctx.restore();
	});

  }
}
