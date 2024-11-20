import { TimelineDemo } from "@/components/timeline";
import Link from "next/link";

export default function MemoriesPage() {
  return (
    <>
      <div className="bg-neutral-950">
        <TimelineDemo />
        <div className="p-10 flex flex-col items-center justify-center font-sans">
          <Link href="/prints">
            <button className="px-8 py-3 rounded-3xl bg-[#B22234] text-6xl font-semibold text-[#F4EDE1] transition duration-200 transform hover:scale-95 hover:opacity-90">
              NEXT PAGE BECAUSE THIS PAGE<br/> IS ALREADY TOO MUCH STUFF :)<br/>also<br/>muh
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
