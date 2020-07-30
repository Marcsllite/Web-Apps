
var hammer; // variable to hold the hammer.js object
var cells = [];
var startingClicks;
var previousClicks;
var currentClicks;


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

  startingClicks = 10;
  previousClicks = startingClicks;
  currentClicks = startingClicks;
  var radius = 1.25 * (smallestR / 4);
  cells.push(new Cell(undefined, radius, color(random(100, 255), random(100, 255), 0, 150)));
}

function draw() {
  background(255);
  showLives();

  cells.forEach(cell => {
    cell.move();
    cell.show();
    cell.grow();
  });

  if(currentClicks <= 0) {
    reset()
  }
}

function showLives() { 
  var txt = "Lives: " + currentClicks;
  textSize(20);
  if(currentClicks === previousClicks) {
    fill(51, 51, 51, 150);
  } else if(currentClicks > previousClicks) {
    fill(32,178,170);
  } else if(currentClicks < previousClicks) {
    fill(240,128,128);
  }
  text(txt, width - 90, height - 20);
}

function reset() {
  cells = [];
  startingClicks = 10;
  currentClicks = startingClicks;
  cells.push(new Cell(undefined, 240, color(random(100, 255), random(100, 255), 0, 150)));
}

function mousePressed() {
  previousClicks = currentClicks;
  var count = 0;
  for(var i = cells.length - 1; i >= 0; i--) {
    if(cells[i].clicked(mouseX, mouseY)) {
      count++;
      currentClicks++;
      cells = cells.concat(cells[i].divide());
      cells.splice(i, 1);
      break;
    }
  };

  if(count === 0) {
    currentClicks--;
  }
}

function swiped(event) {
  if (event.direction == 8) {  // UP
  } else if (event.direction == 16) {  // DOWN
  }  else if (event.direction == 2) {  // LEFT
  } else if (event.direction == 4) {  // RIGHT
  }
}