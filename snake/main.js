// function for import script
const importScript = url => {
  let script = document.createElement('script');
  script.src = url.match(/.js$/) ? url : url + '.js';
  document.getElementsByTagName('body')[0].appendChild(script);
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

importScript('/snake/snake');
importScript('/snake/food');

window.addEventListener('load', () => {

  const restartGame = () => {
	score = 0;
	displaySpeed.innerHTML = 0;
	snake = new Snake();
	food = new Food();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // restart-btn is clicked
  document.getElementById('restart-btn').addEventListener('click', restartGame);

  // speed up button clicked
  document.addEventListener('click', e => {
	switch(e.target.id) {
	  case 'speed-up':
		speed = speed > 10 ? speed - 10 : speed;
		break;
	  case 'speed-down':
		speed = speed < 200 ? speed + 10 : speed;
		break;
	  default:
		return;
	};

	document.getElementById('display-speed').innerHTML = 210-speed;

	// clearInterval
	start(false);
	// start interval again
	start(speed);
  });

  var snake = new Snake();
  var food = new Food();

  // set speed, lower == faster
  var speed = 80;
  var score = 0;
  var displaySpeed = document.getElementById('score-num');

  var drawInterval = null;
  const start = time => {

	// if argument passed false
	if (time) {

	  drawInterval = setInterval(() => {

		if (snake.IsDead()){
		  alert('You are Dead!\nScore: ' + score);
		  restartGame();
		}

		// if the snake eat the food
		if ( food.pos.x === snake.pos.x[0] && food.pos.y === snake.pos.y[0] ) {
		  food.NewFoodPosition();

		  // grow the snake
		  snake.pos.x.unshift(snake.pos.x[0]);
		  snake.pos.y.unshift(snake.pos.y[0]);
		  snake.length++;

		  // add 20 score
		  displaySpeed.innerHTML = score += snake.size;
		}

		// if the snake eat the bonus food
		if ( food.bonus !== null && food.bonus.x === snake.pos.x[0] && food.bonus.y === snake.pos.y[0] ) {
		  food.bonus = null;

		  // grow the snake 3 point
		  for (let i = 0; i < 3; i++) {
			snake.pos.x.unshift(snake.pos.x[0]);
			snake.pos.y.unshift(snake.pos.y[0]);
		  }
		  snake.length += 3;

		  // add 50 score
		  displaySpeed.innerHTML = score += 50;
		}

		snake.Draw();
		food.Draw();

	  }, time);

	} else {
	  // if time argument passed false
	  clearInterval(drawInterval);
	}

  }
  start(speed);

});
