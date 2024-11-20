import { Spotlight } from "../../components/ui/Spotlight";
import Link from "next/link";

export default function Congratz() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center font-sans bg-black">
        <Spotlight />
        <h1 className="text-7xl font-extrabold text-[#F4EDE1] mb-8">
          CONGRATULATIONS!
        </h1>
        <p className="text-3xl font-medium text-[#F4EDE1] mb-10">
          So now, I have something special prepared for you...
        </p>
        <Link href="/memories">
          <button className="px-8 py-3 rounded-3xl bg-[#B22234] text-6xl font-semibold text-[#F4EDE1] transition duration-200 transform hover:scale-95 hover:opacity-90">
            MUH
          </button>
        </Link>
      </div>
    </>
  );
}
