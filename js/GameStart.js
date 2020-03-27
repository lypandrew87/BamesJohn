class GameStart extends Phaser.Scene {
	
	//Call custructor from parent class
	constructor() {
		super({key:"GameStart"});	//Names the scene so that other scenes can find it
	}

	//Load Assets
	preload(){
	this.load.image('sky', 'assets/sky.png');
	this.load.image('StartButton','assets/StartButton.png');
	}

	//Actualy Make the Scene
	create() {
	this.add.image (400,300,'sky');
	this.StartButton = this.add.image (400,300, 'StartButton').setScale(0.5);
	this.StartButton.setInteractive();
	this.StartButton.on('pointerdown',function(event){
		this.scene.start("StartScreen");
	},this)
	}
	//Runs repetadley and cheks for events
	update(delta) {
	
	}
}