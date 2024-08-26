import Animation from "./components/Animation";
import Animation2 from "./components/Animation2";
import Cursor from "./components/Cursor";
import Menu from "./components/Menu";

export default function Home() {
  return (
    <main className="cursor-none relative">
     <Cursor/>
     <Animation2/>
     <Animation/>
    </main>
  );
}
