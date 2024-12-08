import { FileText } from "lucide-react";

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

function DocumentCard({ doc, openDoc }) {
  const bgColor = doc.thumbnail
    ? `url(${doc.thumbnail})`
    : getColorFromName(doc.name);

  return (
    <div
      onClick={() => openDoc(doc)}
      className="inline-flex flex-col items-center gap-1 cursor-pointer group"
    >
      <div
        className="relative w-56 h-40 rounded-lg overflow-hidden"
        style={{
          backgroundImage: doc.thumbnail ? bgColor : undefined,
          backgroundColor: doc.thumbnail ? undefined : bgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background overlay with hover effect for darker hue */}
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition group-hover:bg-opacity-50"></div>

        {/* Document icon */}
        <div className="absolute top-2 right-2 text-white">
          <FileText size={24} />
        </div>

        {/* Document size */}
        <div className="absolute bottom-2 right-2 text-white text-xs">
          {doc.size}
        </div>
      </div>

      {/* Document name below the rectangle with hover effect */}
      <div className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-500 group-hover:underline">
        {doc.name}
      </div>
    </div>
  );
}

export default DocumentCard;
