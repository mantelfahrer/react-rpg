import React from "react";
import { SPRITE_SIZE } from "../../config/constants";
import { connect } from "react-redux";
import Player from "../player";

import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "grass-lush";
    case 2:
      return "path";
    case 3:
      return "path-top-left";
    case 4:
      return "path-top-middle";
    case 5:
      return "path-top-right";
    case 6:
      return "path-border-left";
    case 7:
      return "path-border-right";
    case 8:
      return "path-bottom-left";
    case 9: 
      return "path-bottom-middle";
    case 10:
      return "path-bottom-right";
    case 11:
      return "rock";
    case 12:
      return "bush";
    case 13:
      return "chest";
    case 14:
      return "house-1-1";
    case 15:
      return "house-1-2";
    case 16:
      return "house-1-3";
    case 17:
      return "house-1-4";
    case 18:
      return "house-2-1";
    case 19:
      return "house-2-2";
    case 20:
      return "house-2-3";
    case 21:
      return "house-2-4";
    case 22:
      return "house-3-1";
    case 23:
      return "house-3-2";
    case 24:
      return "house-3-3";
    case 25:
      return "house-3-4";
    case 26:
      return "house-4-1";
    case 27:
      return "house-4-2";
    case 28:
      return "house-4-3";
    case 29:
      return "house-4-4";
    case 30:
      return "fence-wood";
    case 31:
      return "fence-wood-vertical";
    case 32:
      return "fence-wood-top-left";
    case 33:
      return "fence-wood-top-right";
    case 34:
      return "fence-wood-bottom-left";
    case 35:
      return "fence-wood-bottom-right";
    default:
      return "grass";
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    ></div>
  );
}

function MapRow(props) {
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE,
      }}
    >
      {props.tiles.map((tile) => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}

function Map(props) {
  return (
    <div
      className="map"
      style={{
        position: "relative",
        top: props.position[1],
        left: props.position[0],
        transition: "top 400ms linear, left 400ms linear",
      }}
    >
      {props.tiles.map((row) => (
        <MapRow tiles={row} />
      ))}
      <Player />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.map,
  };
}

export default connect(mapStateToProps)(Map);
