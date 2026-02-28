import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { router } from "./routes";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";

// Optional: sync from cookies if needed (already handled by persist)
// import { loadUserFromToken } from './redux/features/auth/authSlice';
// store.dispatch(loadUserFromToken());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
