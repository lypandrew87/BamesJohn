var config = {
    type: Phaser.AUTO,
    width: 2000,
    height: 2000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 200}
        }
    },
	scene : [ Infection ]
//,GameStart,StartScreen
};

var game = new Phaser.Game(config);