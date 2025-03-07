import {SequelOrPrequel, SimilarFilm} from "#shared/api/filmTypes.ts";
import {getFilmDisplayedName} from "#shared/lib/utils/index.ts";

type FilmCardSmallProps = SimilarFilm | SequelOrPrequel
export const FilmCardSmall = ({
  nameRu,
  nameEn,
  nameOriginal,
  posterUrlPreview,
}: FilmCardSmallProps) => {

  return <div className={"rounded-md bg-slate-600 p-16 shadow-md shadow-slate-700"}>
    <div className={"flex flex-col items-center gap-16 text-start"}>
      <div className={"rounded-md overflow-hidden aspect-[1/1.5] shrink-0"}>
        <img className={"object-cover w-100/100 h-100/100 object-center"} src={posterUrlPreview} width={204} height={306} alt={`"Постер для "${getFilmDisplayedName(nameRu, nameEn, nameOriginal)}`}/>
      </div>
      <div className={"flex flex-col gap-8 items-start"}>
        <p className={"text-xl mb-8"}>
          <span className={"font-bold text-xl"}>{getFilmDisplayedName(nameRu, nameEn, nameOriginal)}</span>
        </p>
      </div>
    </div>
  </div>
}
