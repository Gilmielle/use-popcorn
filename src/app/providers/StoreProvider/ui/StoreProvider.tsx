import {StoreContext} from "#shared/config/storeContext.ts";
import {useAppStore} from "../model/store.ts";
import React from "react";

interface storeProviderProps {
  children: React.ReactNode,
}

export const StoreProvider = ({ children }: storeProviderProps) => {
  const store = useAppStore();

  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
}
