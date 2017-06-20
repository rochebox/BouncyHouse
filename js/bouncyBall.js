// This is a javascript file

//alert("Hi this is the Javascript file");
var howManyDots = prompt( "How many dots would you like?", 10);

//get some access to the canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//set up some data holders for the dots...
var dotSize = 10;
var dotsAdded = 0;

var xCoordList = new Array();
var yCoordList = new Array();
var dotColorList = new Array();
var dotDXList = new Array();
var dotDYList = new Array();


var listOfColors = ["Aqua", "BlueViolet",
"Brown", "CadetBlue", "CornflowerBlue", 
"Crimson", "Cyan", "DarkBlue", "DarkCyan", 
"DarkGreen", "DarkOrange", "DarkSlateBlue", 
"DeepPink", "Gold", "GoldenRod", "GreenYellow", 
"Indigo", "LightCoral", "LightGreen", "MediumPurple"
];


//var listOfColors = ["#550000", "#005500"];

var totalColors = listOfColors.length;
//alert("totalColors is " + totalColors);



var stopAnimation = true;
var rect = canvas.getBoundingClientRect();
var canvasWidth = rect.right - rect.left;
var canvasHeight = rect.bottom - rect.top;
alert( "At top program canvasWidth is " + canvasWidth +
  " and canvasHeight is " + canvasHeight );

function toggleButton(){
  if(stopAnimation === true){
    stopAnimation = false;
    moveEveryone();
  } else {
    stopAnimation = true;

  }
}


function moveEveryone() {
    //var elem = document.getElementById("animate"); 
    //var pos = 0;
    //alert("Hi from the top of moveEveryone");



    var id = setInterval(frame, 7);
    function frame() {
       console.log("hi from top of frame() stopAnimation is " + stopAnimation);
        if (stopAnimation) {
            clearInterval(id);
        } else {
            //move Everyone by their DX and DY..
             console.log("In the frame drawing loop")
             for(var i=0; i < xCoordList.length; i++) {
                var theDX = dotDXList[i];
                var theDY = dotDYList[i];
                xCoordList[i] += theDX;
                yCoordList[i] += theDY;
                var newX = xCoordList[i];
                var newY = yCoordList[i];

                // check x and y at the edges
                if(theDX > 0 && newX >= canvasWidth){
                  xCoordList[i] = canvasWidth - 5;
                  dotDXList[i] *= -1;
                } else {
                  if(theDX < 0 && newX <= 0){
                  xCoordList[i] = 5;
                  dotDXList[i] *= -1;
                  } 

                }


                if(theDY > 0 && newY >= canvasHeight){
                  yCoordList[i] = canvasHeight - 5;
                  dotDYList[i] *= -1;
                } else {
                  if(theDY < 0 && newY <= 0){
                  yCoordList[i] = 5;
                  dotDYList[i] *= -1;
                  } 

                }


             }
             redraw();
            
        }
      
    }
}

//1 FUNCTION getMousePosition... (you know what this does--x,y coords)

  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

//2 FUNCTION addClick (adds x,y click coords to arrays)

function addClick(x, y){
	//alert("hello from addClick dragging is " + dragging);
  	xCoordList.push(x);
  	yCoordList.push(y);
    //and create a random color
    var randomColor = Math.floor(Math.random() * totalColors);
   // alert("random color created is " + randomColor);
    dotColorList.push(randomColor);

    //Add random DX and DY
    var randDX = Math.floor(Math.random() * 8) - 4;
    var randDY = Math.floor(Math.random() * 8) - 4;
    if(randDX === 0) randDX = 1;
    if(randDY === 0) randDY = 1;
    dotDXList.push(randDX);
    dotDYList.push(randDY);

}

//3 FUNCTION redraw  (redraws the window after each click)

function redraw(){

  console.log("Hi from the top of redraw");

	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas


  	  for(var i=0; i < xCoordList.length; i++) {

  		context.beginPath();
	  		context.ellipse(xCoordList[i], yCoordList[i] , dotSize, dotSize, 0, 0, Math.PI*2);
	  		//context.fillStyle = "red";
        var whatColorNumber = dotColorList[i]
        var myColor = listOfColors[whatColorNumber];
        //alert("The color is " + myColor);
        context.fillStyle = myColor;
			context.fill();	
		context.closePath();
	  	   
	  	
    }

}



//4 FUNCTION addEventListener (allows us to catch mouseclicks)

canvas.addEventListener('mousedown', function(event) {
 
        var mousePos = getMousePos(canvas, event);
        var message = 'Mouse Down position: ' + mousePos.x + ',' + mousePos.y 
         ;
       
       if(dotsAdded < howManyDots){
        addClick(mousePos.x, mousePos.y);
        dotsAdded++;
      }
        redraw();
        console.log(message);
        //alert(message);
 }, false);


