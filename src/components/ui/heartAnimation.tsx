import React from "react";

const HeartAnimation = ({ play = true }: { play: boolean }) => {
  if (!play) return null;
  return (
    <div className=" absolute   h-32 md:h-60 z-50 min-w-10 bottom-[100%] pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/heart-animation.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default HeartAnimation;
