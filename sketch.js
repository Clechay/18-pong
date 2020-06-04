

const WHITE = '#ffffff'
const RED = '#ff0000'

function limit(val, down, up) {
  if(val < down) return down;
  if(val > up) return up;
  return val;
}

let score = 0;

const paddle = {
  y: 400,
  heigth: 100,
  width: 10
}

const ball = {
  x: 150,
  y: 400,
  vel: null
}

let scoreElem = null;
let restartElem = null;

function setup(){
  createCanvas(800, 500);
  frameRate(60);
  ball.vel = createVector(-1.4,1.6);

  
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  restartElem = createButton('restart')
  restartElem.position(20, 510);
  restartElem.id = 'restart';
  restartElem.style('color', 'black');
  restartElem.mouseClicked( restart )
}

function restart() {
  ball.vel.set(-1.4,1.6);
  score = 0;
  paddle.y = 400;
  ball.x = 150;
  ball.y = 400;
}

function renderHUD(){
  stroke(WHITE);
  strokeWeight(5);
  line(400,0,400,500);
  scoreElem.html(`Score = ${score}`)
}

function renderPlayer() {
  strokeWeight(0);
  fill(WHITE);

  rect(0,paddle.y,paddle.width,paddle.heigth)
}

function renderBall() {
  strokeWeight(0);
  fill(RED);

  circle(ball.x,ball.y,10);
}

function updateBall() {
  ball.x += ball.vel.x
  ball.y += ball.vel.y

  const ballRadius = 2.5;
  // rozpoznać kolizje
  // zareagować na kolizje

  // bottom
  if(ball.y > 500 - ballRadius){
    ball.y = 2 * (500 - ballRadius) - ball.y;
    ball.vel.y *= (-1)
  }
  
  // up
  if(ball.y < 0 + ballRadius){
    ball.y = 2 * ballRadius - ball.y;
    ball.vel.y *= (-1)
  }

  // wall
  // x = 400 - grubośc ściany / 2 = 400 - 2.5 = 397.5
  if(ball.x > 392.5){
    ball.x = 2 * 392.5 - ball.x;
    ball.vel.x *= (-1)
  }


  // left
  if(ball.x < paddle.width){
    if(ball.y < paddle.y + paddle.heigth && ball.y > paddle.y){
      ball.x = 2 * paddle.width - ball.x;
      ball.vel.x *= (-1)

      const deltaHeight = limit( ball.y - paddle.y , 0 , paddle.heigth);
      let proporcja = deltaHeight / paddle.heigth

      if(proporcja < 0.2){
        ball.vel.rotate(proporcja * (-0.5) * 5);
      }
      if(proporcja > 0.8){
        ball.vel.rotate((proporcja - 0.6) * (0.5) * 5);
      }

      score++;

    }
  }
}

function draw(){
  background(0);
  
  updateBall();
  
  renderHUD();
  renderPlayer();
  renderBall();

  if (keyIsPressed === true) {
    console.log(key)
    if(key == 'ArrowUp') paddle.y -= 10;
    if(key == 'ArrowDown') paddle.y += 10;
    paddle.y = limit(paddle.y, 0, 500)
  }
}
