// components/DocumentViewer.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary

const DocumentViewer = ({ document, onClose }) => {
  const { setScreensaverDisabled } = useScreensaverContext();

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Clean up on component unmount: re-enable screensaver and revoke object URL
    return () => {
      setScreensaverDisabled(false);
    };
  }, [document, setScreensaverDisabled]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold p-4 h-[50px]">{document.name}</h2>
        <div
          className="flex-grow overflow-hidden"
          style={{ maxHeight: "calc(100vh - 50px)" }}
        >
          {document.type === "pdf" ? (
            <iframe
              src={document.path}
              className="w-full h-full"
              title={document.name}
            />
          ) : (
            <img
              src={fileContent}
              alt={document.name}
              className="w-full h-auto object-contain"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DocumentViewer;
