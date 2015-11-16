var winning = document.getElementById('win');
var losing = document.getElementById('lose');
// Enemies player must avoid
var Enemy = function() {
    //intital X corinate completely random
    this.x = (Math.random() * 505) * (Math.random() < 0.5 ? -1 : 1);
    switch (Math.floor((Math.random() * 3) + 1)) {
        case 1:
            this.y = 61;
            break;
        case 2:
            this.y = 145;
            break;
        case 3:
            this.y = 229;
            break;
    }
    this.left = this.x + 3;
    this.right = this.x + 99;
    this.top = this.y + 77;
    this.bottom = this.y + 140;
    this.speed = 100; //regular 100
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Desides what path Enemy will take randomly
    this.yLocation = function() {
        switch (Math.floor((Math.random() * 3) + 1)) {
            case 1:
                this.y = 61;
                break;
            case 2:
                this.y = 145;
                break;
            case 3:
                this.y = 229;
                break;
        }
    };
    //sets Enemy X location randomly but off screen
    this.xLocation = function() {
        this.x = (Math.random() * -800) - 100;
    };
    this.resetBox = function() {
        this.left = this.x + 3;
        this.right = this.x + 99;
        this.top = this.y + 77;
        this.bottom = this.y + 140;
    };
    this.resetPos = function() {
        this.xLocation();
        this.yLocation();
        this.resetBox();
    };
    this.x += this.speed * dt;
    //resets bugs position after crossing game board
    if (this.x > 500) {
        this.resetPos();
    }
    this.resetBox();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Main Player Char
var Player = function() {
    this.x = 200;
    this.y = 322;
    this.left = this.x + 17;
    this.right = this.x + 83;
    this.top = this.y + 70;
    this.bottom = this.y + 138;
    this.sprite = 'images/char-boy.png';
    this.winCount = 0;
    this.loseCount = 0;
};

Player.prototype.update = function() {
    this.resetBox = function() {
        this.left = this.x + 17;
        this.right = this.x + 83;
        this.top = this.y + 70;
        this.bottom = this.y + 138;
    };
    this.resetPos = function() {
        this.x = 200;
        this.y = 322;
        this.resetBox();
    };
    this.win = function() {
        if (this.y < 50) {
            console.log("You Win!!"); //Debug Only
            //Add to win score and post to html tag
            this.winCount++;
            winning.innerHTML = this.winCount;
            this.resetPos();
        }
    };
    this.lose = function() {
        //Test for gap between player hitbox and allEnemies
        //Lose Test
        for (var i = 0; i < allEnemies.length; i++) {
            if ((this.left < allEnemies[i].right) &&
                (this.right > allEnemies[i].left) &&
                (this.top < allEnemies[i].bottom) &&
                (this.bottom > allEnemies[i].top)) {
                //Add to lose score and post to html tag
                this.loseCount++;
                losing.innerHTML = this.loseCount;
                this.resetPos();
            }
        }
    };
    this.lose();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Modifies Player's X and Y based on keyboard input
Player.prototype.handleInput = function(test) {
    switch (test) {
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            if (this.y <= 322) {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x >= 25) {
                this.x -= 25;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 25;
            }
    }
    this.resetBox();
    this.win();
};

//creating enemies
var allEnemies = [];
for (var i = 0; i < 10; i++) {
    allEnemies.push(new Enemy());
}

//Creating player
var player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});