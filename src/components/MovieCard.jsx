import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
  <div className="w-28 md:w-48">
    <img
      className="rounded-2xl"
      alt="Movie Card"
      src={IMG_CDN_URL + posterPath}
    />
  </div>
  );
};

export default MovieCard;
