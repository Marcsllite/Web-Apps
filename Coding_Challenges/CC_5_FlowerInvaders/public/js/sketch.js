var can,  // holds the watering can
    r,  // width and height of the canvas
    interval = 3000,  // delay (milliseconds) for the flowers growing
    state; // variable to hold the game's current state 
var drops = [];  // array to hold the water drops
var flowers = [];  // array to hold the flowers
var numFlowers = 25;  // maximum number of flowers in the array
var loadingFlower;  // holds the flower in the loading screen
var grow;  // interval function
var clicked = false;

function setup() {
  // selecting the smallest side length and using that to create a square canvass
  var smallestR = (displayWidth > displayHeight)? displayHeight : displayWidth;

  // making sure the smallest side length is no greater than 600 pixels
  // making sure the smallest side length is 90% of the display
  r = smallestR > 600? 600 : smallestR * .9;

  // making sure the smallest side length is no smaller than 200 pixels
  if(r < 200) {
    r = 200;
  }

  var canvasHolder = document.querySelector('.canvasHolder');
  createCanvas(r, r).parent(canvasHolder);  // creating square canvas

  // setting state to start state
  state = 0;
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
  background(51);

  if(loadingFlower === undefined) { 
    loadingFlower = new Flower(r/2, r/2, r/2);
  } 
  loadingFlower.drawFlower();

  push();
  fill(0, 203, 0);
  stroke(255);
  strokeWeight(3);
  textSize(70);
  text('Flower Invaders', r/16, r/8);
  pop();
  
  // blinking the click to start text
  if(frameCount % 60 < 30 && !clicked) {
    push();
    noStroke();
    fill(255);
    textSize(30);
    text('Click to start game!', r/3, height - r/16);
    pop();
  }
}

function setupPlaying() {
  var overlapping,  // true is flowers are overlapping o.w false
      loops = 0;  // keeps track of the number of times the while loop has run
  
  // looping until we've reached the max number of flowers
  while(flowers.length < numFlowers) {  
    overlapping = false;  // assuming flower is not overlapping
    
    // selecting sa random position and radius
    // scaling radius depending on the canvas size
    var randX = random(r/16, r - (r/16)), 
        randY = random(r - (r/3), r - (r/16)),
        randR = map(random(20, 31),20, 31, r/30, (3*r)/60);

    // making sure that the position and size we selected
    // does not lead to any overlap with the previously created flowers
    flowers.forEach(other => {
      var d = dist(randX, randY, other.x, other.y);
      if(d < randR + other.r) {
        overlapping = true;
      }
    });

    // if the position and size did not cause an overlap
    // add the flower to the end of the array
    // and reset the number of times the loop
    // has run without adding a new flower
    if(!overlapping) {
      flowers[flowers.length] = new Flower(randX, randY, randR);
      loops = 0;
    }

    // updating the number of times the while loop has run
    // without adding a flower
    loops++;
    // breaking out of the loop if it is stuck
    // i.e: looped over 1000 times before adding a new flower
    if(loops >= 1000) {
      break;
    }
  }
  
  // growing the flowers every three seconds
  grow = setInterval(() => {
    flowers.forEach(flower => {
      flower.grow();
    });
  }, interval);

  state = 1;
}

function playing() {
  background(51);

  // stopping everything if the user
  // removed all the flowers
  if(flowers.length === 0) {
    noLoop();
  }

  // drawing the flowers
  // and making them bobble
  flowers.forEach(flower => {
    flower.move();
    flower.show();
    if(flower.top) {
      noLoop();
    }
  });

  for(var i = drops.length - 1; i >= 0; i--) {
    // Showing and moving the drops
    drops[i].move();
    drops[i].show();

    // checking if the drop hits the flower
    // and making the flower wither and
    // noting that drop needs to be removed from the array
    flowers.forEach(flower => {
      if(flower.hit(drops[i])) {
        flower.wither();
        drops[i].evaporate();
      }
    });

    // removing drop if it needs to be removed
    if(drops[i].toDelete) {
      drops.splice(i, 1);
      break;
    }

     // removing the flower if it has no more petals
    for(var j = flowers.length - 1; j >= 0; j--) {
      if(flowers[j].dead) {
        flowers.splice(j, 1);
        break;
      }
    }
  }
}

function end() {

}

function win() {

}

function mousePressed() {
  switch (state) {
    case 0:
      clicked = true;
      animation = setInterval(() => {
        if(loadingFlower.dead) {
          setupPlaying();
          // stopping withering animation
          clearInterval(animation);
        } else {
          loadingFlower.wither();
        }
      }, 250);
      break;
    case 1:
      var drop = new Drop(width/2, 0, (4*r)/300);
      drop.setDestination(mouseX, mouseY);
      drops.push(drop);
      break;
  }
}

function keyPressed() {
  switch (state) {
    case 0:
      
      break;
    case 1:
      if(key == ' ') {
        var drop = new Drop(width/2, 0, (4*r)/300);
        drop.setDestination(undefined, height);
        drops.push(drop);
      }
  }
}
