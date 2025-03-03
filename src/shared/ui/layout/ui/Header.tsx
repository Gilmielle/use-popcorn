import {navList} from "../config";
import {NavLink} from "react-router";

export const Header = () => {
  return <header className={"header flex justify-between container"}>
    <nav className={"nav"}>
      <ul className={"nav__list flex gap-x-8"}>
        {navList.map((navItem, index) => {
          return <li className={"nav__item flex"} key={index}>
            <NavLink
              to={navItem.href}
              className={"nav__link p-8 text-white bg-blue-500 rounded-lg hover:bg-sky-700"}
            >
              {navItem.name}
            </NavLink>
          </li>
        })}
      </ul>
    </nav>
    <div id={"header-searchbar"}></div>
  </header>
}
