class Board {
  constructor()
  {
	// the size of 1 block
	this.size = Global.size;

	this.canvas = Global.canvas;

	// where the space available for block to be placed
	this.space = {
	  x: [],
	  y: []
	};

	// where the block placed
	this.filled = {
	  x: [],
	  y: []
	};

	// console.log(this.space);

	// initial filled value
	// this.Filled();
  }

  Filled = () => {
	for (let i = 0; i < this.canvas.width; i += this.size) {
	  if (this.filled.x[i] == null && this.filled.y[i] == null) {
		this.filled.x[i] = i;
	  }
	}
  }

  NewFilledPosition = block => {
	this.filled = {
	  x: this.filled.x.concat(block.x),
	  y: this.filled.y.concat(block.y)
	}
	// block.x.map((posX, i, block) => {
	//   var filledIndex = this.filled.x.indexOf(posX);
	//   var blockIndex = block.indexOf(posX);
	// });
  }
}
