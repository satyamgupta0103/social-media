import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query allows us to create a QueryClient instance, which manages caching,
// background fetching, and state synchronization efficiently.
// The QueryClientProvider makes this client available throughout the app,
// enabling optimized data fetching and automatic state updates.
const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
