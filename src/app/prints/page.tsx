import { ParallaxScrollDemo } from "@/components/parallaxGrid";
import { TextGenerateEffectDemo } from "@/components/textGenerate";
import Link from "next/link";

export default function PrintsPage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center font-sans bg-black ">
        <div className="container pt-96">
          <TextGenerateEffectDemo />
          <ParallaxScrollDemo />
        </div>
        <div>
          <Link href="/question" className="pb-36">
            <button className="px-8 py-3 rounded-3xl bg-[#B22234] text-6xl font-semibold text-[#F4EDE1] transition duration-200 transform hover:scale-95 hover:opacity-90">
              So...
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
