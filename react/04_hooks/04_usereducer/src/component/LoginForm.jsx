import { useState } from "react";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields required");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login Success");
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />

      {error && <p>{error}</p>}

      <button>
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm;