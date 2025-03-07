import {navList} from "../config";
import {NavLink, useNavigate} from "react-router";
import {ROUTE_PATHS, SEARCH_INPUT_NAME} from "#shared/lib/constants/index.ts";
import {HeaderSearch} from "#features/headerSearch/index.ts";
import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import {useCallback, useContext} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";

export const Header = () => {
  const store: StoreType = useContext(StoreContext);
  const {
    filterParams,
    setFilterParams,
  } = store;
  const navigate = useNavigate();

  const handleSearchSubmit = useCallback((value, name) => {
    setFilterParams({
      [name]: value,
    })
    navigate(ROUTE_PATHS.main)
  }, [navigate, setFilterParams])

  return <header className={"header flex justify-between items-center container"}>
    <nav className={"nav"}>
      <ul className={"nav__list flex gap-x-8"}>
        {navList.map((navItem, index) => {
          return <li className={"nav__item flex"} key={index}>
            <NavLink
              to={navItem.href}
              className={"nav__link py-12 px-16 text-white bg-blue-500 rounded-lg hover:bg-sky-700"}
            >
              {navItem.name}
            </NavLink>
          </li>
        })}
      </ul>
    </nav>
    <div id={"header-searchbar"} className={"mx-auto"}>
      <HeaderSearch
        name={SEARCH_INPUT_NAME}
        initialValue={filterParams.keyword ? filterParams.keyword : ""}
        onSubmit={handleSearchSubmit}
        placeholder={"Введите название фильма"}
      />
    </div>
  </header>
}
