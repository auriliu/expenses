//

import { useEffect, useState } from "react";
import { useFireStore } from "../../hooks/useFireStore";

function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const { addDocument, response } = useFireStore("transactions");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(uid, name, amount);
    addDocument({ uid, name, amount });
  }

  // clear the form once an item has been added successfully.
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>add a transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>amount ($) =</span>
          <input
            type="number"
            // its going to be a string version of the number.
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>add transaction</button>
      </form>
    </>
  );
}

export default TransactionForm;
