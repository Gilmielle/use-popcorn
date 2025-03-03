import { createContext } from "react";
import {useAppStore} from "#app/providers/StoreProvider/model/store.ts";

export const StoreContext = createContext<ReturnType<typeof useAppStore> | null>(null)
