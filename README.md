# Creature Battle

[Live Link](http://creaturebattle.mesona.net/)

![battleScreen](https://github.com/Mesona/creatureBattle/tree/master/docs/design/readmeBattle.png "Creatures battling")

## Background
* This game was inspired by the old PS1 era Monster Rancher series, which had many unique systems I have not seen replicated since.  The player has the option to change their creature's weapon, armor, and personality before sending it into battle.  Once in battle, the player can sit back and watch as their creature tries its best to defeat its opponent.

## Technology
* Vanilla JavaScript: Game logic
* HTML5 Canvas: Visual rendering
* Webpack: Resource bundling

## Functionality
* Randomized weapons and armor that change every game.
* Customizable personalities.
* Animated creatures.
* A tutorial!

## Cool code snippets


Before the inclusion of the tutorial, canvas would have a slight delay in loading.  To increase the render speed, I stopped rending the backgrounds through canvas and placed them as static images loaded through CSS elements.  When the user switches between the preparation stage and the combat stage, this code gets run to swap out which images are being loaded:
```javascript
    // Remove the hills background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layers-hills");
    this.canvas.classList.remove("back-image-layers-hills");

    // Apply the forest background
    backgroundLayerFront.classList.add("front-image-layers-forest");
    this.canvas.classList.add("back-image-layers-forest");
```

To simulate a tutorial, I discovered I could simply apply an opaque layer to the entire canvas, and then clear the area I wanted the user to focus on:
```javascript
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(340, 280, 220, 200)
```

![tutorialScreen](https://github.com/Mesona/creatureBattle/tree/master/docs/design/readmeTutorial.png "Tutorial")


I did a lot of randomizing of elements in this project.  They all rely upon Math.random() in some capacity.  Here, every time a new weapon is created, the weapon's name is chosen from a list of prefixes and suffixes:

```javascript
generateWeaponName = function() {
  const prefix = [
    "Stick",
    "Torch",
    "Fist",
    "Dagger",
    "Blade",
    "Tooth",
    "Claw",
    "Eye"
   ]
   const suffix = [
     "fire",
     "ice",
     "frenzy",
     "fury",
     "decay",
     "bravado",
     "grit",
     "pizzaz"
   ]
   weaponName = prefix[Math.floor(Math.random() * 8)]
                + " of " + suffix[Math.floor(Math.random() * 8)];

   return weaponName;
  }
```
And here is how an "Aggressive" behavioral style creature chooses where its next move will be:
```javascript
  playerCreatureMovePattern =
    ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10) + (playerCreature.spd * 2));
```
