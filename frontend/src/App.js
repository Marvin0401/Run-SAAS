import React, { useEffect } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

import store, { persistor } from "@redux/store";

import { BrowserRouter } from "react-router-dom";

import ROUTES, { RenderRoutes } from "./routes";

import AppRedirect from "@components/app-redirect/app-redirect.component";
import ErrorPopup from "@components/error-popup/error-popup.component";
import { NotificationPopUpProvider } from "@components/notification-pop-up/notification-pop-up.component";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { HelmetProvider, Helmet } from "react-helmet-async";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import "cropperjs/dist/cropper.css";

import GlobalStyle from "@components/global-style/global-style.component";
import styles from "@styles/style.scss";

const App = () => {
  const purge = async () => {
    await persistor.purge();

    persistor.persist();
  };

  useEffect(() => {
    const shouldPersist = localStorage.getItem("SHOULD_PERSIST") === "persist";

    if (shouldPersist) {
      persistor.persist();
    } else {
      purge();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <NotificationPopUpProvider>
            <HelmetProvider>
              <GlobalStyle />
              <Helmet>
                <style>{styles}</style>
              </Helmet>
              <BrowserRouter>
                <ErrorPopup />
                <AppRedirect />
                <RenderRoutes routes={ROUTES} />
              </BrowserRouter>
            </HelmetProvider>
          </NotificationPopUpProvider>
        </DndProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          closeButton={false}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
