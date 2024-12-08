import { FileText, Image, Video, Headphones } from "lucide-react";

// Array of pastel background colors
const pastelColors = [
  "#FFB3BA",
  "#FFDFBA",
  "#FFFFBA",
  "#BAFFC9",
  "#BAE1FF",
  "#D7BAFF",
  "#FFDFD3",
  "#F7B7A3",
  "#B3E5FF",
  "#B3FFE1",
];

// Function to determine color based on document name
const getColorFromName = (name) => {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return pastelColors[hash % pastelColors.length];
};

function ContentCard({ name, type, src, thumbnail, handleClick }) {
  const bgImage = thumbnail || (type === "image" ? src : undefined);
  const bgColor = getColorFromName(name);
  console.log({ bgImage, bgColor });

  // Determine the correct icon based on the type
  const getIcon = () => {
    switch (type) {
      case "document":
        return <FileText size={36} />;
      case "image":
        return <Image size={36} />;
      case "audio":
        return <Headphones size={36} />;
      case "video":
        return <Video size={36} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => handleClick({ name, type, src, thumbnail })}
      className="inline-flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div
        className="relative w-48 h-36 md:w-56 md:h-40 rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage: bgImage ? `url(${encodeURI(bgImage)})` : undefined,
          backgroundColor: bgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition group-hover:bg-opacity-50"></div>

        {/* Centered icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {!bgImage && getIcon()}
        </div>

        {/* Name at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 text-center text-white text-sm font-medium bg-black bg-opacity-60 py-1 px-2 truncate">
          {name}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
