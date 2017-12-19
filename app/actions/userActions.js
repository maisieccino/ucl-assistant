import { AuthSession, Constants as ExpoConstants } from "expo";
import * as constants from "../constants/userConstants";

export const isSigningIn = () => ({
  type: constants.IS_SIGNING_IN,
});

export const signInSuccess = result => ({
  type: constants.SIGN_IN_SUCCESS,
  user: {
    token: result.params.token,
    apiToken: result.params.apiToken,
    scopeNumber: parseInt(result.params.scopeNumber, 10),
    email: result.params.email,
    fullName: result.params.full_name,
    givenName: result.params.given_name,
    cn: result.params.cn,
    upi: result.params.upi,
    department: result.params.department,
  },
});

export const signInFailure = error => ({
  type: constants.SIGN_IN_FAILURE,
  error,
});

export const signInCancel = () => ({
  type: constants.SIGN_IN_CANCEL,
});

export const signIn = () => async dispatch => {
  await dispatch(isSigningIn());
  const result = await AuthSession.startAsync({
    authUrl: "https://ucl-assistant-server.now.sh/connect/uclapi",
    returnUrl: ExpoConstants.linkingUrl,
  });
  console.log(result);
  if (result.type === "success") {
    return dispatch(signInSuccess(result));
  }
  // login cancelled by user.
  return dispatch(signInCancel());
};
