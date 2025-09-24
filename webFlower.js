class Flower {
  constructor() {
    this.N_STAGES = 6;
    this.ANGLE_STEP = 1;
  }

  display(transition) {
    let s0 = floor(transition) % this.N_STAGES;
    let s1 = ceil(transition) % this.N_STAGES;
    let localT = constrain(transition - floor(transition), 0, 1);
    let easedLocal = this.easeInOutCubic(localT);

    let growthProgress = (floor(transition) + easedLocal) / (this.N_STAGES - 1);

    let freq = lerp(1, 0.5, growthProgress);
    let amp = lerp(3, 20, growthProgress);
    let t = frameCount * freq;

    push();
    strokeWeight(3);
    noFill();
    beginShape();
    for (let a = 0; a < 360; a += this.ANGLE_STEP) {
      let base = this.radiusForStage(s0, a, t, amp);
      let next = this.radiusForStage(s1, a, t, amp);
      let r = lerp(base, next, easedLocal);
      stroke(150, 100, 200);
      vertex(r * cos(a), r * sin(a));
    }
    endShape(CLOSE);

    for (let k = 1; k <= 3; k++) {
      strokeWeight(1.5);
      beginShape();
      for (let a = 0; a < 360; a += this.ANGLE_STEP) {
        let base = this.radiusForStage(s0, a, t, amp) * (0.6 + k * 0.1);
        let next = this.radiusForStage(s1, a, t, amp) * (0.6 + k * 0.1);
        let r = lerp(base, next, easedLocal);
        stroke(200 - k * 20, 10 + k * 120, 10 - k * 50);
        noFill();
        vertex(r * cos(a), r * sin(a));
      }
      endShape(CLOSE);
    }
    noStroke();
    fill(255, 160, 200);
    ellipse(0, 0, 80, 80);
    fill(255, 200, 230);
    ellipse(0, 0, 40, 40);
    pop();
  }



  radiusForStage(stage, a, t, amp) {
    if (stage === 0) return 120 + 5 * sin(a + t * 2);
    if (stage === 1) return 120 + 20 * sin(3 * a + t);
    if (stage === 2) return 120 + 40 * sin(6 * a + t) + 10 * sin(12 * a + t);
    if (stage === 3) return 120 + 60 * abs(sin(6 * a + t)) + 20 * sin(18 * a + t);
    if (stage === 4) return 120 + 80 * sin(6 * a + t * 1.5) + 30 * sin(12 * a + t * 2);
    if (stage === 5) {
      return 120
        + 40 * pow(sin(6 * a + t), 2)
        + 10 * sin(12 * a + t * 1);
    }
    return 120;
  }

  easeInOutCubic(x) {
    x = constrain(x, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
  }
}
