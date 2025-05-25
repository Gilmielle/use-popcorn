import {useNavigate} from "react-router";
import {ROUTE_PATHS, SEARCH_INPUT_NAME} from "#shared/lib/constants/index.ts";
import {HeaderSearch} from "#features/headerSearch/index.ts";
import {StoreType} from "#app/providers/StoreProvider/model/store.ts";
import React, {useCallback, useContext} from "react";
import {StoreContext} from "#shared/config/storeContext.ts";
import {HeaderNavLinks} from "./HeaderNavLinks.tsx";

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
    <HeaderNavLinks />
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
