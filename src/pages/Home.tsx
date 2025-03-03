import {FilmsList} from "#widgets/filmsList/ui/FilmsList.tsx";


function Home() {

  return <section>
    <h1 className={"text-5xl text-white mb-40"}>Список фильмов</h1>
    <FilmsList />
  </section>
}

export default Home
