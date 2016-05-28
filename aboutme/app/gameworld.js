var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'aboutme', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {

  game.stage.backgroundColor = '#000070';

  game.load.image('background0',
    'assets/img/parallax-forest-back-trees.png');
  game.load.image('background1',
    'assets/img/parallax-forest-lights.png');
  game.load.image('background2',
    'assets/img/parallax-forest-middle-trees.png');
  game.load.image('background3',
    'assets/img/parallax-forest-front-trees.png');

  game.load.tilemap('level1', 'assets/map/level1.json', null,
    Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles-1', 'assets/map/tiles-1.png');

  game.load.spritesheet('beeFly',
    'assets/img/enemies/Bee_32x32_Green_Flying_LR.png', 32, 32,
    4);
  game.load.spritesheet('player', 'assets/img/gripe.run.png', 32,
    32, 16);
}

var cursors;
var player;
var playerOldPos = {
  x: 0,
  y: 0
};
var paralax1;
var paralax2;
var paralax3;
var paralax4;
var map;
var layer;
var facing;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 250;

  paralax1 = game.add.tileSprite(0, 0, 800, 600, 'background0');
  paralax1.fixedToCamera = true;

  paralax2 = game.add.tileSprite(0, 0, 800, 600, 'background1');
  paralax2.fixedToCamera = true;

  paralax3 = game.add.tileSprite(0, 0, 800, 600, 'background2');
  paralax3.fixedToCamera = true;

  paralax4 = game.add.tileSprite(0, 0, 800, 600, 'background3');
  paralax4.fixedToCamera = true;

  map = game.add.tilemap('level1');
  map.addTilesetImage('tiles-1');
  map.setCollisionByExclusion([44, 45, 46, 10, 11, 12, 13, 14, 15, 16, 47, 48,
    49, 50, 51
  ]);

  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  player = game.add.sprite(0, 800, 'player', 1);
  player.smoothed = false;

  player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
  player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.bounce.y = 0;
  player.body.collideWorldBounds = true;
  //player.body.setSize(20, 32, 5, 16);

  game.camera.follow(player);


  //enemy
  bee = game.add.sprite(200, 560, 'beeFly', 1);
  bee.smoothed = false;
  anim = bee.animations.add('fly');

  anim.play(10, true);

  cursors = game.input.keyboard.createCursorKeys();

}


function update() {


  game.physics.arcade.collide(player, layer);


  player.body.velocity.x = 0;

  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -150;
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 150;
  }

  if (cursors.left.isDown) {
    //stop moving paralax when player is blocked
    if (playerOldPos.x != player.body.x) {
      paralax1.tilePosition.x += 0.1;
      paralax2.tilePosition.x += 0.3;
      paralax3.tilePosition.x += 0.6;
      paralax4.tilePosition.x += 1;
      if (facing != 'left') {
        player.animations.play('left');
        facing = 'left';
      }
    }
    player.body.velocity.x = -150;

  } else if (cursors.right.isDown) {
    //stop moving paralax when player is blocked
    if (playerOldPos.x != player.body.x) {
      paralax1.tilePosition.x -= 0.1;
      paralax2.tilePosition.x -= 0.3;
      paralax3.tilePosition.x -= 0.6;
      paralax4.tilePosition.x -= 1;

      if (facing != 'right') {
        player.animations.play('right');
        facing = 'right';
      }
    }
    player.body.velocity.x = +150;

  } else {
    if (facing != 'idle') {
      player.animations.stop();

      if (facing == 'left') {
        player.frame = 0;
      } else {
        player.frame = 5;
      }

      facing = 'idle';
    }
  }

  playerOldPos = {
    x: player.body.x,
    y: player.body.y
  };
}

function render() {


  //game.debug.cameraInfo(game.camera, 32, 32);

}
