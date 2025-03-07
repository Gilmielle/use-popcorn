import './styles/App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "#pages/Home.tsx";
import Profile from "#pages/Profile.tsx";
import FilmDetailed from "#pages/FilmDetailed.tsx";
import NotFound from "#pages/NotFound.tsx";
import {Layout} from "#shared/ui/layout/index.tsx";
import {API_URL, ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import {ApiClient} from "#shared/lib/services/ApiClient.ts";

new ApiClient(API_URL)

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.main} element={<Layout />} >
          <Route index element={<Home />} />
          <Route path={ROUTE_PATHS.profile} element={<Profile />} />
          <Route path={ROUTE_PATHS.filmDetailed} element={<FilmDetailed />} />
          <Route path={"*"} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
