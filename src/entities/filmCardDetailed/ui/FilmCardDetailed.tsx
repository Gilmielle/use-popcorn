import {Film, SequelOrPrequel, SimilarFilm} from "#shared/api/filmTypes.ts";
import {getFilmDisplayedName} from "#shared/lib/utils/index.ts";
import {getFilmDetailedData, getFilmStaffAdaptedList} from "../lib/index.ts";
import {ProfessionKeys, Staff} from "#shared/api/staffTypes.ts";
import {PROFESSIONS, ROUTE_PATHS} from "#shared/lib/constants/index.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import {generatePath, Link} from "react-router";
import {FilmCardSmall} from "#entities/filmCardSmall/index.ts";
import {Navigation, Pagination} from "swiper/modules";

interface FilmCardDetailedProps {
  film: Film,
  staff: Array<Staff>,
  sequelsAndPrequels: Array<SequelOrPrequel>,
  similars: Array<SimilarFilm>,
}

export const FilmCardDetailed = ({
  film,
  staff,
  sequelsAndPrequels,
  similars
}: FilmCardDetailedProps) => {
  const filmDataList = getFilmDetailedData(film)
  const staffAdaptedData = getFilmStaffAdaptedList(staff);

  return <div className={"rounded-md bg-zinc-800 p-48 shadow-md shadow-slate-700 text-white"}>
    <div className={"flex gap-56 text-start"}>
      <div className={"rounded-md overflow-hidden w-400 h-600 shrink-0"}>
        <img className={"object-cover w-100/100 h-100/100 object-center"} src={film.posterUrl} width={400} height={600} alt={`"Постер для "${getFilmDisplayedName(film.nameRu, film.nameEn, film.nameOriginal)}`}/>
      </div>
      <div className={"flex flex-col space-y-40 items-start 2xl:basis-70/100 xl:basis-60/100 md:basis-50/100 basis-100/100"}>
        <div className={"flex flex-col gap-16 items-start"}>
          <div className={"text-xl mb-40"}>
            <h1 className={"font-bold text-6xl mb-16"}>{getFilmDisplayedName(film.nameRu, film.nameEn, film.nameOriginal)}{!!film.year &&` (${film.year})`}</h1>
            {!!film.slogan && <p className={"text-3xl mb-16"}>
              {film.slogan}
            </p>}
            {(!!film.nameOriginal || !!film.nameEn) && <p>
              <span className={"text-lg font-light text-gray-400"}>{film.nameOriginal ? film.nameOriginal : film.nameEn}</span>
            </p>}
          </div>
          {!!film.description && <p className={"mb-24"}>
            <span className={"text-xl"}>{film.description}</span>
          </p>}
          <dl className={"flex flex-col gap-6 text-xl"}>
            {filmDataList.map((filmDataItem, index) => {
              return <div className={"flex flex-row gap-8"} key={index}>
                <dt>{filmDataItem.key}: </dt>
                <dd>{filmDataItem.value}</dd>
              </div>
            })}
          </dl>
        </div>

        <div className={"flex flex-col"}>
          <h2 className={"text-4xl font-bold mb-24"}>
            О фильме
          </h2>
          {/* TODO: потом можно переделать на ссылки на страницу с детальными данными по персонам */}
          <dl className={"flex flex-col gap-6 text-xl"}>
            {!!staffAdaptedData[ProfessionKeys.DIRECTOR]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.DIRECTOR][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.DIRECTOR].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.WRITER]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.WRITER][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.WRITER].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.PRODUCER]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.PRODUCER][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.PRODUCER].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.EDITOR]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.EDITOR][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.EDITOR].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.OPERATOR]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.OPERATOR][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.OPERATOR].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.COMPOSER]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.COMPOSER][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.COMPOSER].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.DESIGN]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.DESIGN][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.DESIGN].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}

            {!!staffAdaptedData[ProfessionKeys.ACTOR]?.length && <div className={"flex flex-row gap-8"}>
              <dt>{PROFESSIONS[ProfessionKeys.ACTOR][1]}:</dt>
              <dd>{staffAdaptedData[ProfessionKeys.ACTOR].slice(0, 15).map(person => person.nameRu).join(", ")}</dd>
            </div>}
          </dl>
        </div>

        {!!sequelsAndPrequels.length && <div className={"flex flex-col w-100/100"}>
          <h2 className={"text-4xl font-bold mb-24"}>
            Сиквелы, приквелы, ремейки
          </h2>
          <div className={"max-w-[1280px]"}>
            <Swiper
              className={"pb-[40px]"}
              spaceBetween={24}
              slidesPerView={4}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              {sequelsAndPrequels.map((filmItem, index) => {
                return <SwiperSlide key={index}>
                  <Link className={"flex h-100/100"} to={generatePath(ROUTE_PATHS.filmDetailed, {filmId: filmItem.filmId.toString()})}>
                    <FilmCardSmall {...filmItem} />
                  </Link>
                </SwiperSlide>
              })}
            </Swiper>
          </div>
        </div>}

        {!!similars.length && <div className={"flex flex-col mt-80 w-100/100"}>
          <h2 className={"text-4xl font-bold mb-24"}>
            Вам так же могут понравиться
          </h2>
          <div className={"max-w-[1280px]"}>
            <Swiper
              className={"pb-40"}
              spaceBetween={24}
              slidesPerView={4}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              {similars.map((filmItem, index) => {
                return <SwiperSlide key={index}>
                  <Link className={"flex h-100/100"} to={generatePath(ROUTE_PATHS.filmDetailed, {filmId: filmItem.filmId.toString()})}>
                    <FilmCardSmall {...filmItem} />
                  </Link>
                </SwiperSlide>
              })}
            </Swiper>
          </div>
        </div>}
      </div>
    </div>
  </div>
}
