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
    player2 = this.physics.add.image(100, 500, 'player2').setScale(.5);

    //  Player physics properties. Give the little guy a slight bounce.
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

}

function update ()
{
    if (gameOver)
    {
        return;
    }
    checkMovement(player1); 
    checkMovement(player2); 

    if (cursors.left.isDown)
    {
        player1.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player1.setVelocityX(160);
    }else{
        player1.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        player1.setVelocityY(-160);
    }
    else if (cursors.down.isDown)
    {
        player1.setVelocityY(160);
    }
    else
    {
        player1.setVelocityY(0);
    }
    
    if(cursors.space.isDown){
        var currentShot = this.physics.add.image(player1.x + 40, player1.y + -15, 'shot');
        currentShot.setVelocityX(1000); 

    }
}

function checkMovement(player){
    
}