// let grass, drops;

let rainSetup = function () {
    createCanvas(500, 500);
    colorMode(HSB, 100);
    // Variables for droplet 1
    grass = []
    for (let index = 0; index < 30; index++)
        grass.push(new Grass());
    noStroke();
    fill(60, 80, 80);

    drops = [];
}

let rainDraw = function () {
    background(0, 0, 0);
    fill(60, 80, 80);

    for (dropCount = random(100); dropCount >= 0; dropCount -= 25)
        drops.push(new Drop(random(2, 7)));
    for (dropIndex = drops.length - 1; dropIndex >= 0; dropIndex--) {
        drops[dropIndex].drip();
        if (drops[dropIndex].posY >= height) {
            for (let index = 0; index < grass.length; index++) {
                if (drops[dropIndex].posX < grass[index].posX + 6 && drops[dropIndex].posX > grass[index].posX - 6)
                    grass[index].gotWater();
            }
            drops.splice(dropIndex, 1);
        }
    }
    fill("green")
    for (let index = 0; index < grass.length; index++)
        grass[index].display();
}

let rainClear = function () {
    delete grass, drops;
}
//raindrop object
class Drop {
    constructor(diameter) {
        this.posX = random(-50, width);
        this.posY = 0;
        this.velY = random(8, 20);
        this.velX = random(0, 3);
        this.diam = diameter;
    }

    drip() {
        this.posY += this.velY;
        this.posX += this.velX;
        circle(this.posX, this.posY, this.diam);
    }
}

//grass object
class Grass {
    constructor() {
        this.posX = random(width)
        this.height = 2;
        this.width = 1;
        this.water = 0;
    }

    gotWater() {
        this.water++;
        if (this.water >= 5) {
            this.height++;
            this.water = 0;
        }
        if (this.height % 5 == 0) {
            this.width++;
            this.height++;
        }
    }

    display() {
        rect(this.posX - this.width / 2, height - this.height, this.width, this.height);
    }
}

