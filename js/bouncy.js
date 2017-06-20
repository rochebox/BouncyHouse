//java script file for making dots

//alert("Hi from the script");

//Here are some things we need
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var dotSize = 10;

var xCoordList = new Array();
var yCoordList = new Array();


function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}


function addClick(x, y, dragging){
	//alert("hello from addClick dragging is " + dragging);
  xCoordList.push(x);
  yCoordList.push(y);
}


function redraw(){

	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    
    //context.fillRect(0, 0, 850, 500);
    //context.fillStyle = "#ffe6b3"; //playful orange
    //context.fill();


  	  for(var i=0; i < xCoordList.length; i++) {

  	    //context.fillStyle = "red";
  		//context.fillRect(10, 10, dotSize, dotSize);

  		//ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  		context.beginPath();
	  		context.ellipse(xCoordList[i], yCoordList[i] , dotSize, dotSize, 0, 0, Math.PI*2);
	  		context.fillStyle = "red";
			context.fill();	
		context.closePath();
	  	   
	  	
    }

}


//Handle the mouseEvents
canvas.addEventListener('mousedown', function(evt) {
 

        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse Down position: ' + mousePos.x + ',' + mousePos.y 
         ;
       
        addClick(mousePos.x, mousePos.y);
        redraw();
        console.log(message);
        //alert(message);
 }, false);