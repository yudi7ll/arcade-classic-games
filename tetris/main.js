const importScript = url => {
  let script = document.createElement('script');
  script.src = url.match(/.js$/) ? url : url + '.js';
  document.getElementsByTagName('body')[0].appendChild(script);
}

// Global variable & method
const Global = {
  // canvas context
  canvas: document.getElementById('canvas'),
  ctx: this.canvas.getContext('2d'),
  // size of one block
  size: 40,
  // how much block used for 1 tetrominoes
  length: 4,
  // loop through block length 
  LoopThroughLength: function(callback) {
	for (let i = 0; i < this.length; i++) {
	  callback(i);
	}
  },
  // random index block
  NewBlockIndex: function() {
	return Math.round(Math.random() * 6);
  }

};

// import the module
importScript('./blocks');
importScript('./board');

window.addEventListener('load', () => {

  // declare obj
  const blocks = new Blocks();
  const board = new Board();

  // draw vertical line on canvas
  // for (let i = 0; i < canvas.width; i += (blocks.size * 2)){
	// ctx.beginPath();
	// ctx.fillStyle = '#f2f2f2';
	// ctx.fillRect(i, 0, blocks.size, canvas.height);
	// ctx.fill();
  // }
  // console.log(this.size);

  window.addEventListener('keydown', e => blocks.Move(e.code));
  const start = level => {
	const gameInterval = setInterval(() => {

	  var current = blocks.pos;

	  // current position Y < board.filled.y
	  var currentPositionY = current.y.find(posY => board.filled.y.indexOf(posY + Global.size) > -1);
	  var currentPositionX = current.x.find(posX => board.filled.x.indexOf(posX) > -1);
	  if ( (currentPositionY != undefined && currentPositionX != undefined) || 
		current.y.find(posY => (posY + Global.size) >= Global.canvas.height) )
	  {
		console.log('placed');
		blocks.NewBlock();


		clearInterval(gameInterval);
		board.NewFilledPosition(current);

		// generate new block
		blocks.currentBlock = Global.NewBlockIndex();
		start();
	  } else {
		blocks.Draw();
	  }
	}, 250);
  }

  // console.log(board.space.x);
  // console.log(board.space.y);
  start();
});
