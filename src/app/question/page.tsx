"use client"

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [buttonStyle, setButtonStyle] = useState<{
    left: string;
    top: string;
    position: "relative" | "absolute";
  }>({
    left: "0",
    top: "0",
    position: "relative", // Initially relative for both buttons to appear side by side
  });

  const handleMouseEnter = () => {
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set boundaries for the button's movement
    const buttonWidth = 100; // Estimated button width
    const buttonHeight = 50; // Estimated button height

    const x = Math.random() * (viewportWidth - buttonWidth); // Ensure it doesn't overflow horizontally
    const y = Math.random() * (viewportHeight - buttonHeight); // Ensure it doesn't overflow vertically

    setButtonStyle({
      left: `${x}px`,
      top: `${y}px`,
      position: "absolute", // Change to absolute for random positioning after hover
    });
  };



  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-500 relative overflow-hidden">
      <div className="text-center">
        <h3 className="text-white font-bold text-xl mb-6">
          Do you wanna be my girlfriend? :)
        </h3>
        <div className="inline-flex gap-4">
          <Link href="/yay">
            <button className="px-4 py-2 bg-white text-black font-bold rounded-lg cursor-pointer">
              Yes
            </button>
          </Link>
          <button
            onMouseEnter={handleMouseEnter}
            className="px-4 py-2 bg-white text-black font-bold rounded-lg cursor-pointer"
            style={{
              left: buttonStyle.left,
              top: buttonStyle.top,
              position: buttonStyle.position,
              transition: "all 0.2s ease",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
