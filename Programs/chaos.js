//let dots;

let chaosSetup = function() {
    createCanvas(600, 600);
    colorMode(HSL, 360, 100, 100);
    dots = [];
    dots.push(new BouncyDot())
}

let chaosDraw = function() {
    background(220, 0, 10);

    //make each dot move and display
    for (let dot = 0; dot < dots.length; dot++) {
        dots[dot].float();
        dots[dot].display();
    }

    //check if any dot collides with each other
    {
        for (let x = 0; x < dots.length; x++)
            for (let y = x + 1; y < dots.length; y++)
                if (collideCircleCircle(dots[x].x, dots[x].y, dots[x].r, dots[y].x, dots[y].y, dots[y].r,)) {
                    let temp = dots[x];
                    dots[x].bounceOff(dots[y]);
                    dots[y].bounceOff(temp);
                }
    }

    if (keyIsPressed && released) {
        released = false;
        dots.push(new BouncyDot());
    }
    else if (!keyIsPressed) {
        released = true;
    }

}

let chaosClear = function(){
    delete dots;
}

class BouncyDot {
    constructor() {
        // Randomly generate position
        this.x = random(width);
        this.y = random(height);
        // Randomly generate radius
        this.r = random(10, 20);
        // Randomly generate color
        this.color = random(360);
        // Randomly generate a master velocity (broken into components)...
        this.xVelocity = random(0.5, 3);
        this.yVelocity = random(0.5, 3);
        // ...and use those as starting velocities.
        this.mass = this.r ** 3;

    }

    float() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        // Standard bounce code - like the DVD logo, but for spheres.
        if (this.x-this.r<=0||this.x + this.r >=width) {
            this.xVelocity = -this.xVelocity;
        }
        if (this.y-this.r<=0|| this.y + this.r >= height) {
            this.yVelocity = -this.yVelocity
        }
    }

    display() {
        fill(this.color, 80, 70);
        noStroke();
        ellipse(this.x, this.y, this.r);
    }

    bounceOff(dot) {
        this.yVelocity=dot.yVelocity/sqrt(dot.xVelocity**2+dot.yVelocity**2)*dot.mass/this.mass;
        this.xVelocity=dot.xVelocity/sqrt(dot.xVelocity**2+dot.yVelocity**2)*dot.mass/this.mass;
    }
}