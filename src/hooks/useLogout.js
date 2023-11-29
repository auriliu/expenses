//
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function logout() {
    setError(null);
    setIsPending(true);

    // sign out:
    try {
      await projectAuth.signOut();
      //await: waits here until it completes it before it moves on.
      //   dispatch logout action: this right here removes from the local state.
      dispatch({ type: "LOGOUT", payload: null });
      //   skip payload, cause when its logged out it becomes null.

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

  return { logout, error, isPending };
}
