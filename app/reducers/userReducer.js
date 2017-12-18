import {
  IS_SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_CANCEL,
} from "../constants/userConstants";

export const initialState = {
  scopeNumber: -1,
  email: "",
  fullName: "",
  givenName: "",
  cn: "",
  upi: "",
  department: "",
  cookieKoaSess: "",
  cookieKoaSessSig: "",
  isSigningIn: false,
  signInError: "",
};

export default (state = initialState, action = null) => {
  const { type, user, error } = action;
  switch (type) {
    case IS_SIGNING_IN: {
      return { ...initialState, isSigningIn: true };
    }
    case SIGN_IN_SUCCESS: {
      return { ...state, ...user, isSigningIn: false, signInError: "" };
    }
    case SIGN_IN_FAILURE: {
      return { ...state, isSigningIn: false, error };
    }
    case SIGN_IN_CANCEL: {
      return { ...state, isSigningIn: false, error: "" };
    }
    default: {
      return state;
    }
  }
};
