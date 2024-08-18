import Animation from "./components/Animation";
import Cursor from "./components/Cursor";

export default function Home() {
  return (
    <main className="cursor-none relative">
     <Cursor/>
     <div className="w-full h-[80vh]  bg-black flex justify-center items-center">
      
     </div>
     <Animation/>
     <div className="w-full h-screen bg-white flex justify-center items-center">
      
     </div>
    </main>
  );
}
