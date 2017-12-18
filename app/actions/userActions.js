import { AuthSession, Constants as ExpoConstants } from "expo";
import * as constants from "../constants/userConstants";

export const isSigningIn = () => ({
  type: constants.IS_SIGNING_IN,
});

export const signInSuccess = user => ({
  type: constants.SIGN_IN_SUCCESS,
  user,
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
  if (result.type === "success") {
    // set-cookies is given in the form of `key=value[;key2=value[...]]`
    // convert this to an object.
    const cookies = result.params["set-cookie"]
      .split(/\s*;\s*/)
      .map(cookie => cookie.split(/\s*=\s*/));
    const cookieKoaSess = cookies.filter(
      cookie => cookie[0] === "koa:sess",
    )[0][1];
    const cookieKoaSessSig = cookies.filter(
      cookie => cookie[0] === "koa:sess.sig",
    )[0][1];
    try {
      const user = {
        cookieKoaSess,
        cookieKoaSessSig,
        scopeNumber: parseInt(result.params.scope_number, 10),
        email: result.params.email,
        fullName: result.params.full_name,
        givenName: result.params.given_name,
        cn: result.params.cn,
        upi: result.params.upi,
        department: result.params.department,
      };
      return dispatch(signInSuccess(user));
    } catch (err) {
      return dispatch(
        signInFailure(typeof err === "string" ? err : err.message),
      );
    }
  } else {
    // login cancelled by user.
    return dispatch(signInCancel());
  }
};
