// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import { Header } from "~/components";

export default function App() {
  return (
    <Router root={Header}>
      <FileRoutes />
    </Router>
  );
}
