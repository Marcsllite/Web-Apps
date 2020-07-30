var hammer; // variable to hold the hammer.js object
var ship;
var drops = [];
var flowers = [];
var flowerOnEdge;

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

  flowerOnEdge = false;
  ship = new Ship();

  drop = new Drop(width/2, height/2, 8, color(0, 0, 150))
  for(var i = 0; i < 6; i++) {
    flowers[i] = new Flower(i*80+80, 50, 30, color(150, 0, 0, 150));
  }
}

function draw() {
  background(51);
  ship.show();
  ship.move();

  for(var i = drops.length - 1; i >= 0; i--) {
    // checking if the drop hits the flower and growing the flower
    flowers.forEach(flower => {
      if(drops[i].hits(flower)) {
        flower.grow(drops[i].r);
        drops[i].evaporate();
      }
    });

    // removing drop if it needs to be removed
    if(drops[i].toDelete) {
      drops.splice(i, 1);
      break;
    }

    // showing and moving the drops
    drops[i].show();
    drops[i].move();
  }
  
  // drawing and moving the flower 
  flowers.forEach(flower => {
    flower.show();
    flower.move();
    if(flower.onEdge()) {
      flowerOnEdge = true;
    }
  });

  // moving shifting all the flowers down if one of them is on the edge
  if(flowerOnEdge){
    flowers.forEach(flower => {
      flower.shiftDown();
    });
    flowerOnEdge = false;
  }
}

function keyReleased(){
  if(keyCode === LEFT_ARROW) {
    ship.dir(0, undefined);
  } else if(keyCode === RIGHT_ARROW) {
    ship.dir(undefined, 0);
  }
}

function mousePressed() {
  var drop = new Drop(ship.x, height, 8);
  drops.push(drop);
}

function keyPressed() {
  if(key == ' ') {
    var drop = new Drop(ship.x, height, 8);
    drops.push(drop);
  }

  if(keyCode === LEFT_ARROW) {
    ship.dir(-5, 0);
  } else if(keyCode === RIGHT_ARROW) {
    ship.dir(5, 0);
  }
}

function swiped(event) {
  if (event.direction == 8) {  // UP
  } else if (event.direction == 16) {  // DOWN
  }  else if (event.direction == 2) {  // LEFT
  } else if (event.direction == 4) {  // RIGHT
  }
}