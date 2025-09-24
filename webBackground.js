class Background {
  constructor() {
    this.t = 0; 
    this.scl = 20;  
    this.cols = floor(windowWidth / this.scl);
    this.rows = floor(windowHeight / this.scl);
    this.flowfield = new Array(this.cols * this.rows);
    this.particles = [];
    for (let i = 0; i < 500; i++) {
      this.particles.push(new Particle());
    }
  }

  display(stage) {
    if (stage === 0) {
      this.gradientBackground();
    } else if (stage === 1) {
      this.flowFieldBackground();
    } else if (stage === 2) {
      this.gridBackground();
    } else if (stage === 3) {
      this.centerCircleBackground();
    } else if (stage === 4) {
      this.simpleGenerativeBackground();
    } else {
      background(30); 
    }
    this.t += 0.01;
  }

  gradientBackground() {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(180, 220, 255), color(240, 200, 230), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }


  flowFieldBackground() {
    background(20, 30, 50, 40); 
    let yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let angle = noise(xoff, yoff, this.t) * TWO_PI * 2;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(0.1);
        this.flowfield[index] = v;
        xoff += 0.1;
      }
      yoff += 0.1;
    }

    for (let p of this.particles) {
      p.follow(this.flowfield, this.cols, this.scl);
      p.update();
      p.edges();
      p.show();
    }
  }

  gridBackground() {
    background(240, 240, 250);
    stroke(200);
    let offsetX = (frameCount * 0.5) % 40;
    let offsetY = (frameCount * 0.5) % 40;

    for (let x = -offsetX; x < width; x += 40) {
      line(x, 0, x, height);
    }
    for (let y = -offsetY; y < height; y += 40) {
      line(0, y, width, y);
    }
  }

  centerCircleBackground() {
    background(250);
    noStroke();
    fill(200, 180, 240, 180);
    let radius = 150 + 50 * sin(this.t);
    ellipse(width / 2, height / 2, radius * 2, radius * 2);

    if (!this.circleParticles) {
      this.circleParticles = [];
      for (let i = 0; i < 150; i++) {
        let x = random(width * 0.1, width * 0.9);
        let y = height + random(10, 100);
        let pos = createVector(x, y);
        this.circleParticles.push({ pos: pos, prevPos: pos.copy(), speed: random(2, 5) });
      }
    }

    stroke(180, 150, 220, 180);
    strokeWeight(2);
    for (let p of this.circleParticles) {
      let dir = createVector(width / 2, height / 2).sub(p.pos);
      dir.setMag(p.speed);
      p.pos.add(dir);
      line(p.prevPos.x, p.prevPos.y, p.pos.x, p.pos.y);
      p.prevPos.set(p.pos);

      if (dist(p.pos.x, p.pos.y, width / 2, height / 2) < radius) {
        let x = random(width * 0.1, width * 0.9);
        let y = height + random(10, 100);
        p.pos = createVector(x, y);
        p.prevPos = p.pos.copy();
        p.speed = random(2, 5);
      }
    }
  }

  simpleGenerativeBackground() {
    background(245, 240, 255);

    if (!this.simpleParticles) {
      this.simpleParticles = [];
      for (let i = 0; i < 200; i++) {
        this.simpleParticles.push({
          pos: createVector(random(width), random(height)),
          radius: random(2, 6),
          speed: random(0.2, 0.6),
          angle: random(TWO_PI)
        });
      }
    }

    noStroke();
    fill(220, 180, 250, 150);
    for (let p of this.simpleParticles) {
      ellipse(p.pos.x, p.pos.y, p.radius);
      p.pos.x += cos(p.angle) * p.speed;
      p.pos.y += sin(p.angle) * p.speed;

      if (p.pos.x > width) p.pos.x = 0;
      if (p.pos.x < 0) p.pos.x = width;
      if (p.pos.y > height) p.pos.y = 0;
      if (p.pos.y < 0) p.pos.y = height;
    }
  }
}
