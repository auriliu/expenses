//
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    login(email, password);
    reset();
  }

  function reset() {
    setEmail("");
    setPassword("");
  }

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>login</h2>
      <h4>demo acc: mario@mario.com // mario123</h4>
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
      {!isPending && <button className="btn">login</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
