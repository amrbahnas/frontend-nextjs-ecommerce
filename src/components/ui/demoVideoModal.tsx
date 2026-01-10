"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import useUserStore from "@/store/useUserStore";

const YOUTUBE_VIDEO_ID = "cTiRmD5zm_c";

const DemoVideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { demoVideoSeen, setDemoVideoSeen } = useUserStore();

  useEffect(() => {
    // Check if the user has already seen the demo modal
    if (demoVideoSeen) return;

    // Handler function - stored in variable so we can remove it
    const handleScroll = () => {
      setIsOpen(true);
      // Remove listener after first scroll
      window.removeEventListener("scroll", handleScroll);
    };

    // Use window for scroll events (more reliable)
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [demoVideoSeen]);

  const handleClose = () => {
    setIsOpen(false);
    setDemoVideoSeen(true);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={900}
      centered
      destroyOnClose
      styles={{
        body: {
          padding: 0,
        },
        wrapper: {},
        mask: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
      className="demo-video-modal"
    >
      <div className="relative">
        {/* Header Section */}
        <div className="flex gap-2  mb-4">
          <span className="text-2xl md:text-3xl font-bold">🎬</span>
          <div className="flex flex-col ">
            <h2 className="text-2xl md:text-3xl font-bold  tracking-tight">
              Fast Demo
            </h2>
            <p className=" text-sm text-gray-500 ">
              Watch this quick overview to discover what our store has to offer!
            </p>
          </div>
        </div>

        {/* Video Container */}
        <div className="px-4 pb-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {/* Video Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl blur opacity-30" />

            <div className="relative  bg-black rounded-xl overflow-hidden w-full h-[250px] sm:h-[500px]">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Store Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/5 border-t border-white/10">
          <p className="text-white/50 text-xs">
            You can always find this demo in our Footer section
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
          >
            Start Shopping →
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DemoVideoModal;
