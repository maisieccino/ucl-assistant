import { IS_SIGNING_IN, SIGN_IN_SUCCESS } from "../../constants/userConstants";
import signIn, { initialState as signInState } from "./signInReducer";

export const initialState = {
  scopeNumber: -1,
  email: "",
  fullName: "",
  givenName: "",
  cn: "",
  upi: "",
  department: "",
  token: "",
  apiToken: "",
  signIn: signInState,
};

/**
 * Combines user state together into a single state object.
 * @param {The current Redux state} state
 * @param {The dispatched action} action
 * @param {(Optional) When true, reset user values to the initial values.} clearUser
 */
const combineState = (state, action, clearUser = false) => ({
  ...(clearUser ? initialState : state),
  signIn: signIn(state.signIn, action),
});

export default (state = initialState, action = null) => {
  const { type, user } = action;
  switch (type) {
    case IS_SIGNING_IN: {
      return {
        ...combineState(state, action, true),
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...combineState(state, action),
        ...user,
      };
    }
    default: {
      return {
        ...combineState(state, action),
      };
    }
  }
};
