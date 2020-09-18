// Variables
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 660;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 500);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
}

// Set up
var gamespeed = 1000;
var step = 30;

// Collision flag;
var collision_flag = false;

// Field borders' coordinates
var r_wall_border = 630;
var l_wall_border = 30;
var u_wall_border = 30;
var d_wall_border = 570;

function startGame() {
  myGameArea.start();

  // Player
  myGamePiece = new component(30, 30, "gold", 30, 30);
  
  // Walls
  // Right wall
  myObstacle1 = new component(30, 600, "green", 630, 0);
  // Downside wall
  myObstacle2 = new component(800, 30, "green", 0, 570);
  // Left wall
  myObstacle3 = new component(30, 600, "green", 0, 0);
  // Upside wall
  myObstacle4 = new component(800, 30, "green", 0, 0);
}

// TODO: Create Walls 

// Create component
function component(width, height, color, x, y) {
    // Size of snake head
    this.width = width;
    this.height = height;

    // Speed of snake
    this.speedX = 0;
    this.speedY = 0;
    
    // Init coordinates
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // TODO: Game ending
        if (collision_flag == true){
          alert("GAME OVER");
        }
    }
    this.interval = setInterval(this.newPos, gamespeed)
  }

// Update Game
  function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    myObstacle1.update();
    myObstacle2.update();
    myObstacle3.update();
    myObstacle4.update();
  }

// Controls
function moveup() {
    if (myGamePiece.speedY == 0){
      reset();
      myGamePiece.speedY -= step;
    }
    if (myGamePiece.y < u_wall_border){
      collision_flag = true;
    }
  }

  
  function movedown() {
    if (myGamePiece.speedY == 0){
      reset();
      myGamePiece.speedY += step;
    }
    if (myGamePiece.y > d_wall_border){
      collision_flag = true;
    }
  }
  
  function moveleft() {
    if (myGamePiece.speedX == 0){
      reset();
      myGamePiece.speedX -= step;
    }
    if (myGamePiece.x < l_wall_border){
      collision_flag = true;
    }
  }
  
  function moveright() {
    if(myGamePiece.speedX == 0){
      reset();
      myGamePiece.speedX += step;
    }
    if (myGamePiece.x > r_wall_border){
      collision_flag = true;
    }
  }

  function reset(){
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
  }
