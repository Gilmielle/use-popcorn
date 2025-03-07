import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import App from "./App.tsx";
import {StoreProvider} from "#app/providers/StoreProvider/index.ts";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  // </StrictMode>,
)
