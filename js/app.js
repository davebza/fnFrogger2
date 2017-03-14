// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 10;//change this to a setSpeed() function later
    // this.hitbox =
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed*dt);
    if (this.x > 490){
        this.x = 0;
        }
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//update the player on keypress:
Player.prototype.update = function(){
    //this will contain the collision checks
    //first, checks on the edges of the canvas:
    console.log(this.y);
    if (this.x < 0 || this.x > 400){
        if(this.x <0){
            this.x = 0;
        }else if(this.x > 400){
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400){
        if(this.y < 100){
            //victory condition:
            alert("you win");
        }
        if (this.y < 0){
            this.y = 0;
        }else if (this.y > 400) {
            this.y = 400;
        }
    }

}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.handleInput = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    switch(direction){
        case "left":
            this.x -=100;
            //this.updateHitBoxXvalue();
            break;
        case "right":
            this.x +=100;
            //this.updateHitBoxXvalue();
            break;
        case "up":
            this.y -=90;
            //this.updateHitBoxYvalue();
            break;
        case "down":
            this.y +=90;
            //this.updateHitBoxYvalue();
            break;
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 230), new Enemy(0, 145), new Enemy(0, 60)];
var player = new Player();


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
