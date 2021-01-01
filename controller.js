let projectSelection, position, switchButton;

function setup() {
    projectSelection=[
        [brushSetup, brushDraw, brushClear],
        [rainSetup, rainDraw, rainClear],
        [pongSetup, pongDraw, pongClear],
        [snakeSetup, snakeDraw, snakeClear],
        [coinSetup, coinDraw, coinClear],
        [frogSetup, frogDraw, frogClear],
        [flappySetup, flappyDraw, flappyClear]
    ];
    position=0;
    switchButton=createButton('Next Module');
    switchButton.mousePressed(changeModules);

    projectSelection[position][0]();
}

function draw(){
    projectSelection[position][1]();
}

function changeModules(){
    projectSelection[position][2]();
    if(++position===projectSelection.length)
        position=0;
    projectSelection[position][0]();
}