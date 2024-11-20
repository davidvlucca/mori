import BreakoutGame from "./game/page";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black font-sans">
      <BreakoutGame />
    </div>
  );
}
