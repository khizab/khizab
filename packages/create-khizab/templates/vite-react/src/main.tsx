import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { KhizabProvider } from "khizab";

import App from "./App.tsx";
import { config } from "./khizab.ts";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KhizabProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </KhizabProvider>
  </React.StrictMode>,
);
