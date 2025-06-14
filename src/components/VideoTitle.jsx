const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video md:pt-[30%] lg:pt-[20%] pt-[55%] pb-40 md:pb-0 px-6 md:px-20 absolute bg-gradient-to-r from-black">
      <h1 className="text-lg md:text-3xl lg:text-6xl font-bold text-white">
        {title}
      </h1>
      <p className="hidden lg:inline-block py-6 text-lg w-2/4 text-white">
        {overview}
      </p>
      <div className="flex gap-3 mt-3">
        <button className="flex items-center bg-white text-black p-2 px-7 md:py-4 md:px-8 lg:p-4 lg:px-14 text-xl rounded-lg cursor-pointer hover:bg-white/80">
          <span className="text-xl md:text-2xl lg:text-4xl mr-2">▶</span>
          <span className="text-sm md:text-xl">Play</span>
        </button>
        <button className="flex items-center bg-gray-400/50 text-white p-2 lg:p-4 lg:px-10 text-xl rounded-lg cursor-pointer hover:bg-gray-400/30">
          <span className="text-xl md:text-3xl lg:text-4xl mr-2">ⓘ</span>
          <span className="text-sm md:text-xl">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
