class SoundManager {
  constructor() {
    this.bgMusic = null;
    this.clickSound = null;
  }
  preload() {
    soundFormats("mp3", "wav");
    this.bgMusic=loadSound("sound/musicbg.mp3");
    this.clickSound=loadSound("sound/click.mp3");
  }
  playSound() {
    if (this.bgMusic && !this.bgMusic.isPlaying()){this.bgMusic.loop();this.bgMusic.setVolume(0.3);}
  }
  playClick() {
    if (this.clickSound && this.clickSound.isLoaded()) {this.clickSound.play();this.clickSound.setVolume(0.3);}
  }
}
