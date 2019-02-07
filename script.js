var props = null;
var gui = null;
var time;
var extremity;

class Props {
    constructor() {
        this.iterations = 20;
        this.speed = 0.01;
        this.radius = 0;
        this.pause = false;
        this.bones = false;
    }

    reset() {
        setup();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    if(props === null) {
        props = new Props();
    }
    if(gui === null) {
        gui = new dat.GUI();
        //dat.GUI.toggleHide(); //Hide GUI by default
        gui.add(props, 'reset');
        gui.add(props, 'pause').listen();
        gui.add(props, 'bones').listen();
        gui.add(props, 'iterations', 0, 100);
        gui.add(props, 'speed', 0, 0.1);
        gui.add(props, 'radius', 0, 1000).listen();
    }

    props.radius = 0.213*min(windowHeight, windowWidth);

    time = 0;
    extremity = createVector();

    createCanvas(windowWidth, windowHeight);
    background(0);
    noFill();
    stroke(255,150);
}

function draw() {
    background(0,140);
    var circlesDrawn = 0;
    var newRadius = props.radius;
    extremity.x = windowWidth/2;
    extremity.y = windowHeight/2;

    // push();

    while(circlesDrawn < props.iterations) {
        translate(extremity.x, extremity.y);
        newRadius = props.radius*2/(circlesDrawn);
        ellipse(0, 0, newRadius);
        extremity.x = cos(time*(circlesDrawn+1))*newRadius/2;
        extremity.y = sin(time*(circlesDrawn+1))*newRadius/2;
        if(props.bones)
            line(0, 0, extremity.x, extremity.y);
        circlesDrawn++;
    }    

    // pop();
    if(!props.pause) time += props.speed;
}

function keyPressed() {
    if (key === 'r') setup();
    if (key === 'p') props.pause = !props.pause;
    if (key === 'b') props.bones = !props.bones;
}