import {generatePath, Link} from "react-router";
import {ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import {Film} from "#shared/api/filmTypes.ts";
import {FilmCard} from "#entities/filmCard/index.ts";

interface FilmCardsListProps {
  films: Array<Film>
}

export const FilmCardsList = ({ films }: FilmCardsListProps) => {

  if(!films || !films.length) {
    return <p className={"text-3xl text-white text-center"}>Результатов не найдено, попробуйте изменить параметры поиска</p>
  }

  return <ul className={"flex flex-row flex-wrap gap-16 justify-between"}>
    {films.map((film) => {
      return <li className={"basis-48/100"} key={film.kinopoiskId}>
        <Link to={generatePath(ROUTE_PATHS.filmDetailed, {filmId: film.kinopoiskId.toString()})}>
          <FilmCard {...film} />
        </Link>
      </li>
    })}
  </ul>
}
