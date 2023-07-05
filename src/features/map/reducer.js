const initialState = {
  tiles: [],
  position: [448, 192],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TILES":
      return {
        ...state,
        tiles: action.payload.tiles,
      };
    case "MOVE_MAP":
      return {
        ...state,
        position: action.payload.position,
      }
    default:
      return state;
  }
};

export default mapReducer;
