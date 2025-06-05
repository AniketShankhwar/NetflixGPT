
const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold text-white">{title}</h1>
      <p className="py-6 text-lg w-1/3 text-white">{overview}</p>
      <div className="flex gap-3 mt-3">
        <button className="flex items-center bg-white text-black p-4 px-14 text-xl rounded-lg cursor-pointer hover:bg-white/80">
          <span className="text-4xl mr-2">▶</span>
          <span className="text-xl">Play</span>
        </button>
        <button className="flex items-center bg-gray-400/50 text-white p-4 px-10 text-xl rounded-lg cursor-pointer hover:bg-gray-400/30">
          <span className="text-4xl mr-2">ⓘ</span>
          <span className="text-xl">More Info</span>
        </button>
      </div>
    </div>
  )
}

export default VideoTitle;