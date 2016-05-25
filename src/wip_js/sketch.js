var paints = [];

function Paint(x,y) {
  this.x = x;
  this.y = y;

  this.update = function() {
    this.x += random(-1,1);
    this.y += random(-1,1);
  };

	this.show = function () {
		ellipse(this.x,this.y,10,10);
	};


}

function setup() {
  var width = window.innerWidth,
      height= window.innerHeight,
      cols = 10,
      rows = 10;
      gridX = 0;
      gridY = 0;

	var canvas = createCanvas(width, height);
  canvas.parent('site-content');

  //draw grid
  for(var i = 0; i < cols; i++)
    for (var j = 0; j < rows; j++) {
      gridX+= width/cols;
      gridY+= height/rows;
      paints.push(new Paint(gridX , gridY ) );
    }
  }




function draw() {

  background(0);
  for (var i = 0; i < paints.length; i++) {
    paints[i].update();
    paints[i].show();
  }

}
