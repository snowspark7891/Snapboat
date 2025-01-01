// import React from "react";
import ReactDom from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from './context/authcontext';
import { QueryProvider } from './lib/react-quary/QueryProvider';

ReactDom.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryProvider>
  </BrowserRouter>
);