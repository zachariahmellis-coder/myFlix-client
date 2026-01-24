import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // existing login logic stays here
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* form fields go here */}
    </Form>
  );
};
