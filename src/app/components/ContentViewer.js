import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import { ChevronsLeft } from "lucide-react";
import BackButton from "./BackButton";

const ContentViewer = ({ name, type, src, onClose, onHome }) => {
  const { setScreensaverDisabled } = useScreensaverContext();

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Clean up on component unmount: re-enable screensaver and revoke object URL
    return () => {
      setScreensaverDisabled(false);
    };
  }, [src, setScreensaverDisabled]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <div
          className="flex-grow overflow-hidden flex justify-center items-center" // Apply flexbox centering
          style={{ maxHeight: "calc(100vh)" }}
        >
          {type === "document" ? (
            <embed
              src={src}
              type="application/pdf"
              className="w-full h-full"
              style={{ border: "none" }}
            />
          ) : type === "image" ? (
            <img
              src={src}
              alt={name}
              className="w-full h-full object-contain"
            />
          ) : type === "audio" ? (
            <audio controls className="w-full max-w-lg" autoPlay>
              {" "}
              {/* Center audio and limit width */}
              <source src={src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : type === "video" ? (
            <video controls className="w-full" autoPlay>
              <source src={src} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          ) : (
            <p>Unsupported file type</p>
          )}
        </div>
      </div>
      <BackButton onBack={onClose} onHome={onHome} />
    </Modal>
  );
};

export default ContentViewer;
