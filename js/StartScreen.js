class StartScreen extends Phaser.Scene {
	
	//Call custructor from parent class
	constructor() {
		super({key:"StartScreen"});	//Names the scene so that other scenes can find it
	}

	//Load Assets
	preload(){
	this.load.image('sky', 'assets/sky.png');
	this.load.image('player1', 'assets/blueMan.png');
	this.load.image('shot', 'assets/bomb.png');
	this.load.audio('pew',['assets/pew.mp3']);
	}

	//Actualy Make the Scene
	create() {
		//Add image I don't care to move or change in scene
		this.add.image (400,300,'sky');

		//Add image I do want to use and change (add the .physics. if you need it to interact and stuff)
		this.player1 = this.physics.add.image(400,300,'player1').setScale(0.5);
		this.player1.setCollideWorldBounds(true);
		this.player1.setVelocity(0,0);

		this.gunshot = this.sound.add("pew");

		//Example of event happenning once on key press (nothing happens if you hold it down)
		this.input.keyboard.on('keydown_D',function(event){
			var bullet = this.physics.add.image(this.player1.x+40,this.player1.y-15, "shot");
			bullet.setVelocityX(1000);
			this.gunshot.play();
		},this);

		this.input.keyboard.on('keydown_UP',function(event){
			this.player1.setVelocityY(-200);
		},this);

		//Set the event watchers. These tell you if something happens
		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
	}

	//Runs repetadley and cheks for events
	update(delta) {
		//Shoot Gun
		//if(this.key_SPACE.)
		
		//Move Left
		if(this.key_LEFT.isDown)
			this.player1.setVelocityX(-100);
			
		//Move Right
		else if(this.key_RIGHT.isDown)
			this.player1.setVelocityX(100);
		//Move Down
		else if(this.key_DOWN.isDown)
			this.player1.y+=3;
		else{
			this.player1.setVelocityX(0);
		}
	}
}