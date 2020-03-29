var shots;
var connection;
var playerId;
var allPlayers = new Map();

class StartScreen extends Phaser.Scene {

	//Call custructor from parent class
	constructor() {
		super({ key: "StartScreen" });	//Names the scene so that other scenes can find it
	}

	//Load Assets
	preload() {
		this.load.image('sky', 'assets/sky.png');
		this.load.image('player1', 'assets/blueMan.png');
		this.load.image('shot', 'assets/bomb.png');
		this.load.audio('pew', ['assets/pew.mp3']);
	}

	//Actualy Make the Scene
	create() {

		this.connectToServer(this);

		//Add image I don't care to move or change in scene
		this.add.image(400, 300, 'sky');

		//Add image I do want to use and change (add the .physics. if you need it to interact and stuff)
		this.player1 = this.physics.add.image(200, 545, 'player1').setScale(0.5);
		this.player1.setCollideWorldBounds(true);
		this.player1.setVelocity(0, 0);

		this.gunshot = this.sound.add("pew");


		shots = this.physics.add.group();

		//Set the event watchers. These tell you if something happens
		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
	}

	update() {

		//console.log(allPlayers);

		//Move Left
		if (this.key_LEFT.isDown) {
			this.player1.x -= 1;
			var updateMessage = { type: "MOVEMENT", playerId: playerId, xPos: this.player1.x, yPos: this.player1.y };
			connection.send(JSON.stringify(updateMessage));

		}
		//Move Right
		else if (this.key_RIGHT.isDown) {
			this.player1.x += 1;
			var updateMessage = { type: "MOVEMENT", playerId: playerId, xPos: this.player1.x, yPos: this.player1.y };
			connection.send(JSON.stringify(updateMessage));
		}

		//Move UP
		if (this.key_UP.isDown) {
			this.player1.y -= 20;
			var updateMessage = { type: "MOVEMENT", playerId: playerId, xPos: this.player1.x, yPos: this.player1.y };
			connection.send(JSON.stringify(updateMessage));
		}

		this.updateMap();

	}

	updateMap() {

	}


	connectToServer(canvas) {
		connection = new WebSocket('ws://127.0.0.1:3001');
		connection.onmessage = function (message) {

			try {
				var json = JSON.parse(message.data);
			} catch (e) {
				console.log('Invalid JSON: ', message.data);
				return;
			}



			switch (json.type) {
				case 'NEW_PLAYER':
					var p = canvas.physics.add.image(json.player.xPos, json.player.yPos, 'player1').setScale(0.5);
					p.setCollideWorldBounds(true);
					p.setVelocity(0, 0);
					allPlayers.set(json.player.playerId, p);
					break;
				case 'CONNECTION_INFORMATION':
					playerId = json.playerId;
					debugger;
					for (var i = 0; i < json.players.length; i++) {
						var p = canvas.physics.add.image(json.players[i].xPos, json.players[i].yPos, 'player1').setScale(0.5);
						p.setCollideWorldBounds(true);
						p.setVelocity(0, 0);

						allPlayers.set(json.players[i].playerId, p);
					}
					break;
				case 'PLAYER_MOVEMENT_UPDATE':
					allPlayers.get(json.playerId).x = json.xPos;
					allPlayers.get(json.playerId).y = json.yPos;
					break;

			}
		}
	}
};


