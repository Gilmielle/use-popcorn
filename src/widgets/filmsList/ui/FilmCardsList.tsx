import {generatePath, Link} from "react-router";
import {routePaths} from "#shared/lib/constants/index.ts";
import {Film} from "#shared/api/filmsList.ts";
import {FilmCard} from "#entities/filmCard/index.ts";

interface FilmCardsListProps {
  films: Array<Film>
}

export const FilmCardsList = ({ films }: FilmCardsListProps) => {

  return <>
    {!!films && !!films?.length && <ul className={"flex flex-row flex-wrap gap-16 justify-between"}>
      {films.map((film) => {
        return <li className={"basis-48/100"} key={film.kinopoiskId}>
          <Link to={generatePath(routePaths.filmDetailed, {filmId: film.kinopoiskId.toString()})}>
            <FilmCard {...film} />
          </Link>
        </li>
      })}
    </ul>}
    {(!films || !films.length) && <p className={"text-3xl underline"}>Films list is empty</p>}
  </>
}
