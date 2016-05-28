---
layout: post
title: Parallax Scrolling with Phaser
subtitle: A small example how to implement simple parallax scrolling
---

Parallax Scrolling gives every side-scrolling 2d game a lot of polish and is quite easy
to achieve. It gives an illusion of depth to the background and simulates the effect
of distant objects in our vision when we move.

Here's a simple implementation of it for the [Phaser](http://markdowntutorial.com/)
game engine.

First we create the game object and define some global variables for the player
and the parallax layers.
In the preload function you have to load your different background layers and in
the create function you add them to the game. They have to be fixed to the camera so
that they are always rendered relative to the camera position. We also need to load
a player sprite when we want that the parallax scrolling should relate to the player
movement.

```javascript
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'parallax', {
  preload: preload,
  create: create,
  update: update
});

var player;
var playerOldPos = {
  x: 0,
  y: 0
};
var parallax1;
var parallax2;
var parallax3;
var parallax4;

function preload() {

  game.load.image('background0',
    'assets/img/parallax-forest-back-trees.png');
  game.load.image('background1',
    'assets/img/parallax-forest-lights.png');
  game.load.image('background2',
    'assets/img/parallax-forest-middle-trees.png');
  game.load.image('background3',
    'assets/img/parallax-forest-front-trees.png');

  game.load.spritesheet('player', 'assets/img/gripe.run.png', 32,
    32, 16);
}

function create() {
  //...

  parallax1 = game.add.tileSprite(0, 0, 800, 600, 'background0');
  parallax1.fixedToCamera = true;

  parallax2 = game.add.tileSprite(0, 0, 800, 600, 'background1');
  parallax2.fixedToCamera = true;

  parallax3 = game.add.tileSprite(0, 0, 800, 600, 'background2');
  parallax3.fixedToCamera = true;

  parallax4 = game.add.tileSprite(0, 0, 800, 600, 'background3');
  parallax4.fixedToCamera = true;

  player = game.add.sprite(0, 800, 'player', 1);

  //...
}
```
You can create your own images or look at places like [OpenGameArts.org](http://opengamearts.org)
to find some free resources.

In the update function we just need to tell the different parallax layers to move when
the player moves or better when the left or right keys are pressed. One important
thing to consider is now that we don't want to move the parallax background when the
player is blocked by an obstacle and can't move even if the key is pressed. So we
remember the old position of the player and only move the background when the players
old position is different than the actual position.


```javascript
//...

if (cursors.left.isDown) {
  //stop moving parallax when player is blocked
  if (playerOldPos.x != player.body.x) {
    parallax1.tilePosition.x += 0.1;
    parallax2.tilePosition.x += 0.3;
    parallax3.tilePosition.x += 0.6;
    parallax4.tilePosition.x += 1;
  }
  player.body.velocity.x = -150;

} else if (cursors.right.isDown) {
  //stop moving parallax when player is blocked
  if (playerOldPos.x != player.body.x) {
    parallax1.tilePosition.x -= 0.1;
    parallax2.tilePosition.x -= 0.3;
    parallax3.tilePosition.x -= 0.6;
    parallax4.tilePosition.x -= 1;
  }
  player.body.velocity.x = +150;

}
//..
```
You can put different values for the x vectors of the layers to simulate a different
illusion of speed and distance. For an working example look at the small game at the
aboutme page.
