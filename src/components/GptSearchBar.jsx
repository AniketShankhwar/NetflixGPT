import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import genAI from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&page=1', API_OPTIONS);

    const json = await data.json()
    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Inception, Tenet, The Flash, Arrival, Justice League";

    const gptResults = await model.generateContent(gptQuery);
    const response = await gptResults.response;
    const text = response.text();

    const gptMoviesName = text.split(", ");

    const promiseArray = gptMoviesName.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMoviesName, movieResults: tmdbResults}));
  };

  return (
    <div className="pt-[5%] flex justify-center">
      <form
        className="w-1/2 bg-black/50 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="py-4 px-4 m-4 bg-red-600 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
