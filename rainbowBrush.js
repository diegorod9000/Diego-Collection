// let brushHue = 0, brush_globalSat = 50, brush_globalBri = 80;
// let brush_PriorX, brush_PriorY;
// let brush_GlobalStroke = 6;

let brushSetup = function () {
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100);
    brushHue = 0, brush_globalSat = 75, brush_globalBri = 80, brush_GlobalStroke = 6;
    strokeWeight(brush_GlobalStroke);
    background(0);
}
function chooseBrushColors() {

    brushHue = random(0, 360)
    brush_globalSat = random(0, 100)
    brush_globalBri = random(0, 100)
    stroke(brushHue, brush_globalSat, brush_globalBri);
    fill(brushHue, brush_globalSat, brush_globalBri);
}

let brushDraw = function () {

    let dist = Math.sqrt((mouseX - pmouseX) ^ 2 + (mouseY - pmouseY) ^ 2);
    //console.log(dist);
    strokeWeight(brush_GlobalStroke + dist)

    if (keyIsPressed) {
        brush_GlobalStroke = 1;
    }

    if (mouseIsPressed) {
        chooseBrushColors();
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
    else {
        stroke(0);
        fill(0);
        line(pmouseX, pmouseY, mouseX, mouseY)
    }


}

let brushClear = function () {
    delete brushHue, brush_globalSat, brush_globalBri, brush_GlobalStroke;
}


function chooseBrushColors() {

    brushHue = random(0, 360)
    brush_globalSat = random(30, 100)
    brush_globalBri = random(10, 100)
    stroke(brushHue, brush_globalSat, brush_globalBri);
    fill(brushHue, brush_globalSat, brush_globalBri);
}