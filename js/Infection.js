var player;



class Infection extends Phaser.Scene {
	
	//Call custructor from parent class
	constructor() {
		super({key: "Infection"});	//Names the scene so that other scenes can find it
	}

	//Load Assets
	preload(){
	this.load.image('sky', 'assets/sky.png');
	this.load.image('platform','assets/platform.png');
	this.load.image('player2', 'assets/blueMan.png');
	this.load.image('player1', 'assets/blueMan.png');
	this.load.image('shot', 'assets/bomb.png');
	this.load.audio('pew',['assets/pew.mp3']);
	}

	//Actualy Make the Scene
	create() {
		//Add image I don't care to move or change in scene
		this.add.image (400,300,'sky');

		//Add image I do want to use and change (add the .physics. if you need it to interact and stuff)
		
		player = this.physics.add.sprite(200,300,'player1').setScale(0.5);
		player.body.collideWorldBounds = true;

		shots = this.physics.add.group();

		//Set the event watchers. These tell you if something happens
		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);


	}
	

	//Runs repetadley and cheks for events
	update(delta) {
				
		if(this.key_UP.isDown){
			player.setVelocityY(-200);
		}
		//Move Left
		if(this.key_LEFT.isDown){
			player.setVelocityX(-200);
		}
		//Move Right
		else if(this.key_RIGHT.isDown){
			player.setVelocityX(200);
		}
		else if(this.key_Right.isDown){
			player.setVelocityY(200);
		}
		else{
			this.player.setVelocityX(0);
		}
	}
}

function collisionHandler(bullet, playerHit)
	{
			console.log("here");
			//bullet.destroy();
			this.player2.helath -=10;
			console.log(this.player2.Health);
	}

