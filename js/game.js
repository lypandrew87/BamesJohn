var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var playerOneControls; 
var playerTwoControls; 
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('player1', 'assets/blueMan.png');
    this.load.image('player2', 'assets/redMan.png');
    this.load.image('shot', 'assets/bomb.png');
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    // The player and its settings
    player1 = this.physics.add.image(100, 450, 'player1').setScale(.5);
    player2 = this.physics.add.image(500 ,500, 'player2').setScale(.5);
    player2.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
    aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    shots = this.physics.add.group();


    this.physics.add.collider(shots, player2);

}

function update ()
{
    playerOneControls = {
        leftPressed : cursors.left.isDown,
        rightPressed : cursors.right.isDown,
        upPressed : cursors.up.isDown,
        downPressed : cursors.down.isDown, 
        spacePressed : cursors.space.isDown,
    }
    playerTwoControls = {
        leftPressed : aKey.isDown,
        rightPressed : dKey.isDown,
        upPressed : wKey.isDown,
        downPressed : sKey.isDown, 
        spacePressed : cursors.shift.isDown,
    }

    checkMovement(player1, playerOneControls, false, this); 
    checkMovement(player2, playerTwoControls,true,  this); 
}

function checkMovement(player,playerControls, shotLeft, context){
    if (playerControls.leftPressed)
    {
        player.setVelocityX(-160);
    }
    else if (playerControls.rightPressed)
    {
        player.setVelocityX(160);
    }else{
        player.setVelocityX(0);
    }

    if (playerControls.upPressed)
    {
        player.setVelocityY(-160);
    }
    else if (playerControls.downPressed)
    {
        player.setVelocityY(160);
    }
    else
    {
        player.setVelocityY(0);
    }
    
    if(playerControls.spacePressed){
        var shot;
        if(shotLeft){
           shot = shots.create(player.x - 40, player.y  - 15, 'shot') 
           shot.setVelocityX(-1000);
        }else{
            shot = shots.create(player.x + 40, player.y -15, 'shot')
            shot.setVelocityX(1000);
        }
        shot.setCollideWorldBounds(true);
        shot.setBounce(1);
         
    }
}