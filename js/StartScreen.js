var shots;


var Bullet = new Phaser.Class({
			Extends: Phaser.Physics.Image,
			initialize:
			// Bullet Constructor
			function Bullet (scene)
			{
				Phaser.GameObjects.Image.call(this, scene, 0, 0, 'shot');
				this.speed = 1;
				this.born = 0;
				this.direction = 0;
				this.xSpeed = 0;
				this.ySpeed = 0;
				//this.setSize(20, 20, true);
			},
		
			// Fires a bullet from the player to the reticle
			fire: function (shooter, target)
			{
				this.setPosition(shooter.x, shooter.y); // Initial position
				this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
		
				// Calculate X and y velocity of bullet to moves it from shooter to target
				if (target.y >= this.y)
				{
					this.xSpeed = this.speed*Math.sin(this.direction);
					this.ySpeed = this.speed*Math.cos(this.direction);
				}
				else
				{
					this.xSpeed = -this.speed*Math.sin(this.direction);
					this.ySpeed = -this.speed*Math.cos(this.direction);
				}
		
				this.rotation = shooter.rotation; // angle bullet with shooters rotation
				this.born = 0; // Time since new bullet spawned
			},
		
			// Updates the position of the bullet each cycle
			update: function (time, delta)
			{
				this.setVelocity(this.xSpeed *1000, this.ySpeed*1000);
				if (this.born > 1800)
				{
					this.setActive(false);
					this.setVisible(false);
				}
			}
	});



class StartScreen extends Phaser.Scene {
	
	//Call custructor from parent class
	constructor() {
		super({key:"StartScreen"});	//Names the scene so that other scenes can find it
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
		var bullet;
		//Add image I don't care to move or change in scene
		this.add.image (400,300,'sky');

		//Add image I do want to use and change (add the .physics. if you need it to interact and stuff)
		
		this.player = this.physics.add.sprite(200,300,'player1').setScale(0.5);
		this.player.body.setGravityY(300);
		this.player.setBounce(0.2);
		//this.player.anchor.set(0.5);
		this.player.body.collideWorldBounds = true;
		//this.physics.arcade.enable(this.player);
		//this.player.setCollideWorldBounds(true);

		//scene.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
		this.platforms.create(600, 400, 'platform');
		this.platforms.create(50, 250, 'platform');
		this.platforms.create(750, 220, 'platform');

		this.player2 = this.physics.add.sprite(400,300,'player2').setScale(0.5);
		this.player2.body.collideWorldBounds = true;
		this.player2.body.setGravityY(300);
		this.player2.setBounce(0.2);
		this.player2.health = 100;

		this.gunshot = this.sound.add("pew");


		shots = this.physics.add.group();


   		
   		
		//Example of event happenning once on key press (nothing happens if you hold it down)
		this.input.keyboard.on('keydown_D',function(event){
		var shot = shots.create(this.player.x + 28, this.player.y  - 15, 'shot');
        shot.setVelocityX(1000);
		this.gunshot.play();
		},this);


		//Set the event watchers. These tell you if something happens
		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);

		//this.physics.world.addCollider(this.player, this.player2, =>{
		//	player2.destroy();
		//});

	}
	

	//Runs repetadley and cheks for events
	update(delta) {

		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(shots, this.player2);
		this.physics.add.collider(this.platforms, this.player2);
		
		this.physics.world.addCollider(this.player2, shots, collisionHandler, null, this);
		
		if (this.player2.health == 0){
			this.scene.start("GameStart");
		}
				
		if(this.key_UP.isDown){
			this.player.setVelocityY(-330);
		}
		//Move Left
		if(this.key_LEFT.isDown){
			this.player.setVelocityX(-200);
		}
		//Move Right
		else if(this.key_RIGHT.isDown){
			this.player.setVelocityX(200);
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

