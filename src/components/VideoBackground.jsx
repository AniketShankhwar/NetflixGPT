import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer({ movieId });

  return (
    <div className="w-screen pt-[30%] bg-black md:pt-0">
      <iframe
        className="w-screen aspect-video"
        src={
          `https://www.youtube.com/embed/${trailerVideo?.key}` +
          `?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}`
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
