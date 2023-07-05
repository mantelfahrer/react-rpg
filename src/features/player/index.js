import React from "react";
import { connect } from "react-redux";
import walkSprite from "./sprites/player-walk.png";
import handleMovement from "./movement";
import { SPRITE_SIZE } from "../../config/constants";

import "./styles.css";

function Player(props) {
  function getWalkClass() {
    if (props.isWalking) {
      return props.walkingOrientation;
    } else {
      return "";
    }
  }
  
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        overflow: "hidden",
        transition: "top 400ms linear, left 400ms linear",
      }}
    >
      <img className={getWalkClass()} alt="player character" src={walkSprite} style={{
        width: SPRITE_SIZE*4,
        height: SPRITE_SIZE*4,
        imageRendering: "pixelated",
        transform: props.orientation,
      }} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
  };
}

export default connect(mapStateToProps)(handleMovement(Player));
