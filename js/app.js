var play = 1;
var lives = 3;
var score = 0;

$('#lifeOutput').html("<h1>"+lives+"<h1>");
$('#scoreOutput').html("<h1>"+score+"<h1>");
//SetSpeed function:
function setSpeed() {
    //this sets the speed of the enemy bug to be randomly slow or fast within a range:
    return Math.random() * (300 - 150) + 150;
}

function youWin(player){
    score = score+1000;
    score = score*lives;
    $('#scoreOutput').html("<h1>"+score+"<h1>");
    play = 0;
    $('#canvasContainer').empty();
    $('#canvasContainer').append('<img src="images/youWin.jpg">');
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.boxY = this.y+77;
    this.boxWidth = 98;
    this.boxHeight = 67;
    this.speed = setSpeed();
    this.hitbox = {x:this.x, y:this.y, width:this.boxWidth, height:this.boxHeight};
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
        this.speed = setSpeed();
    }
    this.makeHitBox();
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitbox.x;
    var rectY = this.y+77;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    // this.drawHitBox(rectX, rectY, rectWidth, rectHeight, "red");
};

Enemy.prototype.makeHitBox = function(){
    this.hitbox.x = this.x;
    this.hitbox.y = this.y+77;
};

Enemy.prototype.drawHitBox = function (x, y, width, height, color) {
    //this function puts the hitbox on the screen
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 430;
    this.boxWidth = 65;
    this.boxHeight = 79;
    this.boxXvalue = this.x + 18;
    this.boxYvalue = this.y + 61;
};

Player.prototype.drawBox = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 430;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // this.drawBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "yellow");
};

//update the player on keypress:
Player.prototype.update = function(){
    //this will contain the collision checks
    //first, checks on the edges of the canvas:
    if (this.x < 0 || this.x > 400){
        if(this.x <0){
            this.x = 0;
        }else if(this.x > 400){
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400){
        if (this.y < 0){
            this.reset();
            youWin();
        }else if (this.y > 430) {
            this.y = 430;
        }
    }
    if(this.y < 300){
        score++;
        $('#scoreOutput').html("<h1>"+score+"<h1>");
    }
    //then, do the two other processes required each tic: update the player hitbox and check if it's hit anything
    this.updateHitbox();
    this.checkCollisions();
    console.log(this.x, this.y);
};

Player.prototype.updateHitbox = function(){
    this.boxXvalue = this.x + 18;
    this.boxYvalue = this.y + 61;
};

Player.prototype.checkCollisions = function(){
    var playerBox = {x:this.boxXvalue, y:this.boxYvalue, width:this.boxWidth, height: this.boxHeight};
    for(var i = 0; i < allEnemies.length; i++){
        var rect1 = playerBox;
        var rect2 = allEnemies[i].hitbox;
        //this is the collision check code from the MDN 2d collision check:
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            // collision detected!
            //rest and remove a life
            lives--;
            $('#lifeOutput').html("<h1>"+lives+"<h1>");
            this.render();
            this.reset();
            //if the player has no lives, end game:
            if(lives === 0){
                $('#canvasContainer').empty();
                $('#canvasContainer').append('<img src="images/gameOver.jpg">');
            }
        }
    }
};

// Update the player's position, required method for game
Player.prototype.handleInput = function(direction) {
    switch(direction){
        case "left":
            this.x -=100;
            break;
        case "right":
            this.x +=100;
            break;
        case "up":
            this.y -=90;
            break;
        case "down":
            this.y +=90;
            break;
    }
};

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
