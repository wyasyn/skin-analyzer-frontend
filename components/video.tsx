const VideoHero = () => {
  return (
    <div className="w-full max-w-[150px] absolute top-3 right-3 md:-right-3 mx-auto rounded-2xl shadow-lg">
      <video
        src="/video-demo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
      />
    </div>
  );
};

export default VideoHero;
