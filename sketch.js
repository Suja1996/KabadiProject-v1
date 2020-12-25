var playerRed;
gameTurn = 0;
gameState="start"
redScore=0;
yellowScore=0;
function preload() {
  //loading images for all the players
  redPlayerLImg = loadImage("assests/player1b.png");
  redPlayerRImg = loadImage("assests/player1a.png");
  yelPlayerLImg = loadImage("assests/player2b.png");
  yelPlayerRImg = loadImage("assests/player2a.png");
}
function setup() {
  createCanvas(500, 500);


  //create playerRed
  playerRed = createSprite(250, 250, 10, 10);
  playerRed.addImage("move", redPlayerRImg);
  playerRed.scale = 0.5;

  //create player Yellow
  playerYel = createSprite(250, 250, 10, 10);
  playerYel.addImage("move2", yelPlayerLImg);
  playerYel.scale = -0.5;


  //setting collider
playerRed.debug=true;
playerYel.debug=true
playerRed.setCollider("rectangle",0,0,40,280)
playerYel.setCollider("rectangle",0,0,40,280)

  //getting the position of red player
  database = firebase.database();
  var hyPos = database.ref("playerRed/Position");
  hyPos.on("value", readPosition);

  var hyPosY = database.ref("playerYellow/Position");
  hyPosY.on("value", readPositionY);
  


//getting gameTurn


var turndb = database.ref("gameTurn");
turndb.on("value",readTurn);

var gameStatedb = database.ref("gameState");
gameStatedb.on("value",readState);


var scoreRed = database.ref("redScore");
scoreRed.on("value",readScoreRed);
var scoreYellow = database.ref("yellowScore");
scoreYellow.on("value",readScoreYellow);

database.ref('/').update({
  redScore: 0
});
database.ref('/').update({
  yellowScore: 0
});
 
database.ref('/').update({
  gameState: "start"
});
database.ref("playerRed/Position").set({
  x: (playerRed.x = 150),
  y: (playerRed.y = 250),
});
database.ref("playerYellow/Position").set({
  x: (playerYel.x = 350),
  y: (playerYel.y = 250),
});
}

function draw() {
  background("white");
console.log("gameState "+gameState);
console.log("gameTurn "+gameTurn);
  //starting position
  textSize(15);
  text("Press space to move to start position", 200, 50);
  stroke("red")
  text("Red: "+redScore, 50, 20);
  text("Yellow: "+yellowScore, 300, 20);
  if (keyDown("space")&& gameState=="start") {
   
if(gameTurn==0){
alert("RED TURN")

}else {
  alert("YELLOW TURN")
  
}

    
    database.ref("playerRed/Position").set({
      x: (playerRed.x = 150),
      y: (playerRed.y = 250),
    });
    database.ref("playerYellow/Position").set({
      x: (playerYel.x = 350),
      y: (playerYel.y = 250),
    });
    database.ref('/').update({
      gameState: "play"
    });
  }

  
  //change for player red to play
  if (gameTurn == 0 && gameState=="play") {
   // console.log("gameTurn")
    if (keyDown(LEFT_ARROW)) {
      playerRed.addImage("move", redPlayerLImg);
      changePosition(-5, 0);
    } else if (keyDown(RIGHT_ARROW)) {
      console.log("right pressed")
      playerRed.addImage("move", redPlayerRImg);
      changePosition(5, 0);
    } else if (keyDown(UP_ARROW)) {
      changePosition(0, -5);
      playerRed.addImage("move", redPlayerLImg);
    } else if (keyDown(DOWN_ARROW)) {
      changePosition(0, +5);
      playerRed.addImage("move", redPlayerRImg);
    } else if (keyDown("w")) {
      changePositionY(0, -5);
      playerYel.addImage("move", yelPlayerLImg);
    } else if (keyDown("s")) {
      changePositionY(0, +5);
      playerYel.addImage("move", yelPlayerRImg);
    }
if(playerRed.isTouching(playerYel)){
  database.ref("playerRed/Position").set({
    x: (playerRed.x = 150),
    y: (playerRed.y = 250),
  });
  database.ref("playerYellow/Position").set({
    x: (playerYel.x = 350),
    y: (playerYel.y = 250),
  });
  database.ref('/').update({
    redScore: (redScore = redScore-5)
  });
  database.ref('/').update({
    yellowScore: (yellowScore = yellowScore+ 5)
  });


  database.ref('/').update({
    gameTurn: 1
  });
  //changing game state to start
  database.ref('/').update({
    gameState: "start"
  });
}
    if (playerRed.x > 390) {
      //changing game turn to yellow
      database.ref('/').update({
        gameTurn: 1
      });
      //changing game state to start
      database.ref('/').update({
        gameState: "start"
      });
      //Updating scores
      database.ref('/').update({
        redScore: (redScore = redScore+ 5)
      });
      database.ref('/').update({
        yellowScore: (yellowScore = yellowScore- 5)
      });
      database.ref("playerRed/Position").set({
        x: (playerRed.x = 150),
        y: (playerRed.y = 250),
      });
      database.ref("playerYellow/Position").set({
        x: (playerYel.x = 350),
        y: (playerYel.y = 250),
      });
    }
  }

  //chance for player yellow to play
  if (gameTurn == 1&& gameState=="play") {
    if (keyDown("a")) {
      console.log("a pressed")
      playerYel.addImage("move", yelPlayerLImg);
      changePositionY(-5, 0);
    } else if (keyDown("d")) {
      playerYel.addImage("move", yelPlayerRImg);
      changePositionY(5, 0);
    } else if (keyDown("w")) {
      changePositionY(0, -5);
      playerYel.addImage("move", yelPlayerLImg);
    } else if (keyDown("s")) {
      changePositionY(0, +5);
      playerYel.addImage("move", yelPlayerRImg);
    } else if (keyDown(UP_ARROW)) {
      changePosition(0, -5);
      playerRed.addImage("move", redPlayerLImg);
    } else if (keyDown(DOWN_ARROW)) {
      changePosition(0, +5);
      playerRed.addImage("move", redPlayerRImg);
    }

    if (playerYel.x < 110) {
     
      database.ref('/').update({
        gameTurn: 0
      });
      database.ref('/').update({
        gameState: "start"
      });
      database.ref('/').update({
        redScore: (redScore = redScore- 5)
      });
      database.ref('/').update({
        yellowScore: (yellowScore = yellowScore+5)
      });
      database.ref("playerRed/Position").set({
        x: (playerRed.x = 150),
        y: (playerRed.y = 250),
      });
      database.ref("playerYellow/Position").set({
        x: (playerYel.x = 350),
        y: (playerYel.y = 250),
      });
     }

     if(playerRed.isTouching(playerYel)){
      database.ref('/').update({
        redScore: (redScore = redScore+5)
      });
      database.ref('/').update({
        yellowScore: (yellowScore = yellowScore- 5)
      });
      database.ref("playerRed/Position").set({
        x: (playerRed.x = 150),
        y: (playerRed.y = 250),
      });
      database.ref("playerYellow/Position").set({
        x: (playerYel.x = 350),
        y: (playerYel.y = 250),
      });
    
      database.ref('/').update({
        gameTurn: 0
      });
      //changing game state to start
      database.ref('/').update({
        gameState: "start"
      });
    }
  }

//when player touched the line he should be back to his position  


//all lines
  for (var i = 0; i < 500; i = i + 60) {
    stroke("black");
    strokeWeight(2);
    line(250, i, 250, i + 20);
  }

  for (var i = 0; i < 500; i = i + 60) {
    stroke("red");
    strokeWeight(2);
    line(110, i, 110, i + 20);
  }
  for (var i = 0; i < 500; i = i + 60) {
    stroke("yellow");
    strokeWeight(2);
    line(390, i, 390, i + 20);
  }
  drawSprites();
}

//to set position for red
function changePosition(x, y) {
  console.log("change red")
  database.ref("playerRed/Position").set({
    x: (playerRed.x = playerRed.x + x),
    y: (playerRed.y = playerRed.y + y),
  });
}
//to set position for yellow
function changePositionY(x, y) {
  console.log("change yellow")
  database.ref("playerYellow/Position").set({
    x: (playerYel.x = playerYel.x + x),
    y: (playerYel.y = playerYel.y + y),
  });
}
//to get the position of red
function readPosition(data) {
  redPos = data.val();
  playerRed.x = redPos.x;
  playerRed.y = redPos.y;
}


//to get position of yellow
function readPositionY(data) {

  yelPos = data.val();

  playerYel.x = yelPos.x;
  playerYel.y = yelPos.y;
}

//read turn from db data
function readTurn(data) {
  gameTurn = data.val();
  
}

function readScoreYellow(data) {
  yellowScore = data.val();
  
}


function readScoreRed(data) {
  redScore = data.val();
  
}



//read state from db data
function readState(data) {
  gameState = data.val();
  
}