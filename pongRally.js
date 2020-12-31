// let paddleStart, paddleHeight, paddleWidth, bounceFactor, pongScore,
//     pongBall, paddleStrength, ballColor,
//     pongEnd, pongBackground;

let pongSetup = function () {

    //canvas & color settings
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100);
    pongBackground = 95;
    background(pongBackground);

    //ball
    pongBall = {
        y: 30,
        yVel: 0,
        x: width / 2,
        xVel: 0,
        diameter: 40,
        terminalVelocity: 20
    };
    bounceFactor = 25;
    ballColor = 0;

    //paddle
    paddleHeight = 10;
    paddleWidth = 100;
    paddleStrength = 3;
    pongEnd = false;

    //score text
    pongScore = 0;
}

let pongDraw = function () {
    background(95);

    //stops game if you lost
    if (pongEnd) {
        fill(0)
        rect(width / 2 - 100, height / 2 - 20, 200, 72)
        fill(pongBackground)
        text("SCORE: " + pongScore, width / 2 - 30, height / 2 + 22)
        text("Click to Restart", width / 2 - 42, height / 2 + 42)
        text("GAME OVER", width / 2 - 40, height / 2 + 2)
        if (mouseIsPressed) {
            pongSetup();
        }

        return;
    }

    //update score
    textColor = color(0);
    text("Score:" + pongScore, 20, 20);

    //paddle
    paddleStart = mouseX - paddleWidth / 2;
    fill(0);
    rect(paddleStart, height - 40, paddleWidth, paddleHeight);


    //ball
    circle(pongBall.x, pongBall.y, pongBall.diameter);


    //bounce the ball off the borders, and change the ball's position
    if (pongBall.x >= width || pongBall.x <= 0) {
        pongBall.xVel = -pongBall.xVel;
    }
    pongBall.x += pongBall.xVel;
    pongBall.y += pongBall.yVel;

    //detect if the game should end with the new y position
    if (pongBall.y > height) {
        pongEnd = true;
        return;
    }

    // Detect ball collision and react according to its position on the paddle
    if (collideRectCircle(paddleStart, height - 40, paddleWidth, paddleHeight, pongBall.x, pongBall.y, pongBall.diameter)) {

        if (pongBall.x > paddleStart + paddleWidth / 2)
            pongBall.xVel += paddleStrength;

        if (pongBall.x < paddleStart + paddleWidth / 2)
            pongBall.xVel -= paddleStrength;
        //if the ball hits dead center, its x velocity will be constant

        //change y velocity
        pongBall.yVel -= pongBall.yVel + bounceFactor;
        pongScore++;
        pongBall.y -= 55;


    }
    else if (pongBall.yVel < pongBall.terminalVelocity) { //If the ball isn't being hit, the ball's gravity is used
        pongBall.yVel += 1.09;
    }

}

let pongClear = function () {
    delete paddleStart, paddleHeight, paddleWidth, bounceFactor, pongScore,
        pongBall, paddleStrength, ballColor,
        pongEnd, pongBackground;
}