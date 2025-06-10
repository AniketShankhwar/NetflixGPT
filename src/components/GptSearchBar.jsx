import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";


const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[5%] flex justify-center">
      <form className="w-1/2 bg-black/50 grid grid-cols-12 rounded-lg">
        <input
          type="text"
          className="p-4 m-4 bg-white col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button className="py-4 px-4 m-4 bg-red-600 text-white rounded-lg col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
