"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";

interface ReduxProviderInterface {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderInterface) {
  if (typeof window !== "undefined")
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
}
