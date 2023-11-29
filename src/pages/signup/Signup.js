//
import { useSignup } from "../../hooks/useSignup";

import styles from "./Signup.module.css";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    //calling signup that connects to firebase to register a user.
    signup(email, password, displayName);

    reset(); //reset AFTER a successful signup.
  }

  function reset() {
    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>signup</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button className="btn">signup</button>}
      {isPending && (
        <button className="btn" disabled>
          loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup;
