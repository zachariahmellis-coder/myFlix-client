// src/components/signup-view/signup-view.jsx
import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday || undefined,
    };

    fetch("https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          // CareerFoundry is fine with a generic message, but this helps debugging
          throw new Error(
            body.message ||
              (body.errors ? body.errors[0]?.msg : null) ||
              "Signup failed"
          );
        }
        return body;
      })
      .then(() => {
        alert("Signup successful! Please log in.");
        // Clear the form (cleaner than reload)
        setUsername("");
        setPassword("");
        setEmail("");
        setBirthday("");
      })
      .catch((e) => {
        alert(e.message || "Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>

      <button type="submit">Register</button>
    </form>
  );
};
