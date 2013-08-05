define([], function() {
  var ON_COLLITION = "onCollition";

  var handleCollition = function(collidableA, collidableB) {
    workerSelf.postMessage({
      type: "log",
      data: "Time for collition."
    });
    collidableA.onCollition(collidableB);
    collidableB.onCollition(collidableA);
  };

  var collides = function(collidableA, collidableB) {
    //The sides of the rectangles
    var positionA = collidableA.getPosition(),
      positionB = collidableB.getPosition(),
      sizeA = collidableA.getSize(),
      sizeB = collidableB.getSize(),
      leftA = positionA.x,
      leftB = positionB.x,
      rightA = positionA.x + sizeA.width,
      rightB = positionB.x + sizeB.width,
      topA = positionA.y,
      topB = positionB.y,
      bottomA = positionA.y + sizeA.height,
      bottomB = positionB.y + sizeB.height;

    //If any of the sides from A are outside of B
    if (bottomA <= topB) {
      return false;
    }

    if (topA >= bottomB) {
      return false;
    }

    if (rightA <= leftB) {
      return false;
    }

    if (leftA >= rightB) {
      return false;
    }

    //If none of the sides from A are outside B
    return true;
  };

  var isCollidable = function(object) {
    return ON_COLLITION in object;
  };

  var detectCollitions = function(objects) {
    var i, j;

    for (i = 0; i < objects.length; i++) {
      if (isCollidable(objects[i])) {
        for (j = i + 1; j < objects.length; j++) {
          if (isCollidable(objects[j]) && collides(objects[i], objects[j])) {
            handleCollition(objects[i], objects[j])
          }
        }
      }
    }
  };

  var collitionManager = {
    detectCollitions: detectCollitions
  };

  return collitionManager;
});