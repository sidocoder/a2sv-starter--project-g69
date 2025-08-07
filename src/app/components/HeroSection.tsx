'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[360px] md:h-[440px] lg:h-[300px] flex items-center justify-center text-white text-center">
      <Image
        src="/images/hero-image.png"
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className="z-0 brightness-50"
        priority
      />
      <div className="z-10 max-w-2xl px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
          Forge Your Future in Tech
        </h1>
        <p className="text-sm md:text-base lg:text-lg mb-5">
          Join an elite community of Africa’s brightest minds, and get fast-tracked to a
          software engineering career at the world’s leading tech companies.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md font-semibold text-sm md:text-base">
          Start Your Application
        </button>
      </div>
    </section>
  );
}
