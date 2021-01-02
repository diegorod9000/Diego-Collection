//let backgroundColor, playerSnake, currentApple, score, rate, gameIsOver, lives;

let snakeSetup = function () {
    // Canvas & color settings
    lives = 3;
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100);
    backgroundColor = 95;
    rate = 5;
    frameRate(rate);
    playerSnake = new Snake(null, null, null);
    currentApple = new Apple();
    score = 0;
    gameIsOver = false;

};

let snakeDraw = function () {

    if (gameIsOver) {
        stroke(0);
        text('GAME OVER', width / 2, height / 2);
        if (mouseIsPressed)
            snakeSetup();
        return;
    }

    frameRate(rate);
    background(backgroundColor);

    if (keyIsPressed) {
        if (keyCode === UP_ARROW && playerSnake.direction !== "S") {
            playerSnake.direction = "N";
        } else if (keyCode === DOWN_ARROW && playerSnake.direction !== "N") {
            playerSnake.direction = "S";
        } else if (keyCode === RIGHT_ARROW && playerSnake.direction !== "W") {
            playerSnake.direction = "E";
        } else if (keyCode === LEFT_ARROW && playerSnake.direction !== "E") {
            playerSnake.direction = "W";
        } else {
            console.log("wrong key");
        }
    }

    // The snake's methods are separated for readability
    playerSnake.moveSelf();
    playerSnake.showSelf();
    playerSnake.checkCollisions();
    playerSnake.checkApples();

    // The apple needs fewer methods to show up on screen.
    currentApple.showSelf();

    // displayText
    text("Current Score: " + score, 10, 10)
    text("Lives: " + lives, 10, 20)


    if (lives == 0) {
        gameIsOver = true;
    }
}

let snakeClear = function () {
    delete backgroundColor, playerSnake, currentApple, score, rate, gameIsOver, lives;
    frameRate(60);
}

class Snake { //The snake uses a linked list
    constructor(x, y, dir) {
        //checks if this is the head or part of the tail
        if (x == null) {
            this.x = width / 2;
            this.y = height - 10;
            this.direction = "N";
        } else {
            this.x = x;
            this.y = y;
            this.direction = dir;
        }
        this.speed = 10;
        this.snake = null;
        this.size = 10;
        this.color = color(random(360), 80, 80);
    }

    moveSelf() {
        if (this.direction === "N") {
            this.y -= this.speed;
        } else if (this.direction === "S") {
            this.y += this.speed;
        } else if (this.direction === "E") {
            this.x += this.speed;
        } else if (this.direction === "W") {
            this.x -= this.speed;
        } else {
            console.log("Error: invalid direction");
        }
        if (this.snake != null) {
            this.snake.moveSelf();
            this.snake.direction = this.direction;
        }
    }

    showSelf() {
        stroke(this.color);
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
        noStroke();
        if (this.snake != null) {
            this.snake.showSelf();
        }
    }

    checkApples() {
        if (collideRectRect(this.x, this.y, 10, 10, currentApple.x, currentApple.y, 10, 10)) {
            score++;
            this.extendTail();
            currentApple.move(); //add another segment and move the apple
            rate = 5 + Math.pow(score, .9)
            //if(rate < 15, 
        }
    }

    checkCollisions() {
        let iter = this.snake;
        if (this.y > height || this.y < 0 || this.x < 0 || this.x > width) {
            lives --;
            if (lives <= 0){
                gameIsOver=true;
                return;
            }
        }
        while (iter != null) {
            if (collideRectRect(this.x, this.y, 9, 9, iter.x, iter.y, 9, 9)) {
                lives--;
                if (lives <= 0)
                    gameIsOver = true;
                return;
            }
            iter = iter.snake;
        }
    }

    extendTail() {
        if (this.snake == null) {
            let x = this.x,
                y = this.y;
            if (this.direction === "N") y += this.size;
            else if (this.direction === "S") y -= this.size;
            else if (this.direction === "E") x -= this.size;
            else if (this.direction === "W") x += this.size;
            else console.log("Error: invalid direction");
            this.snake = new Snake(x, y, this.direction);
        }
        else this.snake.extendTail();
    }
}



class Apple {
    constructor() {
        this.x = random(20, width - 20);
        this.y = random(20, height - 20);
    }

    showSelf() {
        fill(0, 80, 80);
        rect(this.x, this.y, 10);
    }
    move() {
        this.x = random(20, width - 20);
        this.y = random(20, height - 20);
    }
}