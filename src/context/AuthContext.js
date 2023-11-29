//
import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

// y is he exporting everything?
// just in case he wants to use it in another file later on.
export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      // giving value to the user, no longer a null.
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
}
// wrap the entire app with this:
export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false, //#1 show nothing until authIsReady is true.
  });
  // check once with fb: no user = null.
  useEffect(() => {
    // to fb: tell me when there r changes to auth state.
    // and when there is, fire this f(): auth change event listener.
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state: ", state);
  // children will be the App component

  return (
    // passing down the state and the f() to update it.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
