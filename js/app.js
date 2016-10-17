// Enemies our player must avoid
var Enemy = function(difficulty) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -Math.floor((Math.random() * 500));
    this.y = Math.floor((Math.random() * 3) + 1) * 100;
    this.speed = Math.floor((Math.random() * 75) + (50 * difficulty));
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
}

// Determine whether another object intersects with this
// enemy's bounding box. Returns true if the other object's
// x and y coordinates fall within the bounding box
Enemy.prototype.intersects = function(other) {
  var rightBound = this.x + 75;
  var leftBound = this.x - 50;
  var topBound = this.y - 50;
  var bottomBound = this.y + 50;

  return (other.x < rightBound &&
          other.x > leftBound &&
          other.y < bottomBound &&
          other.y > topBound);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
  this.points = 0;
  this.hit = false;
  this.lives = 3
  this.alive = true;
}

// Updates the Player object according to game state
Player.prototype.update = function() {

  // If the Player reaches the river, then increment the point total
  if (this.y == 0) {
    this.points++;
    this.resetPosition()
  }

  // If the Player has been hit, decrement lives and put the player
  // back on the starting square
  if (this.hit) {
    this.hit = false;
    this.lives--;
    this.resetPosition()
  }

  // If the Player has run out of lives, kill the Player
  if (this.lives == 0) {
    this.alive = false;
  }

}

// Place the Player on the desired square according to the
// input device, respecting the bounds of the game board
Player.prototype.handleInput = function(code) {

  switch (code) {
    case 'left':
      this.x = Math.max(0, this.x - 100);
      break;
    case 'right':
      this.x = Math.min(400, this.x + 100);
      break;
    case 'down':
      this.y = Math.min(380, this.y + 83);
      break;
    case 'up':
      this.y = Math.max(0, this.y - 83);
      break;

  }
}

// Draw the Player on the scren
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset the Player to the initial position
Player.prototype.resetPosition = function() {
  this.x = 200;
  this.y = 380;
}

// Reset the Player to its initial state
Player.prototype.reset = function() {
  this.lives = 3;
  this.points = 0;
  this.alive = true;
  this.resetPosition();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
