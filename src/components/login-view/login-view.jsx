import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const API_URL = "https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const payload = {
      Username: username.trim(),
      Password: password,
    };

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            data?.message ||
            data?.error ||
            "Invalid username or password";
          throw new Error(msg);
        }

        if (!data?.user || !data?.token) {
          throw new Error("Login response missing user/token.");
        }

        return data;
      })
      .then((data) => {
        onLoggedIn(data.user, data.token);
      })
      .catch((err) => {
        console.log("Login error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-3">Login</h2>

      {error ? (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      ) : null}

      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={5}
          placeholder="Enter username"
          autoComplete="username"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
          autoComplete="current-password"
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
