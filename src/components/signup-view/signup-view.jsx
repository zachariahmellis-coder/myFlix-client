import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { API_URL } from "../../config";

export const SignupView = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const data = {
      Username: username.trim(),
      Password: password,
      Email: email.trim(),
      Birthday: birthday || undefined,
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => null);
        if (!res.ok) {
          const msg =
            payload?.message ||
            payload?.error ||
            payload?.errors?.[0]?.msg ||
            "Signup failed. Please try again.";
          throw new Error(msg);
        }
        return payload;
      })
      .then(() => {
        setSuccess("Signup successful! Redirecting to login…");
        setUsername("");
        setPassword("");
        setEmail("");
        setBirthday("");

        setTimeout(() => navigate("/", { replace: true }), 800);
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        setError(err.message || "Signup failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Sign Up</h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back to Login
        </Link>
      </div>

      {error ? (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      ) : null}

      {success ? (
        <Alert variant="success" className="mb-3">
          {success}
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
          placeholder="Username (min 5 chars)"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="Password (min 6 chars)"
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="name@example.com"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Sign Up"}
      </Button>
    </Form>
  );
};
