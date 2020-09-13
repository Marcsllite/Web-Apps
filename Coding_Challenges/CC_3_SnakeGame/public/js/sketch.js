var s, f;  // variable to hold the snake and food
var state; // variable to hold the game's current state
var img;  // variable to hold the end of game image
var hammer; // variable to hold the hammer.js object

function setup() {
  // selecting the smallest side length and using that to create a square canvass
  var smallestR = (displayWidth > displayHeight)? displayHeight : displayWidth;

  // making sure the smallest side length is no greater than 600 pixels
  // making sure the smallest side length is 90% of the display
  var r = smallestR > 600? 600 : smallestR * .9;

  // making sure the smallest side length is no smaller than 200 pixels
  if(r < 200) {
    r = 200;
  }

  var canvasHolder = document.querySelector('.canvasHolder');
  createCanvas(r, r).parent(canvasHolder);  // creating square canvas
  frameRate(10);  // lowering framerate for aesthetics
  
  s = new Snake();  // initializing a white snake at a random location
  // initializing a red block at a random location
  f = new Block(undefined, undefined, undefined, color(255, 0, 0));

  state = 0;  // initializing the game state to the start screen

  // initializing the end of game image
  if(r >= 200 && r < 250) {
    img = loadImage('img/end_200.png');
  } else if(r >= 250 && r < 300) {
    img = loadImage('img/end_200.png');
  } else if(r >= 300 && r < 350) {
    img = loadImage('img/end_300.png');
  } else if(r >= 350 && r < 400) {
    img = loadImage('img/end_300.png');
  } else if(r >= 400 && r < 450) {
    img = loadImage('img/end_400.png');
  } else if(r >= 450 && r < 500) {
    img = loadImage('img/end_400.png');
  } else if(r >= 500 && r < 550) {
    img = loadImage('img/end_500.png');
  } else if(r >= 550 && r < 600) {
    img = loadImage('img/end_500.png');
  } else {
    img = loadImage('img/end_600.png');
  }

  // creating hammer.js options
  var options = {
    preventDefault: true
  };
  // creating hammer object that checks the entire document
  hammer = new Hammer(document, options);
  
  // allowing the user to swipe in any direction
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);  // calling swiped function on swipe action
}

function draw() {
  // drawing the current game state
  switch (state) {
    case 0:
      start();
      break;
    case 1:
      playing();
      break;
    case 2:
      end();
      break;
    case 3:
      win();
      break;
  }
}

function start() {
  background(100);
  var button = new Button(undefined, undefined, 100, color(255, 0, 0));
  button.show();
  button.addText('PUSH TO START');
  if(button.pressed()) {
    state = 1;
  }
}

function playing() {
  background(51);
  f.show();

  if(s.death()) {
    state = 2;
  }
  s.update();
  s.show();
  if(s.eat(f)) {
    f.pickLocation();
    while(s.isColliding(f.x, f.y)) {
      f.pickLocation();
    }
  }
}

function end() {
  background(img);
  if(mouseIsPressed){
    state = 1;
  }
}

function win() {
  s.dir(0, 0);
  background(51);
  f.show();
}

function mousePressed() {
  if(state === 3) {
    state = 1;
  }
}

function keyPressed() {
  if(state == 1) {
    if(keyCode === UP_ARROW) {
      s.dir(0, -1);
    } else if(keyCode === DOWN_ARROW) {
      s.dir(0, 1);
    } else if(keyCode === LEFT_ARROW) {
      s.dir(-1, 0);
    } else if(keyCode === RIGHT_ARROW) {
      s.dir(1, 0);
    }
  }
}

function swiped(event) {
  if (event.direction == 8) {  // UP
    s.dir(0, -1);
  } else if (event.direction == 16) {  // DOWN
    s.dir(0, 1);
  }  else if (event.direction == 2) {  // LEFT
    s.dir(-1, 0);
  } else if (event.direction == 4) {  // RIGHT
    s.dir(1, 0);
  }
}
