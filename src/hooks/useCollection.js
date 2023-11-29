//
import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export function useCollection(collection, _query, _orderBy) {
  const [documents, setDocuments] = useState(null);
  // documents: docs from the fs.
  const [error, setError] = useState(null);
  // error, in case there's one with request.

  //   break out of the infinite loop:
  const query = useRef(_query).current;
  // useRef doesnt see it as different on every evaluation.
  const orderBy = useRef(_orderBy).current;

  // a real time listener inside useEffect, because u want it to run as soon as the component mounts: go grab the data right away.

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    // only fetch docs where uid === user.uid
    // or u could attach .where() at the end of this.
    // 3 dif params go into this .where() method.

    // this query is an [ ], - that's infinite loop.
    // accept 3 dif args using ... : ["", "", ""] = query, ...query

    // if there's a second argument on useCollection()
    // if (query) {
    //   ref = ref.where(query);
    // }

    // getting the collection, but not all of it.
    // just .where uid == user.uid
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      // order docs when u fetch them:
      // takes in 2 args: property, and ascending or descending.
      ref = ref.orderBy(...orderBy);
      // orderBy = [property, asc/des]
    }

    // snapshot: the collection in time, whenever it changes it fires again.
    // if u delete or update a doc.
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          // ...doc.data() = { name, amount }, grabbing the doc id as well.
          // NOT the users id, doc's id.
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collection, query, orderBy]);
  return { documents, error };
}
