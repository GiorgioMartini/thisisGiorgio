var paints = [],
    grid = [[],[]];



function Paint(x,y) {
  this.x = x;
  this.y = y;

  this.moveRandomly = function() {
    this.x += random(-0.3,0.3);
    this.y += random(-0.3,0.3);
  };

	this.show = function () {
    noStroke();

    fill('#4FEFB4')
    var randomAlpha = random(1),
        randomDiameter = random(1,10);
        //rbga = 'rgba(79, 239, 180, ' + randomAlpha.toString() + ')';

  	ellipse(this.x,this.y,randomDiameter,randomDiameter);
	};


}

function setup() {

  frameRate(1);

  var width = window.innerWidth ,
      height = window.innerHeight - document.getElementsByClassName('mob-menu')[0].offsetHeight,
      cols = 20,
      rows = 20,
      stepX = width/cols,
      stepY = height/rows,
      canvas = createCanvas(width, height);

      canvas.parent('site-content');

  for(var i = 1 ; i < cols; i++){
    for (var j = 1; j < rows; j++) {
      paints.push(new Paint(  stepX * i , stepY * j ) );
    }
  }

}





function draw() {

  background('#071619');
  for (var i = 0; i < paints.length; i++) {
    paints[i].show();
  }

}
