import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { Search } from "lucide-react";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscibe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute w-screen p-2 md:px-20 py-2 bg-gradient-to-b from-black flex flex-col md:flex-row justify-between">
      <img className="w-46 mx-auto md:mx-0 z-10" src={LOGO} alt="logo" />
      {user && (
        <div className="flex justify-center items-center gap-5 z-10">
          {showGptSearch && <select className="p-4 bg-gray-800 text-white rounded-lg font-semibold" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="flex p-3 gap-2 text-white bg-red-600 rounded-lg font-semibold cursor-pointer hover:bg-rose-600/90"
            onClick={handleGptSearchClick}
          >
            
            {showGptSearch? (lang[langKey].homeButton) : <><Search strokeWidth={3} /> {lang[langKey].gptSearchButton} </>}
          </button>
          <img
            className="hidden md:inline-block w-12 h-12 rounded-md"
            src={user?.photoURL}
            alt="usericon"
          />
          <button
            onClick={handleSignOut}
            className=" p-3 text-white bg-red-600 rounded-lg font-semibold cursor-pointer hover:bg-rose-600/90"
          >
            {lang[langKey].signoutButton}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
