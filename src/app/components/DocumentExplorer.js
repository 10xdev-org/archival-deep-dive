"use client";

import { useState } from "react";
import BackButton from "./BackButton"; // Import BackButton
import ContentCard from "./ContentCard"; // Import ContentCard
import ContentViewer from "./ContentViewer"; // Import ContentViewer

const defaultFolderIconSrc = "./icons/app icons-05.svg";

export default function DocumentExplorer({ initialFolderStructure }) {
  const [currentFolder, setCurrentFolder] = useState(initialFolderStructure);
  const [path, setPath] = useState([initialFolderStructure.name]);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleFolderClick = (folder) => {
    setPath([...path, folder.name]);
    setCurrentFolder(folder);
  };

  const handleBreadcrumbClick = (index) => {
    const newPath = path.slice(0, index + 1);

    // Traverse back to the correct folder
    let folder = initialFolderStructure;
    for (let i = 1; i < newPath.length; i++) {
      folder = folder.folders.find((f) => f.name === newPath[i]);
    }

    setPath(newPath);
    setCurrentFolder(folder);
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const handleCloseViewer = () => {
    setSelectedContent(null);
  };

  const handleHomeClick = () => {
    setSelectedContent(null);
    handleBreadcrumbClick(0);
  };

  const handleBack = () => {
    if (path.length > 1) {
      const newPath = path.slice(0, -1);

      // Traverse back to the previous folder
      let folder = initialFolderStructure;
      for (let i = 1; i < newPath.length; i++) {
        folder = folder.folders.find((f) => f.name === newPath[i]);
      }

      setPath(newPath);
      setCurrentFolder(folder);
    }
  };

  return (
    <div className="min-h-screen h-full w-full p-12 relative">
      <div className="p-6 bg-gray-200 bg-opacity-50 backdrop-blur-3xl rounded-lg mx-6 mt-6 z-10 h-full">
        {/* Page Header */}
        <h1 className="text-left text-3xl font-semibold mb-6 text-gray-800">
          Archival Deep Dive
        </h1>

        {/* Breadcrumbs Navigation */}
        <nav className="mb-8 text-gray-600">
          <span
            onClick={() => {
              setPath([initialFolderStructure.name]);
              setCurrentFolder(initialFolderStructure);
            }}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Home
          </span>
          {path.slice(1).map((crumb, idx) => (
            <span
              key={idx}
              onClick={() => handleBreadcrumbClick(idx + 1)}
              className="cursor-pointer text-blue-600 hover:underline ml-2"
            >
              {" / "}
              {crumb}
            </span>
          ))}
        </nav>

        {/* Folder and File Grid */}
        <div className="grid-container max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Folders */}
            {currentFolder.folders &&
              currentFolder.folders.map((folder) => (
                <div
                  key={folder.name}
                  onClick={() => handleFolderClick(folder)}
                  className="flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-blue-200"
                >
                  <img
                    src={folder.thumbnail || defaultFolderIconSrc}
                    alt={folder.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <span className="mt-2 text-sm font-medium text-gray-700 truncate">
                    {folder.name}
                  </span>
                </div>
              ))}

            {/* Files */}
            {currentFolder.files &&
              currentFolder.files.map((file) => (
                <ContentCard
                  key={file.name}
                  name={file.name}
                  type={file.type}
                  src={file.src}
                  thumbnail={file.thumbnail}
                  handleClick={() => handleContentClick(file)}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Render ContentViewer if a file is selected */}
      {selectedContent && (
        <ContentViewer
          name={selectedContent.name}
          type={selectedContent.type}
          src={selectedContent.src}
          onClose={handleCloseViewer}
          onHome={handleHomeClick}
        />
      )}
      {path.length > 1 && (
        <BackButton
          onBack={selectedContent ? handleCloseViewer : handleBack}
          onHome={handleHomeClick}
        />
      )}
    </div>
  );
}
