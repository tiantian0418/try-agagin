var VTX = VTX468;

let cells = [];


let c1=255;
let c2=0;
let c3=0;


var facemeshModel = null; 
var videoDataLoaded = false; 
var statusText = "Loading facemesh model...";
var myFaces = []; 
var capture; 


facemesh.load().then(function(_model){
  console.log("model initialized.")
  statusText = "Model loaded."
  facemeshModel = _model;
})


function setup() {
  createCanvas(640,480);

  capture = createCapture(VIDEO);
  capture.size(640,480)

  capture.elt.onloadeddata = function(){
    console.log("video initialized");
 
    videoDataLoaded = true;
  }


}


function drawFaces(faces,filled){

  for (var i = 0; i < faces.length; i++){

    const keypoints = faces[i].scaledMesh;

    const [x, y, z]=keypoints[floor(200)]
    circle(x,y,10);
    noStroke();
    fill(255, 0, 0);
    ellipse(x/2 - 20, y - 120, 40, 40);
    ellipse(x/2 + 20, y - 120, 40, 40);
    ellipse(x/2,y - 140, 40, 40);
    ellipse(x/2, y - 80, 40, 40);
    
    // Draw center
    fill(255, 255, 0);
    ellipse(x/2, y - 120, 20, 20);
    mouseX=x;
    mouseY=y;
    
    if(x<width/3){
      c1=random(255)
      c2=random(255)
      c3=random(255)
      
    }

  }
}

function packFace(face,set){
  var ret = {
    scaledMesh:[],
  }
  for (var i = 0; i < set.length; i++){
    var j = set[i];
    ret.scaledMesh[i] = [
      face.scaledMesh[j][0],
      face.scaledMesh[j][1],
      face.scaledMesh[j][2],
    ]
  }
  return ret;
}

function draw() {

  strokeJoin(ROUND); 
  

  if (facemeshModel && videoDataLoaded){ 
    
    facemeshModel.estimateFaces(capture.elt).then(function(_faces){

      
      myFaces = _faces.map(x=>packFace(x,VTX)); 

      
    })
  }
  
  background(0);
  
  // Display the video capture in the canvas.Draw my face skeleton
  push();
  image(capture, 0, 0, capture.width, capture.height);
  noFill();
  stroke(255,0,0);
  drawFaces(myFaces); 
  pop();
  
}

