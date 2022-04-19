let book;
let pg;
let pencil;
let eraser;
let penState = 0;
let Pstroke;
let fillSave, fillClear;
let ratio;

var myCanvas;
var sketchWidth;
var drawing = [];
var currentPath = [];
var isDrawing = false;
var nameInput;

function preload() {
  book = loadImage(
    "https://cdn.glitch.global/96f5371a-14aa-4c4a-af62-fd32a6f051e5/book-01.png?v=1643608646415"
  );
}

function setup() {
  sketchWidth = document.getElementById("tool").offsetWidth * 0.9;
  myCanvas = createCanvas(sketchWidth, sketchWidth * 0.7);
  //myCanvas = createCanvas(windowWidth, windowWidth * 0.7);

  myCanvas.mousePressed(startPath);
  myCanvas.parent("tool");
  myCanvas.mouseReleased(endPath);

  var saveButton = select("#saveButton");
  saveButton.mousePressed(saveDrawing);

  var clearButton = select("#clearButton");
  clearButton.mousePressed(clearDrawing);

  nameInput = select("#nameInput");

  pencil = loadImage(
    "https://cdn.glitch.global/2dd1e120-c301-42e0-a3f2-e064382ae1e9/pencil.png?v=1646523865390"
  );
  Pstroke = 1;
  fillClear = "#ffffff";
  fillSave = "#ffffff";
  let ratio = windowWidth * 0.07;

  var config = {
    apiKey: "AIzaSyBPpbGyVzf46RIcnrXSVIK8iG8CG0BvyOc",
    authDomain: "my-sketchbook.firebaseapp.com",
    databaseURL: "https://my-sketchbook-default-rtdb.firebaseio.com/",
    projectId: "my-sketchbook",
    storageBucket: "my-sketchbook.appspot.com",
    messagingSenderId: "259574732736",
    appId: "1:259574732736:web:e5e92fc832377a5fd81a25",
  };

  firebase.initializeApp(config);
  database = firebase.database();

  // var params = getURLParams();
  // console.log(params);
  // if (params.id){
  //   console.log(params.id);
  //   showDrawing(params.id);
  // }

  var ref = database.ref("drawings");
  ref.on("value", gotData, errData);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(224, 228, 255);
  image(book, width * 0.04, height * 0.06);
  book.resize((width * 1100) / 1200, 0);

  // image(pg, 0, 0);

  // if (mouseIsPressed) {
  //   if (penState == 0) {
  //     pg.line(mouseX, mouseY, pmouseX, pmouseY);
  //   }
  // }

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }

  //drawing line
  push();
  stroke(0);
  strokeWeight(1.5);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
  pop();
}

function saveDrawing() {
  var ref = database.ref("drawings");
  var data = {
    name: nameInput.value(),
    drawing: drawing,
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}

function windowResized() {
  // resizeCanvas(sketchWidth, sketchWidth * 0.7);
  resizeCanvas(windowWidth * 0.8, windowWidth * 0.5);
}

function gotData(data) {
  // clear the listing
  var elts = selectAll(".listing");
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var names = drawings[key].name;

    var li = createElement('li', names + " ");
    li.class("listing");
    var ahref = createElement("span", key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent("drawinglist");
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {
  var key = this.html();

  var ref = database.ref("drawings/" + key);
  ref.once("value", oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}
