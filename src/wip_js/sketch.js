function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('site-content');
	var myPaint = new Paint();
}

function draw() {
	Paint.show;
	Paint.update;
}

var Paint = function () {

  this.update = function () {
  	this.x = random(1, -1);
  	this.y = random(1, -1);
  };

  this.show = function () {
  	fill(255);
  	ellipse(this.x, this.y, 20, 20);

    };

};
