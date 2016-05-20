var paint;

function Paint() {
  this.x = random(0, width);
  this.y = random(0, height);

  this.update = function() {
    this.x = random(0, width);
    this.y = random(0, height);
  };

	this.show = function () {
		ellipse(this.x,this.y,10,10);
	};



}

function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('site-content');
	paint = new Paint();
}

function draw() {
 background(0);

	paint.update();
	paint.show();
}
