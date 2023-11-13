import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { NoticeContextProvider } from "./NotificationContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NoticeContextProvider>
        <App />
      </NoticeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
