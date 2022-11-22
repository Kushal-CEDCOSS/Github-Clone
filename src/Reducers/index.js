const initialState = {
  name: "",
};

const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Save_Login_Name":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default nameReducer;
