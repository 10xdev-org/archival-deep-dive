"use client";
import React, { useState } from "react";
import { Search, FileText, Video, User, ArrowRight } from "lucide-react"; // Added ArrowRight icon
import topicsData from "/public/topics.json"; // Adjust path if necessary
import OneTopic from "./OneTopic";

const Topics = ({ selectedTopic, handleTopicClick, topics }) => {
  const [initTopics, setInitTopics] = useState(topics);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the list of topics based on the search term
  const filteredTopics = initTopics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {" "}
      {/* Added overflow-hidden to prevent scrolling */}
      {/* Left Column: Geometrical Pattern and Text */}
      <div className="w-1/2 flex justify-start items-start overflow-y-auto">
        {" "}
        {/* Enable scrolling for the left column */}
        <div className="bg-white backdrop-blur-lg bg-opacity-60 shadow-lg w-full p-4 pr-0 m-0">
          {/* Header and Search Bar in line */}
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4 pr-4">
            <h1 className="text-gray-800 text-xl font-bold leading-snug">
              List of Topics
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a topic"
                value={searchTerm}
                onChange={handleSearch}
                className="w-64 p-2 pl-8 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="">
            {filteredTopics.map((topic) => (
              <div
                key={topic.name} // Use name as key
                onClick={() => handleTopicClick(topic)} // Handle click
                className={`flex items-center p-3 border-b border-gray-200 cursor-pointer transition-shadow duration-300 
                  ${
                    selectedTopic?.name === topic.name
                      ? "bg-gray-200"
                      : "bg-white"
                  }`} // Conditional background color for selected topic
              >
                {/* Name */}
                <h2 className="text-base mr-auto">{topic.name}</h2>

                {/* Videos tag */}
                <span className="bg-blue-100 text-blue-700 px-2  rounded-full text-sm font-medium mr-2">
                  <Video className="inline mr-1 w-4 h-4" />
                  {topic.videos.length} Videos
                </span>

                {/* Documents tag */}
                <span className="bg-purple-100 text-purple-700 px-2  rounded-full text-sm font-medium mr-2">
                  <FileText className="inline mr-1 w-4 h-4" />
                  {topic.documents.length} Docs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Column: Card with Search and List */}
      <div className="w-1/2 flex items-start justify-start">
        <OneTopic topic={selectedTopic} />
      </div>
    </div>
  );
};

export default Topics;
