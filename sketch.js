// Oliver Bonham-Carter
// obonhamcarter@allegheny.edu
// date: 5 May 2020
// Inspired from code at: //ref: https://glitch.com/~ur-a-roman
// Original author: Kelly Lougheed


// A server is required to run this JS code. To establish a
// local server, use following Python3 command.
// python3 -m http.server
// Brower URL: http://127.0.0.1:8000/

// global variables
let video;
let poseNet = null;
let poses = [];
//let skeletons = [];

let leftEars = [];
let rightEars = [];
let leftShoulder = [];
let rightShoulder = [];

let left = null;
let personThing = null;
let right = null;


function preload(){

	personThing0 = loadImage("graphics/facStaf/planzine_i.png");
	personThing1 = loadImage("graphics/facStaf/aravind_i.png");
	personThing2 = loadImage("graphics/facStaf/dluman_i.png");
	personThing3 = loadImage("graphics/facStaf/dwagner_i.png");
	personThing4 = loadImage("graphics/facStaf/jjumadinova_i.png");
	personThing5 = loadImage("graphics/facStaf/gkapfham_i.png");
	personThing6 = loadImage("graphics/facStaf/obonhamcarter_i.png");

	glassesThing = loadImage("graphics/glasses_i.png")
}

function setup() {
	createCanvas(640, 480); //x and y magnitudes
  video = createCapture(VIDEO);

	//	video.size(width, height);
	video.size(640, 480); // hardcoded

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });

  // Hide the video element, only show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
	// filter(INVERT); // inverse the cols to be able to see the debug dots better
  drawKeypoints();
	drawPeople()
	drawGlasses();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if(keypoint.part == "leftEar"){
          leftEars = [keypoint.position.x, keypoint.position.y]
        }
        if(keypoint.part == "rightEar"){
          rightEars = [keypoint.position.x, keypoint.position.y]
        }
        if(keypoint.part == "leftShoulder"){
          leftShoulder = [keypoint.position.x, keypoint.position.y]
        }
        if(keypoint.part == "rightShoulder"){
          rightShoulder = [keypoint.position.x, keypoint.position.y]
        }
        // Debugging - see keypoints at red dots
        //fill(255, 0, 0);
        //noStroke();
        //ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}


function drawPeople(){
  if(leftEars != null && rightEars != null) {
    let personWidth = (leftEars[0] - rightEars[0]) * 2.0 // value is the size scaler
//		let personHeight = personWidth/4 // too wide
		let personHeight = personWidth *1.8
    //let offset = personHeight * 2.3

	let offsety  = 50   // move all faces up and down by same amount,
											 // big negative values are higher up,
											 // big positive values are lower down

	let offsetx = 0 // move all faces up and down by same amount

// note:
// image1  = image(imageName, x-pos, y-pos, imageWidth, imageHeight)

//left side
    let img0 = image(personThing0, rightEars[0] - 200 + offsetx, leftEars[1] - 300 + offsety, personWidth , personHeight *1.1);

		let img1 = image(personThing1, rightEars[0] - 350 + offsetx, leftEars[1] - 250 + offsety, personWidth , personHeight *1.1);

    let img2 = image(personThing2, rightEars[0] - 250 + offsetx, leftEars[1] - 150 + offsety, personWidth, personHeight);

    let img3 = image(personThing3, rightEars[0] - 350 + offsetx, leftEars[1] - 75 + offsety, personWidth * 1.1, personHeight * 1.1);


//right side
    let img4 = image(personThing4, rightEars[0] + 75 + offsetx, leftEars[1] - 250 + offsety, personWidth * 1.1, personHeight * 1.1);

    let img5 = image(personThing5, rightEars[0] + 175 + offsetx, leftEars[1] - 175 + offsety, personWidth, personHeight);

    let img6 = image(personThing6, rightEars[0] + 75 + offsetx, leftEars[1] - 75 + offsety, personWidth * 1.1, personHeight * 1.1);

 }
}

function drawGlasses(){
  if(leftEars != null && rightEars != null) {
    let glassesWidth = (leftEars[0] - rightEars[0]) * 1.2 // size of the glasses
    let glassesHeight = glassesWidth/4
    let offset = glassesHeight * 2.3
    let img = image(glassesThing, rightEars[0]-20, leftEars[1] - offset*.25, glassesWidth, glassesHeight);
    leftEars = null;
    rightEars = null;
 }
}
