import DocumentExplorer from "./components/DocumentExplorer";
import Hero from "./components/Hero";
import folderTreeData from "/public/folderTree.json";

export default function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Hero
        videoSrc={"./background.mp4"}
        overlayOpts={{
          leftSize: { height: 0, width: 0 },
          rightSize: { height: 0, width: 0 },
        }}
      />

      {/* Main Content */}
      <DocumentExplorer initialFolderStructure={folderTreeData} />
    </div>
  );
}
