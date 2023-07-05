const initialState = {
  position: [64, 64],
  isWalking: false,
  walkingOrientation: "",
  orientation: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...action.payload,
      };
    case "STOP_WALKING":
      return {
        ...state,
        isWalking: false,
      };
    case "CHANGE_ORIENTATION":
      return {
        ...state,
        orientation: action.payload.orientation,
      };
    default:
      return state;
  }
};

export default playerReducer;
