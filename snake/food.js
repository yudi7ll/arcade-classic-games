class Food {
  constructor()
  {
	this.size = 20;

	this.canvas = {
	  width: canvas.width - this.size,
	  height: canvas.height - this.size
	}

	this.foodSpawn = 0;
	this.bonus = null;

	this.NewFoodPosition();

  }

  BonusFood = () => {
	this.bonus = this.FoodPosition();

	if (this.bonus && this.bonus != null) {
	  var color = 0;

	  setInterval(() => {
		ctx.save();
		if (color) {
		  ctx.fillStyle = 'red';
		  color = 0;
		} else {
		  ctx.fillStyle = 'white';
		  color = 1;
		}

		ctx.fillRect(
		  this.bonus.x,
		  this.bonus.y,
		  this.size,
		  this.size
		);
		ctx.restore();
	  }, 80);

	  // food dissapear after 5 sec
	  setTimeout(() => {
		ctx.clearRect(
		  this.bonus.x,
		  this.bonus.y,
		  this.size,
		  this.size
		);

		this.bonus = null;
	  }, 5000);
	}

  }

  NewFoodPosition = () => {
	this.pos = this.FoodPosition();

	// spawn Bonus food after 4 times eat food
	if (this.foodSpawn > 4) {
	  this.BonusFood();
	  this.foodSpawn = 0;
	}

	this.foodSpawn++;
  }

  FoodPosition = () => {
	// function to generate position x
	const generatePosition = limit => {
	  var generatedPos = [];

	  for (let i = 0; i < limit; i += this.size) {
		generatedPos.push(i);
	  }

	  return generatedPos;
	}

	// function to generate index 
	const generateRandom = length => {
	  return Math.floor(Math.random() * length);
	}

	// list of position
	const posX = generatePosition(this.canvas.width);
	const posY = generatePosition(this.canvas.height);

	// return position of x & y
	return {
	  x: posX[generateRandom(posX.length)],
	  y: posY[generateRandom(posY.length)]
	};

  }

  Draw = () => {
	ctx.clearRect(
	  this.pos.x,
	  this.pos.y,
	  this.size,
	  this.size
	);
	ctx.save();
	ctx.fillStyle = 'magenta';
	ctx.fillRect(
	  this.pos.x,
	  this.pos.y,
	  this.size,
	  this.size
	);
	ctx.restore();
  }

}
