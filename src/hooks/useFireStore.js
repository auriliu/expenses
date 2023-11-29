//
import { useReducer, useEffect, useState } from "react";
// useEffect for the cleanup()
// useState() isCancelled state for the cleanup().
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

function firestoreReducer(state, action) {
  switch (action.type) {
    case "IS_PENDING":
      // return { ...state, isPending: true };
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function useFireStore(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  // response we get from fs when u make a request.
  // fs collection reference:
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled:
  function dispatchIfNotCancelled(action) {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  async function addDocument(doc) {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      // doc = {name, amount}
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
      // if (!isCancelled) {
      //   // update state if isCancelled is false
      //   dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
      // }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  }

  async function deleteDocument(id) {
    dispatch({ type: "IS_PENDING" });
    // try to delete:
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  }

  //   clean up:
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
}
