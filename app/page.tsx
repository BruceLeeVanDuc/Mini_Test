import Sidebar from "../components/Sidebar";
import VideoFeed from "../components/VideoFeed";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <Sidebar />
      <div className="h-full md:ml-60">
        <VideoFeed />
      </div>
    </main>
  );
}
