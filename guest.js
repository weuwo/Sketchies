
let graphics = [];
let div = [];
let artist = [];
var keys;
var drawings;

function setup() {
    var config = {
    apiKey: "AIzaSyBPpbGyVzf46RIcnrXSVIK8iG8CG0BvyOc",
    authDomain: "my-sketchbook.firebaseapp.com",
    databaseURL: "https://my-sketchbook-default-rtdb.firebaseio.com/",
    projectId: "my-sketchbook",
    storageBucket: "my-sketchbook.appspot.com",
    messagingSenderId: "259574732736",
    appId: "1:259574732736:web:e5e92fc832377a5fd81a25"
  }
    
     firebase.initializeApp(config); 
  database = firebase.database();
  
  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);

}



function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function drawAll() {
  

    for (var i = 0; i < keys.length; i++){
    key = keys[i];
    showDrawing(key, graphics[i], div[i]);
      
    }
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: nameInput.value(),
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}


function gotData(data) {
  
  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  drawings = data.val();
  keys = Object.keys(drawings);
  
  for (var i = 0; i < keys.length; i++){

    var key = keys[i];
    var names = drawings[key].name;

    graphics[i] = createGraphics(600, 400);
    graphics[i].show();
    graphics[i].style('transform','scale(70%, 70%)');
    graphics[i].style('align', 'center');
    graphics[i].parent('galleryContainer');
    artist[i] = createP(names);
    artist[i].style('padding', '60px');
    artist[i].style('text-align', 'center');
    artist[i].parent('galleryContainer');

  }
  
  drawAll();
}

function errData(err) {
  console.log(err);
}

function showDrawing(key, g, d){
  
  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    console.log(drawing);
    
        g.background('white');
      g.push();
  g.stroke('black');
  g.strokeWeight(1.5);
  g.noFill();
    g.scale(0.6);
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
      g.beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
      g.endShape();
  }
  g.pop();
  }

}

function clearDrawing() {
  drawing = [];
}
