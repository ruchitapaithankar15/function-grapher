
function Grapher() {


  this.load = () => {
   
    drawGraph();
   
    $( "input" )
    .keyup(_=> {
    
    drawGraph();
    plotGraph();


  });


  //to display the coordinates on the graph with mouse movement
  $("canvas").mousemove(function(event){
    drawGraph();
    plotGraph();
    var canvas = document.getElementById("grid");
    var ctx = canvas.getContext('2d');

    //if the value is not entered, it assumed to be zero
    var a = $("#a").val();
    if (isNaN(a)) {
      a = 0;
    }
    var b = $("#b").val();
    if (isNaN(b)) {
      b = 0;
    }
    var c = $("#c").val();
    if (isNaN(c)) {
      c = 0;
    }
    var d = $("#d").val();
    if (isNaN(d)) {
      d = 0;
  
    }
  
    var w = 700;
    var h = 420;
    var mouseX = (event.offsetX - w/2)/35;
    var mouseY =(a * Math.pow(mouseX,3) + b * Math.pow(mouseX,2) + c * mouseX + d*1);
 
    ctx.fillStyle="green"; 
    ctx.fillRect(event.offsetX, ycoordinate(mouseY,h), 50, 30);
    ctx.fillStyle = "white";
    ctx.fillText(mouseX.toFixed(2)+", "+mouseY.toFixed(2),event.offsetX+2,ycoordinate(mouseY,h)+20);

  });

}

//plots the graph on the grid according to the expression
function plotGraph(){
  
  var canvas = document.getElementById("grid");
  var ctx = canvas.getContext('2d');
  var w = 700;
  var h = 420;

  //if the value is not entered, it assumed to be zero
  //when there is no value enter the line drawn is y=0
  var a = $("#a").val();
  if (isNaN(a)) {
    a = 0;
  }
  var b = $("#b").val();
  if (isNaN(b)) {
    b = 0;
  }
  var c = $("#c").val();
  if (isNaN(c)) {
    c = 0;
  }
  var d = $("#d").val();
  if (isNaN(d)) {
    d = 0;

  }

  
  with(ctx) {
    beginPath();
    moveTo(0, scale);
    strokeStyle = 'blue';
    lineWidth = 1;
    for (var x = -10;  x <=10; x = x+0.1) {  
      var y = valueY(x,a,b,c,d); 
      var y1 = ycoordinate(y,h);
      var x1 = xcoodinate(x,w)  
      lineTo(x1,y1);
      
    }
    stroke();         
}

}

//calculating value of y in a polynomial expression
function valueY(x,a,b,c,d){
  var y=(a * Math.pow(x,3) + b * Math.pow(x,2) + c * x + d*1);
  return y

}

//converting pixel value of x to the coordinate value to plot
function xcoodinate(pixelx,w){
  return w/2+pixelx*35;
}

//converting pixel value of y to the coordinate value to plot
function ycoordinate(pixely,h){
  return h/2-pixely*35;
  
}


//draws the grid for the graph
function drawGraph(){

  var canvas = document.getElementById("grid");
  var ctx = canvas.getContext('2d');
  canvas.width = 750;
  canvas.height = 470;

  var w = 700;
  var h = 420;
  with(ctx) {
    for(var i = 6;i>=-6; i--) {

      beginPath();

      moveTo(0,h/2-i*35);
      lineTo(w,h/2-i*35);
      strokeStyle="#DCDCDC";
      if(i===0) {
        lineWidth = 2;
        strokeStyle = "black";

      }
      font = "gray 12px Helvetica";
      fillText(i,w/2,h/2-i*35);
      stroke();


    }
    
    for(var i =-10;i <=10; i++){

      beginPath();
      
      moveTo(w/2+i*35,0);
      lineTo(w/2+i*35,h);

      
      strokeStyle="#DCDCDC";

      if(!i) {
        lineWidth = 2;
        strokeStyle = "black";
      }
      font = "gray 12px Helvetica";
       fillText(i,w/2+i*35,h/2);
      stroke();
    

    }

    
  }
}
}
  
