// let backgroundColor,frogX,frogY,score,lives,gameIsOver,
//   carIndex,lanes,laneIndex, pressed;

let frogSetup = function () {
    noStroke();
    createCanvas(450, 450);
    colorMode(HSB, 360, 100, 100);
    backgroundColor = 95;
    carIndex = 0;
    score = 0;
    lives = 3;
    gameIsOver = false;
    released = true;
    resetCars();

    frog = {
        x: width / 2,
        y: 400
    };
}

let frogDraw = function () {
    background(backgroundColor);
    if (gameIsOver) {
        text(`Game Over.\nFinal Score: ${score}\nClick to restart`,
            width / 3,
            height / 2);
        if (mouseIsPressed)
            frogSetup();
        return;
    }

    if (keyIsPressed && released) {
        released = false;
        if (keyCode === UP_ARROW) frog.y -= 13;
        if (keyCode === RIGHT_ARROW) frog.x += 13;
        if (keyCode === DOWN_ARROW) frog.y += 13;
        if (keyCode === LEFT_ARROW) frog.x -= 13;
    }
    else if (!keyIsPressed) {
        released = true;
    }

    // Code for gold goal line
    fill("yellow");
    rect(0, 0, width, 50);

    // Code to display Frog
    fill(120, 80, 80);
    ellipse(frog.x, frog.y, 15);

    fill("red");
    for (laneIndex = 0; laneIndex < 10; laneIndex++) {
        lanes[laneIndex].updateCars();
    }
    if (frog.y <= 50) {
        score += 1;
        frog.x = width / 2;
        frog.y = 400;
        resetCars();
    }

    //display lives and score
    textSize(12);
    fill(0);
    text(`Lives: ${lives}`, 10, 20);
    text(`Score: ${score}`, 10, 40);

}

let frogClear = function () {
    delete backgroundColor, score, lives, gameIsOver, carIndex, lanes, laneIndex;
}


class Car {
    constructor(vel, pos) {
        this.vel = vel;
        this.posX = pos;
    }
    move() {
        this.posX += this.vel;
        if (this.posX < -50) this.posX = 500;
        if (this.posX > 550) this.posX = -50;
    }
}

class Lane {
    constructor(posY) {
        this.posY = posY;
        this.cars = [];
        this.vel = random(-3, 4);
        for (carIndex = 0; carIndex < 3; carIndex++) {
            this.cars.push(new Car(this.vel, random(width)));
        }
    }

    updateCars() {
        for (carIndex = 0; carIndex < this.cars.length; carIndex++) {
            this.cars[carIndex].move();
            rect(this.cars[carIndex].posX, this.posY, 40, 30);
            if (collideRectCircle(this.cars[carIndex].posX, this.posY, 40, 30, frog.x, frog.y, 15)) {
                lives--;
                frog.x = width / 2;
                frog.y = 400;
            }
            if (lives == 0) {
                gameIsOver = true;
                return;
            }
        }
    }
}

function resetCars() {
    lanes = [];
    for (laneIndex = 0; laneIndex < 10; laneIndex++)
        lanes.push(new Lane(laneIndex * 30 + 50));
}