import {Outlet} from "react-router";
import {Header} from "./Header.tsx";
import "../styles.css";

export const Layout = () => {
  return <div className={"layout flex flex-col min-h-dvh bg-gray-500"}>
    <div className={"layout__header bg-gray-800"}>
      <Header />
    </div>
    <main className={"layout__main grow-1 container shrink-0"}>
      <Outlet />
    </main>
    <div className={"layout__footer bg-gray-600 text-white py-16"}>
      <footer className={"container"}>
        Footer
      </footer>
    </div>
  </div>
}
