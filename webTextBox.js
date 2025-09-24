class TextBox {
  constructor() {
    this.stageTexts = [
      ["Welcome to your new world!", "You are born in this world"], // S0
      ["Such courage to change"], // S1
      ["Such curiousity to discover"],    // S2
      ["Such painful to realize"],   // S3
      ["The end","Without it you can't grow", "Stand proud", "But here you are, as beautiful as anything this world has"] //S4
    ];
    this.currentIndex = 0;
    this.blinkTimer = 0;
  }

  draw(stage) {
    fill(0);
    stroke(0);
    rect(50, height - 120, width - 100, 100, 10);
    fill(250);
    noStroke();
    textFont("SUSE Mono")
    textSize(30);
    textAlign(LEFT, CENTER);
    text(this.stageTexts[stage][this.currentIndex % this.stageTexts[stage].length], 70, height - 70);
    this.blinkTimer++;
    if (this.blinkTimer % 60 < 30) {
      fill(20);
      rect(70 + textWidth(this.stageTexts[stage][this.currentIndex % this.stageTexts[stage].length]) + 5, height - 85, 10, 25);
    }
    fill(255);
    textFont("SUSE Mono")
    textSize(18);
    textAlign(RIGHT, BOTTOM);
    text("click anywhere to continue", width - 70, height - 30);
  }
  nextText() {
    this.currentIndex++;
  }
  resetText() {
    this.currentIndex = 0;
  }
}
