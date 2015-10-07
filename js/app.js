// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.yLocation = function() {
        var y = Math.floor((Math.random() * 3) + 1);
        if(y == 1){
            return 61;
        }else if(y == 2){
            return 145;
        }else {
            return 229;
        }
    };
    this.xLocation = function() {
        return (Math.random() * -800) - 100;
    };
    this.speed = 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = (Math.random() * 505) * (Math.random() < 0.5 ? -1 : 1);
    this.y = this.yLocation();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Makes bugs appear to crawl by randomly changing their speed
    this.x += this.speed * dt;
    //resets bugs position after crossing game board
    if(this.x > 500){
        this.x = this.xLocation();
        this.y = this.yLocation();

}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
    return 0;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];
var player = Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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
