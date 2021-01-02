
let escapeSetup = function () {
    createCanvas(350, 500);

    player = {
        x: width / 2,
        y: height / 4
    }
    chasers = [];
    lasers = [];

    //initialize chasers
    for (let i = 0; i < 17; i++) {
        chasers.push(new Chaser());
    }

    lives = 3;
    gameIsOver = false;
    score = 0;

    textAlign(CENTER)
}

let escapeDraw = function () {
    background(0);
    fill('white');
    //game over code
    if (gameIsOver) {
        text(`GAME OVER\nSCORE: ${score}\nClick to Restart`, width / 2, height / 2);
        if (mouseIsPressed) {
            escapeSetup();
        }
        return;
    }
    score++;

    text(`Score: ${score}\nLives: ${lives}`, width / 2, 10);

    //move player
    if (keyIsPressed) {
        if (keyCode === UP_ARROW && player.y >= 5) {
            player.y -= 3;
        } if (keyCode === DOWN_ARROW && player.y <= height / 2) {
            player.y += 3;
        } if (keyCode === RIGHT_ARROW && player.x <= width - 5) {
            player.x += 3;
        } if (keyCode === LEFT_ARROW && player.x >= 5) {
            player.x -= 3;
        }
    }
    //display Player
    rect(player.x - 2, player.y, 4, 12);
    rect(player.x - 4, player.y + 10, 8, 2);


    //enemy code
    fill('red');
    for (let i = 0; i < chasers.length; i++) {
        chasers[i].move();
    }
    //move lasers and check if they collide with player
    for (let i = 0; i < lasers.length; i++) {
        if (lasers[i].shoot()) {
            lasers.splice(i, 1);
            lives--;

            if (lives < 0) {
                gameIsOver = true;
                return;
            }
        }
        if (lasers[i].y <= -10) {
            lasers.splice(i, 1)
        }
    }
}

let escapeClear = function () {
    textAlign(LEFT);
    delete player, chasers, lasers, lives, gameIsOver, score;
}

class Chaser {
    constructor() {
        this.x = random(20, width - 20);
        this.y = random(height * 3 / 5, height - 20)
        this.velocity = 0;
    }

    move() {
        //moves and displays chaser
        this.x += this.velocity;
        rect(this.x - 3, this.y, 6, 15)
        rect(this.x - 6, this.y + 10, 12, 5)
        //rect(this.x + 3, this.y + 7, 3, 8)

        //randomly shoot lasers
        if (random(101) > 99) {
            lasers.push(new Laser(this.x, this.y));
        }

        //decide how the chaser will move next frame
        if (abs(this.velocity) > 8) {
            if (this.velocity > 0)
                this.velocity--;
            else
                this.velocity++;
        }
        if (this.x <= 30) {
            this.velocity += random(0, 2) / 2.0;
            return;
        }
        else if (this.x >= width - 30) {
            this.velocity += random(-2, 1) / 2.0;
            return;
        }
        else {
            this.velocity += random(-2, 2) / 2.0;
        }
    }
}

class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = -2.5;
    }

    shoot() {
        this.y += this.vel;
        rect(this.x, this.y, 1, 10);

        return (collideLineRect(this.x, this.y, this.x, this.y + 10, player.x - 2, player.y, 4, 12)
            || collideLineRect(this.x, this.y, this.x, this.y + 10, player.x - 4, player.y + 10, 8, 2));
    }
}