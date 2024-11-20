"use client"

import { TextGenerateEffect } from "../../components/ui/text-generate-effect";

const words = `During the time we talked, there was so many gems that some sadly I lost but many I printed and have it for eternity, so I decided to remind you and myself of some of them`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
