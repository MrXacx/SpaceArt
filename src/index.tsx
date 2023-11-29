import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./contexts/ModalContext";
import { SearchProvider } from "./contexts/SearchContext";
import { SelectSelectionProvider } from "./contexts/SelectSelectionContext";
import { SelectArtistProvider } from "./contexts/SelectArtistContext";
import { SelectAgreementProvider } from "./contexts/SelectAgreement";
<<<<<<< HEAD
import { HideProvider } from "./contexts/HideContext";
=======
>>>>>>> main

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <HideProvider>
      <ModalProvider>
        <SearchProvider>
          <SelectSelectionProvider>
            <SelectAgreementProvider>
              <SelectArtistProvider>
                <App />
              </SelectArtistProvider>
            </SelectAgreementProvider>
          </SelectSelectionProvider>
        </SearchProvider>
      </ModalProvider>
    </HideProvider>
=======
    <ModalProvider>
      <SearchProvider>
        <SelectSelectionProvider>
          <SelectAgreementProvider>
            <SelectArtistProvider>
              <App />
            </SelectArtistProvider>
          </SelectAgreementProvider>
        </SelectSelectionProvider>
      </SearchProvider>
    </ModalProvider>
>>>>>>> main
  </React.StrictMode>
);
