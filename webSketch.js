let flower;
let bg;
let textbox;
let sounds;
let transition = 0;
let targetStage = 0;
let titleOpacity = 255;
let fadingOut = false;
let restartOpacity = 0;
let restartText = "Reset";

function preload() {
  sounds = new SoundManager();
  sounds.preload(); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  flower = new Flower();
  bg = new Background();
  textbox = new TextBox();
  sounds.playSound(); 
}

function draw() {
  let stageIndex = floor(transition) % flower.N_STAGES;
  bg.display(stageIndex);
  push();
  translate(width / 2, height / 2);
  transition = lerp(transition, targetStage, 0.05);
  flower.display(transition);
  pop();
  if (titleOpacity > 0) {
    fill(50, titleOpacity);
    textAlign(CENTER, CENTER);
     textFont("SUSE Mono")
    textSize(60);
    text("Seed of Birth", width / 2, height / 2 - 200);

    if (fadingOut) {
      titleOpacity -= 5;
      titleOpacity = max(titleOpacity, 0);
    }
  }
  textbox.draw(stageIndex);
  if (targetStage === flower.N_STAGES - 1) {
    restartOpacity = min(restartOpacity + 5, 255); 
  } else {
    restartOpacity = 0;
  }

  drawRestartButton();
}

function mousePressed() {
  sounds.playClick();
  if (
    mouseX > width - 150 &&
    mouseX < width - 50 &&
    mouseY > 20 &&
    mouseY < 60 &&
    restartOpacity > 0
  ) {
    restartAnimation();
  } else {
    if (targetStage < flower.N_STAGES - 1) {
      targetStage++;
    }
    if (targetStage > 0) fadingOut = true;
    textbox.nextText();
  }
}

function restartAnimation() {
  targetStage = 0;
  transition = 0;
  titleOpacity = 255;
  fadingOut = false;
  restartOpacity = 0;
  textbox.resetText();
}
function drawRestartButton() {
  if (restartOpacity <= 0) return;
  fill(50, restartOpacity);
  stroke(255, restartOpacity);
  strokeWeight(2);
  rect(width - 150, 20, 100, 40, 8);

  fill(255, restartOpacity);
  noStroke();
textFont("SUSE Mono")
  textSize(18);
  textAlign(CENTER, CENTER);
  text(restartText, width - 100, 40);
}
