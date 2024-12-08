"use client";

import Hero from "./Hero";

export default function Landing({ handleTopicClick, topics }) {
  return (
    <div className="relative h-screen">
      <Hero videoSrc={"/indian_parliament.mp4"} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-3xl font-bold mb-8">
          Select from the topic to learn more:
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {topics.map((topic) => (
            <div
              key={topic.name} // Ensure each topic has a unique key if available
              className="bg-blue-500 text-white p-6 rounded-full cursor-pointer"
              onClick={() => handleTopicClick(topic)}
            >
              {topic.name}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-5" />
    </div>
  );
}
