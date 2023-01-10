// Time Attack Meteors
// Programmer: Emily Wong
// Academy/Cohort: Bay Valley Tech Cohort 229
// Inspired by Khan Academy's Advanced JS: Games and Visualizations, p5's resources, and the Blaster's arcade game
// Version 2 created on 03JAN23 at 1834

// Set the width and height for some of the parameters

let width = 800;
let height = width;
let meteorWidth = width/10;
let meteorHeight = height * (1 / 16);

// Create the entity that'll achieve the player's goal: interacting with meteors

let meteorArray = [];
let fireMeteorArray = [];
let iceMeteorArray = [];

// Creates the visual for the background

let earth;
let blaster;
let timer;
let cursor;

// Setting up the program

function setup() {

  // Creates the UI for the game
  createCanvas(width, height);
  earth = new Earth();
  blaster = new Blaster();
  cursor = new Cursor(width/2, height - height * (15 / 16));
  timer = new Timer();

  // Makes an array of regular meteors at random points on the canvas
  for (let i = 0; i < 400; i++) {
    meteorArray.push(new Meteor(random(meteorWidth/2, width - meteorWidth/2), i * height/8 - height * (395 / 8)))
  }

  // Makes an array of fire meteors at random points on the canvas
  for (let i = 0; i < 400; i++) {
    fireMeteorArray.push(new FireMeteor(i * meteorWidth * 2 + width, random(meteorHeight, height - meteorHeight/2 - height * (9 / 40))))
  }

  // Makes an array of ice meteors at random points on the canvas
  for (let i = 0; i < 400; i++) {
    iceMeteorArray.push(new IceMeteor(i * meteorWidth * 2 - width * 50, random(meteorHeight, height - meteorHeight/2 - height * (9 / 40))))
  }
}

// Draw the code

function draw() {

  background(0);
  noStroke();

  if (floor(frameCount/90) <= 40) {
    // Spawns the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteorArray.length; i++) {
      meteorArray[i].show();
      cursor.checkForMeteorCollision(meteorArray[i]);
      meteorArray[i].y += height/800;
    }

  } else if (floor(frameCount/90) <= 80) {
    
    // Spawns the fire meteors, checks for collision, then moves the meteors left
    for (let i = 0; i < fireMeteorArray.length; i++) {
      fireMeteorArray[i].show();
      cursor.checkForFireMeteorCollision(fireMeteorArray[i]);
      fireMeteorArray[i].x -= width/400;
    }

    // Speeds up the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteorArray.length; i++) {
      meteorArray[i].show();
      cursor.checkForMeteorCollision(meteorArray[i]);
      meteorArray[i].y += height/400;
    }

  } else if (floor(frameCount/90) <= 120) {

    // Speeds the fire meteors, checks for collision, then moves the meteors left
    for (let i = 0; i < fireMeteorArray.length; i++) {
      fireMeteorArray[i].show();
      cursor.checkForFireMeteorCollision(fireMeteorArray[i]);
      fireMeteorArray[i].x -= width * (3 / 800);
    }

    // Speeds up the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteorArray.length; i++) {
      meteorArray[i].show();
      cursor.checkForMeteorCollision(meteorArray[i]);
      meteorArray[i].y += height * (3 / 800);
    }

    // Spawns the ice meteors, checks for collision, then moves the meteors right
    for (let i = 0; i < iceMeteorArray.length; i++) {
      iceMeteorArray[i].show();
      cursor.checkForIceMeteorCollision(iceMeteorArray[i]);
      iceMeteorArray[i].x += width * (3 / 800);
    }
   
  }

  earth.show();
  blaster.show();
  cursor.pointer();
  cursor.show();
  timer.show();
}

// Creating the class Earth

class Earth{

  show(){

    // Creating the water
    fill(0, 0, 255);
    ellipse(width/2, height - height/10, width, height/4);
    rect(0, height - height/10, width, height/10);

    // Creating the land
    fill(0, 255, 0);
    ellipse(width/5, height - height * (7 / 80), width/4, height/10);
    ellipse(width - width * (7 / 20), height - height/10, width/2, height/8);
  }
}

// Creating the class Blaster

class Blaster{

  show(){

    // Creating the laser
    stroke(255, 0, 0);
    strokeWeight(width/800);
    line(width/2, height - height * (3 / 32), mouseX, mouseY);
    noStroke();
    strokeWeight(1);

    // Creating the blaster
    fill(0);
    arc(width/2, height - height * (7 / 80), width * (7 / 80), height * (7 / 80), PI, TWO_PI);
    fill(255);
  }
}

// Creating the class Timer

class Timer {

  show(){

    if (floor(frameCount/90) > 120) {
      // Runs this timer code if time is up
      fill(255);
      textSize(width * (7 / 160));
      text("Time's Up!", width/2 - width/8, height/2 - height * (9 / 160));
      text("Score: " + cursor.score, width/2 - width/8, height/2);

    } else if (floor(frameCount/90) >= 110) {
      // Runs this time code 10 seconds before time is up
      textSize(width * (3 / 80));
      
      fill(255, 0, 0);
      text("Time: " + String(120 - floor(frameCount/90)), width/40, height/20);
      
      fill(255);
      text("Score: " + cursor.score, width - width/4, height/20);

    } else {
      // Runs this time code if it's not 10 seconds before time is up
      fill(255);
      textSize(width * (3 / 80));
      text("Time: " + String(120 - floor(frameCount/90)), width/40, height/20);
      text("Score: " + cursor.score, width - width/4, height/20);
    }

  }
  
}

// Create the object that'll interact the user's input to the game: the cursor

let Cursor = function(x, y){
  this.x = x;
  this.y = y;
  this.score = 0;
}

// Gives the coordinates of the cursor

Cursor.prototype.pointer = function(){
  this.x = mouseX;
  this.y = mouseY;
}

// Draws the cursor

Cursor.prototype.show = function(){
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, width * (1 / 160), height * (1 / 160));
}

// Checks for collision on regular meteors

Cursor.prototype.checkForMeteorCollision = function(meteor) {
  if ((mouseIsPressed === true) && (meteor.x >= (this.x - meteorWidth/2) && meteor.x <= (this.x + meteorWidth/2)) && (meteor.y >= (this.y - meteorHeight/2) && meteor.y <= (this.y + meteorHeight/2)) && (this.y <= height - height * (9 / 40))) {
    meteor.y = height * 2;
    this.score += 10;
  }
}

// Checks for collision on fire meteors

Cursor.prototype.checkForFireMeteorCollision = function(fireMeteor) {
  if ((mouseIsPressed === true) && (fireMeteor.x >= (this.x - meteorWidth/2) && fireMeteor.x <= (this.x + meteorWidth/2)) && (fireMeteor.y >= (this.y - meteorHeight/2) && fireMeteor.y <= (this.y + meteorHeight/2)) && (this.y <= height - height * (9 / 40))) {
    fireMeteor.y = height * 2;
    this.score += 20;
  }
}

// Checks for collision on fire meteors

Cursor.prototype.checkForIceMeteorCollision = function(iceMeteor) {
  if ((mouseIsPressed === true) && (iceMeteor.x >= (this.x - meteorWidth/2) && iceMeteor.x <= (this.x + meteorWidth/2)) && (iceMeteor.y >= (this.y - meteorHeight/2) && iceMeteor.y <= (this.y + meteorHeight/2)) && (this.y <= height - height * (9 / 40))) {
    iceMeteor.y = height * 2;
    this.score += 30;
  }
}

// Makes the meteor object

let Meteor = function(x, y) {
  this.x = x;
  this.y = y;
}

Meteor.prototype.show = function() {

  // The whole meteor
  fill(139,69,19);
  ellipse(this.x, this.y, meteorWidth, meteorHeight);

  // The holes on the meteor
  fill(105, 105, 105);
  ellipse(this.x - meteorWidth/8, this.y - meteorHeight/5, meteorWidth * (3 / 16), meteorHeight/5);
  ellipse(this.x + meteorWidth/8, this.y - meteorHeight/10, meteorWidth/4, meteorHeight * (6 / 25));
  ellipse(this.x - meteorWidth/8, this.y + meteorHeight/5, meteorWidth * (3 / 20), meteorHeight * (3 / 10));
}

// Makes the fire meteor object

let FireMeteor = function(x, y) {
  this.x = x;
  this.y = y;
}

FireMeteor.prototype.show = function() {

  // Flames on the meteor
  fill(255, 215, 0);
  triangle(this.x - meteorWidth/4, this.y - meteorHeight * (3 / 10), this.x, this.y - meteorHeight * (11 / 10), this.x + meteorWidth/4, this.y - meteorHeight * (3 / 10));
  triangle(this.x - meteorWidth * (7 / 16), this.y - meteorHeight/5, this.x - meteorWidth * (3 / 8), this.y - meteorHeight, this.x + meteorWidth * (5 / 16), this.y - meteorHeight * (3 / 10));
  triangle(this.x, this.y - meteorHeight/2, this.x + meteorWidth * (5 / 16), this.y - meteorHeight, this.x + meteorWidth * (7 / 16), this.y - meteorHeight/10);

  // The whole meteor
  fill(255,165,0);
  ellipse(this.x, this.y, meteorWidth, meteorHeight);

  // The holes on the meteor
  fill(105, 105, 105);
  ellipse(this.x - meteorWidth/8, this.y - meteorHeight/5, meteorWidth * (3 / 16), meteorHeight/5);
  ellipse(this.x + meteorWidth * (3 / 16), this.y, meteorWidth/4, meteorHeight/2);
  ellipse(this.x - meteorWidth/8, this.y + meteorHeight/5, meteorWidth * (3 / 20), meteorHeight * (3 / 10));
}

// Makes the ice meteor object

let IceMeteor = function(x, y) {
  this.x = x;
  this.y = y;
}

IceMeteor.prototype.show = function() {

  // Ice on the meteor
  fill(224, 255, 255);
  triangle(this.x - meteorWidth/4, this.y - meteorHeight * (3 / 10), this.x, this.y - meteorHeight * (13 / 10), this.x + meteorWidth/4, this.y - meteorHeight * (3 / 15));
  triangle(this.x - meteorWidth/2, this.y, this.x - meteorWidth * (11 / 16), this.y - meteorHeight * (11 / 10), this.x + meteorWidth * (3 / 16), this.y);
  triangle(this.x + meteorWidth/8, this.y - meteorHeight/2, this.x + meteorWidth * (13 / 16), this.y - meteorHeight * (7 / 10), this.x + meteorWidth * (7 / 16), this.y + meteorHeight/5);
  triangle(this.x - meteorWidth * (7 / 16), this.y, this.x - meteorWidth * (13 / 16), this.y + meteorHeight/2, this.x, this.y + meteorHeight * (2 / 5));
  triangle(this.x - meteorWidth/16, this.y + meteorHeight * (2 / 5), this.x + meteorWidth * (13 / 16), this.y + meteorHeight * (7 / 10), this.x, this.y - meteorHeight * (2 / 5));

  // The whole meteor
  fill(185, 242, 255);
  ellipse(this.x, this.y, meteorWidth, meteorHeight);

  // The holes on the meteor
  fill(149, 206, 214);
  ellipse(this.x - meteorWidth/8, this.y - meteorHeight/5, meteorWidth * (3 / 16), meteorHeight/5);
  ellipse(this.x + meteorWidth * (3 / 16), this.y, meteorWidth/4, meteorHeight/2);
  ellipse(this.x - meteorWidth/8, this.y + meteorHeight/5, meteorWidth * (3 / 20), meteorHeight * (3 / 10));
}