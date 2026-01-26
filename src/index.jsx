import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";

import { MainView } from "./components/main-view/main-view";
import "./index.scss";

const App = () => (
  <Container>
    <MainView />
  </Container>
);

createRoot(document.getElementById("root")).render(<App />);
