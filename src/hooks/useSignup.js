//
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  async function signup(email, password, displayName) {
    setError(null);
    setIsPending(true);
    try {
      // try to sign up a user with fb using email/pass.
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user); //that's ur new user.
      // if there're errors with that response from the fb:
      if (!res) {
        throw new Error("could not complete sign up.");
      }
      //   update display name to user
      await res.user.updateProfile({ displayName });
      //dispatch login action:
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message); //password too short or email is taken etc.
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  // what do you want to export from this hook?
  return { error, isPending, signup };
}
