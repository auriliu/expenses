//
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setError(null);
    setIsPending(true);

    try {
      // this awaits returns a response. nusodink i res const.
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      dispatch({ type: "LOGIN", payload: res.user });

      //   update state:
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    // only update state if setIsCancelled is false.
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
}
