var cells = [];
var startingClicks;
var previousClicks;
var currentClicks;


function setup() {
  createCanvas(500, 500);
  startingClicks = 10;
  previousClicks = startingClicks;
  currentClicks = startingClicks;
  cells.push(new Cell(undefined, 240, color(random(100, 255), random(100, 255), 0, 150)));
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