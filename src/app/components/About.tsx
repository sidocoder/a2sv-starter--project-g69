'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Built by Engineers, for Engineers
          </h2>
         <p className="text-gray-700 text-base leading-relaxed">
  {`A2SV is not just a program; it's a community. We're on a mission to identify Africa’s most brilliant minds
  and provide them with the resources, mentorship, and opportunities to solve humanity’s greatest challenges.`}
</p>

        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/about-image.png" 
            alt="Team working with sticky notes"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
