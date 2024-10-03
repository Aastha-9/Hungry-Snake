// Game Constants
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("../assets/music/food.mp3");
let gameOverSound = new Audio("../assets/music/gameover.mp3");
let moveSound = new Audio("../assets/music/move.mp3");
let musicSound = new Audio("../assets/music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let flg = false;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if you bump into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again!");
  //   $(function () {
  //     // $(".backdrop").fadeTo(200, 1);
  //     $("#imgInDialog").dialog();
  //     $(document).keydown(function (event) {
  //       if(event.keyCode == 40 || event.keyCode == 39 || event.keyCode == 38 || event.keyCode == 37){
  //         return false;
  //       }
  //     });
  //  });
//    $(function () {

//     $(document).keydown(function (event) {
//       if(event.keyCode == 40 || event.keyCode == 39 || event.keyCode == 38 || event.keyCode == 37){
//         return event.keyCode;
//       }
//     });
//  });

    snakeArr = [{ x: 13, y: 15 }];
    musicSound.pause();
    score = 0;
  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscore = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscore.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  if (!(score % 10) && score != 0 && flg == false) {
    speed += 2;
    flg = !flg;
  }

  // Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //Display the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, idx) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (idx === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
