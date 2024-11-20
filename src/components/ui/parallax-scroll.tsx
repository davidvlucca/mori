"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  // Parallax animations for each column
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Divide images into three parts for grid
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn(
        "h-screen w-full items-start overflow-y-scroll no-scrollbar", // Added "no-scrollbar" class
        className
      )}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        {/* First Column */}
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="rounded-lg overflow-hidden"
            >
              <Image
                src={el}
                className="w-full h-auto object-cover rounded-lg"
                alt="thumbnail"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          ))}
        </div>

        {/* Second Column */}
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="rounded-lg overflow-hidden"
            >
              <Image
                src={el}
                className="w-full h-auto object-cover rounded-lg"
                alt="thumbnail"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          ))}
        </div>

        {/* Third Column */}
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="rounded-lg overflow-hidden"
            >
              <Image
                src={el}
                className="w-full h-auto object-cover rounded-lg"
                alt="thumbnail"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
