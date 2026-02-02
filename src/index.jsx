import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MainView } from "./components/main-view/main-view";
import { MovieView } from "./components/movie-view/movie-view";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <Container>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/movies/:movieId" element={<MovieView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<App />);
