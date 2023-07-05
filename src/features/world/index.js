import React from "react";
import Map from "../map";
import store from '../../config/store';
import { SPRITE_SIZE } from "../../config/constants";

import { tiles } from '../../data/maps/1';

function World(props) {
  store.dispatch({ type: 'ADD_TILES', payload: {
    tiles,
  }})
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${1024 + SPRITE_SIZE}px`,
        height: `${512 + SPRITE_SIZE}px`,
        overflow: "hidden",
      }}
    >
      <Map />
    </div>
  );
}

export default World;
