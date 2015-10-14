var winning = document.getElementById('win');
var loseing = document.getElementById('lose')
function winLose(){
    for(var i = 0; i < allEnemies.length; i++){
    if((player.left < allEnemies[i].right) &&
        (player.right > allEnemies[i].left) &&
        (player.top < allEnemies[i].bottom) &&
        (player.bottom > allEnemies[i].top)){
        console.log("lose");
        player.lose++;
        loseing.innerHTML = player.lose;
        player.x = 200;
        player.y = 322;
        player.left = player.x + 17;
        player.right = player.x + 83;
        player.top = player.y + 70;
        player.bottom = player.y + 138;
    }
    }
    if(player.y < 50){
        console.log("You Win!!");
        player.win++;
        winning.innerHTML = player.win;
        player.x = 200;
        player.y = 322;
    }
}
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
    this.speed = 100;//regular 100
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = (Math.random() * 505) * (Math.random() < 0.5 ? -1 : 1);
    this.y = this.yLocation();
    this.left = this.x + 3;
    this.right = this.x + 99;
    this.top = this.y + 77;
    this.bottom = this.y + 140;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //resets bugs position after crossing game board
    if(this.x > 500){
        this.x = this.xLocation();
        this.y = this.yLocation();
    }
    this.left = this.x + 3;
    this.right = this.x + 99;
    this.top = this.y + 77;
    this.bottom = this.y + 144;
    winLose();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.rect(this.x + 3, this.y + 77,96,67);
    //ctx.stroke();
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 322;
    this.sprite = 'images/char-boy.png';
    this.win = 0;
    this.lose = 0;
    this.left = this.x + 17;
    this.right = this.x + 83;
    this.top = this.y + 70;
    this.bottom = this.y + 138;
}
Player.prototype.update = function() {
    //winLose();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.rect(this.left, this.top,66,74);
    //ctx.stroke();
};
Player.prototype.handleInput = function(test) {
    if(test == "up"){
        this.y -= 83;
    }else if(test == "down") {
        if(this.y <= 322){
            this.y += 83;
        }
    }else if(test == "left"){
        if(this.x >= 25){
            this.x -= 25;
        }
    }else if(test == "right"){
        if(this.x < 400){
            this.x += 25;
        }
    }
    this.left = this.x + 17;
    this.right = this.x + 83;
    this.top = this.y + 64;
    this.bottom = this.y + 138;
    winLose();
    console.log(this.x + " " + this.y);
};
var allEnemies = [];
for(var i = 0; i <= 3; i++){
allEnemies.push(new Enemy);
}



var player = new Player();
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
