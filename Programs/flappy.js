//let bird, pipes, frame, score, hp;

let flappySetup = function () {
    createCanvas(500, 500);
    colorMode(HSB, 100);
    noStroke();
    pipes = [];
    frame = 0;
    score = 0;
    hp = 100;
    bird = new Bird();
    released = true;
}

let flappyDraw = function () {
    background(0);

    if (hp > 0) { //checks if the game should be over
        bird.show();
        bird.move();

        frame++;
        if (frame >= 100) {//every 100 frames, a new set of pipes are made with a hole 
            frame = 0;
            let holeY = random(51, height - 51);
            pipes.push(new Pipe(true, holeY));
            pipes.push(new Pipe(false, holeY));
        }

        for (let i = pipes.length - 1; i >= 0; i--) {//performs all of the pipe actions, including checking if they should be deleted
            pipes[i].show();
            if (pipes[i].isOffScreen()) pipes.splice(i, 1);
            pipes[i].checkPass();
            pipes[i].checkCollision();
        }
        fill("white");
        text("HP: " + hp + "\nScore: " + score, 30, 30);//displays score and HP
    }
    else {
        text("GAME OVER", height / 2, width / 2);
        if (mouseIsPressed) flappySetup();//resets if the player clicks
        return;
    }

    //code for "flapping"
    if (keyIsPressed && released) {
        released = false;
        bird.yVelocity = -10;
    }
    else if (!keyIsPressed) {
        released = true;
    }
}

let flappyClear = function () {
    delete bird, pipes, frame, score, hp, released;
}

class Bird {
    constructor() {//initial position
        this.y = height / 3;
        this.x = width / 4;
        this.yVelocity = 0;
    }

    show() {
        fill("yellow");
        ellipse(this.x, this.y, 16);
    }

    move() {//moves, and changes due to gravity
        this.yVelocity += 0.75;
        this.y += this.yVelocity;
        if (this.y >= height - 10) {//stops on the ground
            this.y = height - 10;
            this.yVelocity = 0;
        }
    }
}

class Pipe {
    constructor(floor, holeY) {//floor determines if the pipe comes from ground or ceiling, holeY is where the hole is
        this.xPos = width + 10;
        this.isGrounded = floor;
        this.hole = holeY;
        this.passed = true;
    }

    show() {
        this.xPos -= 2;
        fill("green");
        if (this.isGrounded) {//shows differently depending on if it's from the floor or ceiling
            rect(this.xPos, this.hole + 50, 30, height);
        } else {
            rect(this.xPos, 0, 30, this.hole - 50);
        }
    }

    isOffScreen() {//once the pipe is well off screen, it can be deleted
        return this.xPos < -50;
    }

    checkPass() {//only one pipe per set gets to see if the bird gets points
        if (this.isGrounded && this.passed && this.xPos < bird.x) {
            score++;
            console.log(score);
            this.passed = false;
        }
    }

    checkCollision() {//checks every single frame if the pipe is colliding with the bird
        if (this.isGrounded)
            if (
                collideRectCircle(
                    this.xPos,
                    this.hole + 50,
                    30,
                    height,
                    bird.x,
                    bird.y,
                    16
                )
            )
                hp--;
            else return;
        else if (
            collideRectCircle(this.xPos, 0, 30, this.hole - 50, bird.x, bird.y, 16)
        )
            hp--;
    }
}
