import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./contexts/ModalContext";
import { SearchProvider } from "./contexts/SearchContext";
import { SelectSelectionProvider } from "./contexts/SelectSelectionContext";
import { SelectArtistProvider } from "./contexts/SelectArtistContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <SearchProvider>
        <SelectSelectionProvider>
          <SelectArtistProvider>
            <App />
          </SelectArtistProvider>
        </SelectSelectionProvider>
      </SearchProvider>
    </ModalProvider>
  </React.StrictMode>
);
