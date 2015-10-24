var winning = document.getElementById('win');
var losing = document.getElementById('lose');
function winLose() {
    //Test for gap between player hitbox and allEnemies
    //Lose Test
    for(var i = 0; i < allEnemies.length; i++) {
        if ((player.left < allEnemies[i].right) &&
            (player.right > allEnemies[i].left) &&
            (player.top < allEnemies[i].bottom) &&
            (player.bottom > allEnemies[i].top)) {
            console.log("lose"); //Debugging Only
            //Add to lose score and post to html tag
            player.lose++;
            losing.innerHTML = player.lose;
            player.resetPos();
        }
    }
    //Test if player reaches water
    //Win test
    if (player.y < 50) {
        console.log("You Win!!"); //Debug Only
        //Add to win score and post to html tag
        player.win++;
        winning.innerHTML = player.win;
        player.resetPos();
    }
}

// Enemies player must avoid
var Enemy = function() {
    //Desides what path Enemy will take randomly
    this.yLocation = function() {
        var y = Math.floor((Math.random() * 3) + 1);
        if (y == 1) {
            this.y = 61;
        } else if (y == 2) {
            this.y = 145;
        } else {
            this.y = 229;
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
    this.speed = 100; //regular 100
    this.sprite = 'images/enemy-bug.png';
    this.resetPos();
    //intital X corinate completely random
    this.x = (Math.random() * 505) * (Math.random() < 0.5 ? -1 : 1);

};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //resets bugs position after crossing game board
    if (this.x > 500) {
        this.resetPos();
    }
    this.resetBox();
    winLose();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //uncomment to hit box
    //ctx.rect(this.x + 3, this.y + 77,96,67);
    //ctx.stroke();
};

//Main Player Char
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.win = 0;
    this.lose = 0;
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
    this.resetPos();
};

Player.prototype.update = function() {
    //////Nothing here!!
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //uncomment to see hit box
    //ctx.rect(this.left, this.top,66,74);
    //ctx.stroke();
};

//Modifies Player's X and Y based on keyboard input
Player.prototype.handleInput = function(test) {
    if (test == "up") {
        this.y -= 83;
    } else if (test == "down") {
        if (this.y <= 322) {
            this.y += 83;
        }
    } else if (test == "left") {
        if (this.x >= 25) {
            this.x -= 25;
        }
    } else if (test == "right") {
        if (this.x < 400) {
            this.x += 25;
        }
    }
    this.resetBox();
    console.log(this.x + " " + this.y); //Debugging Only
};

//creating enemies
var allEnemies = [];
for (var i = 0; i < 10; i++) {
    allEnemies.push(new Enemy);
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