//let backgroundColor, score, time, gameIsOver, coins, coinIndex;

let coinSetup = function () {
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100);
    score = 0;
    coins = [];
    backgroundColor = 95;
    time = 1000;
    gameIsOver = false;
}

let coinDraw = function () {
    //
    background(backgroundColor);
    if (time > 0 && time % 100 == 0) {
        coins.push(new Coin());
    }

    if (!gameIsOver) {
        // handle collision 
        text(`Time remaining: ${time}\nScore: ${score}`, 20, 40);
        for (coinIndex = 0; coinIndex < coins.length; coinIndex++)
            coins[coinIndex].goCoin();
    }
    else {
        text(`Game Over.\nFinal Score: ${score}\nClick to restart.`, width / 2, height / 2);
        if (mouseIsPressed)
            coinSetup();
        return;
    }

    if (time == 0) {
        gameIsOver = true;
    }
    else {
        time--;
    }
    stroke("black");
    fill("black");
    stroke("red");
    fill("red");
    circle(mouseX, mouseY, 20);
}

let coinClear = function(){
    delete backgroundColor, score, time, gameIsOver, coins, coinIndex;
}

class Coin {
    constructor() {
        this.moveCoin()
    }
    moveCoin() {
        this.coinX = random(width);
        this.coinY = random(height);
        this.coinXV = random(-6, 7);
        this.coinYV = random(-6, 7);
        this.value = Math.floor(random(1, 12));
    }

    goCoin() {
        stroke(this.value * 30, 100, 90);
        fill(this.value * 30, 100, 90);
        this.coinX += this.coinXV;
        this.coinY += this.coinYV;
        if (this.coinX >= width || this.coinX <= 0)
            this.coinXV = -this.coinXV;
        if (this.coinY >= height || this.coinY <= 0)
            this.coinYV = -this.coinYV;
        circle(this.coinX, this.coinY, 20);
        if (collideCircleCircle(mouseX, mouseY, 20, this.coinX, this.coinY, 20)) {
            score += this.value;
            this.moveCoin()
        }
    }
}