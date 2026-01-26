import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onUserUpdated }) => {
  const [userData, setUserData] = useState(null);

  // form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // optional
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(""); // yyyy-mm-dd

  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user || !token) return;

    fetch(
      `https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users/${user.Username}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      })
      .then((data) => {
        setUserData(data);

        // initialize form fields from API
        setUsername(data.Username || "");
        setEmail(data.Email || "");
        setBirthday(data.Birthday ? data.Birthday.slice(0, 10) : "");
      })
      .catch((err) => console.error(err));
  }, [user, token]);

  const handleRemoveFavorite = (movieId) => {
    setMessage("");

    fetch(
      `https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove favorite");
        return res.json();
      })
      .then((updatedUser) => {
        setUserData(updatedUser);
        onUserUpdated(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Could not remove favorite movie.");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setIsSaving(true);

    // Only send Password if user typed one
    const updatedFields = {
      Username: username,
      Email: email,
      Birthday: birthday
    };
    if (password) updatedFields.Password = password;

    fetch(
      `https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const msg =
            errBody?.message ||
            errBody?.errors?.[0]?.msg ||
            "Failed to update profile";
          throw new Error(msg);
        }
        return res.json();
      })
      .then((updatedUser) => {
        setUserData(updatedUser);
        onUserUpdated(updatedUser);

        setPassword(""); // clear password field after save
        setMessage("Profile updated ✅");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message || "Update failed.");
      })
      .finally(() => setIsSaving(false));
  };

  const handleDeregister = () => {
    const ok = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!ok) return;

    fetch(
      `https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody?.message || "Failed to delete user");
        }
        // Your API returns { message: "User deleted" }
        return res.json().catch(() => ({}));
      })
      .then(() => {
        // logging out is handled by MainView via storage clear.
        // simplest approach: clear here too and hard-navigate to /login
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.replace("/login");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message || "Deregister failed.");
      });
  };

  if (!userData) return <div>Loading profile…</div>;

  const favoriteMovies = movies.filter((m) =>
    userData.FavoriteMovies?.includes(m._id)
  );

  return (
    <div>
      <h2 className="mb-3">Profile</h2>

      {message ? <p>{message}</p> : null}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="mb-3">Your info</Card.Title>

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="profileUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profilePassword">
              <Form.Label>Password (leave blank to keep current)</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Update Profile"}
              </Button>

              <Button variant="outline-danger" onClick={handleDeregister}>
                Deregister
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Favorite Movies</h4>

      {favoriteMovies.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie._id} md={4} className="mb-4">
              <MovieCard movie={movie} />
              <div className="d-grid mt-2">
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  Remove Favorite
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
