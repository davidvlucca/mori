import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import timelineData from "@/timeline.json"; // Import the JSON data

export function TimelineDemo() {
  return (
    <div className="w-full">
      <Timeline
        data={timelineData.map(
          (entry: {
            title: string;
            textContent: string[];
            images: string[];
          }) => ({
            title: entry.title,
            content: (
              <div>
                {entry.textContent.map((text, index) => (
                  <p
                    key={index}
                    className="text-[#F4EDE1] text-xs md:text-base font-normal mb-4"
                  >
                    {text}
                  </p>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {entry.images.map((src, idx) => {
                    // Check if the file is a video based on its extension
                    const isVideo =
                      src.endsWith(".MP4") ||
                      src.endsWith(".mp4") ||
                      src.endsWith(".mov") ||
                      src.endsWith(".MOV");

                    return isVideo ? (
                      <video
                        key={idx}
                        src={src}
                        controls
                        autoPlay={true}
                        muted={true}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        style={{ width: "500px", height: "500px" }} // Set video dimensions
                      />
                    ) : (
                      <Image
                        key={idx}
                        src={src}
                        alt={`Image ${idx + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "500px", height: "700px" }}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                      />
                    );
                  })}
                </div>
              </div>
            ),
          })
        )}
      />
    </div>
  );
}
