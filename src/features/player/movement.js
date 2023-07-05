import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(player) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
      default:
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function getNewMapPosition(oldMapPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldMapPos[0] + SPRITE_SIZE, oldMapPos[1]];
      case "NORTH":
        return [oldMapPos[0], oldMapPos[1] + SPRITE_SIZE];
      case "EAST":
        return [oldMapPos[0] - SPRITE_SIZE, oldMapPos[1]];
      case "SOUTH":
        return [oldMapPos[0], oldMapPos[1] - SPRITE_SIZE];
      default:
        return [oldMapPos[0], oldMapPos[1] - SPRITE_SIZE];
    }
  }

  function getNewWalkingOrientation(direction) {
    switch (direction) {
      case "WEST":
        return "walkLeft";
      case "NORTH":
        return "walkUp";
      case "EAST":
        return "walkRight";
      case "SOUTH":
        return "walkDown";
      default:
        return "walkDown";
    }
  }

  function getNewOrientation(direction) {
    switch (direction) {
      case "WEST":
        return "translate3d(0, -50%, 0)";
      case "NORTH":
        return "translate3d(0, -25%, 0)";
      case "EAST":
        return "translate3d(0, -75%, 0)";
      case "SOUTH":
        return "translate3d(0, 0, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  }

  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function dispatchMove(
    newWalkingOrientation,
    newOrientation,
    isWalking,
    newPos,
    newMapPos
  ) {
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        isWalking: isWalking,
        orientation: newOrientation,
        walkingOrientation: newWalkingOrientation,
      },
    });
    store.dispatch({
      type: "MOVE_MAP",
      payload: {
        position: newMapPos,
      },
    });
  }

  function dispatchOrientation(newOrientation) {
    store.dispatch({
      type: "CHANGE_ORIENTATION",
      payload: {
        orientation: newOrientation,
      },
    });
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    const oldMapPos = store.getState().map.position;
    const newMapPos = getNewMapPosition(oldMapPos, direction);
    const newWalkingOrientation = getNewWalkingOrientation(direction);
    const newOrientation = getNewOrientation(direction);
    const isWalking = true;

    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos)
    ) {
      keyPressed = true;
      dispatchMove(
        newWalkingOrientation,
        newOrientation,
        isWalking,
        newPos,
        newMapPos
      );
      setTimeout(() => {
        store.dispatch({
          type: "STOP_WALKING",
        });
        keyPressed = false;
      }, 350);
    } else {
      dispatchOrientation(newOrientation);
    }
  }

  let keyPressed = false;
  function handleKeyDown(e) {
    e.preventDefault();
    if (keyPressed) {
      return;
    }
    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");
      case 38:
        return attemptMove("NORTH");
      case 39:
        return attemptMove("EAST");
      case 40:
        return attemptMove("SOUTH");
      default:
        console.log(e.keyCode);
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });

  return player;
}
