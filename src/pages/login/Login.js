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
      <label>
        <span>email: mario@mario.com</span>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password: mario123</span>
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
