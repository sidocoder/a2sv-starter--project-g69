'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Abel Tadesse',
    title: 'Software Engineer, Google',
    quote:
      '"A2SV completely changed the trajectory of my career. The training is intense, but the community and the opportunities are unparalleled. I’m now at my dream company, and I owe it all to A2SV."',
    // image: '/images/abel.png',
  },
  {
    name: 'Bethlehem Tadesse',
    title: 'Software Engineer, Amazon',
    quote:
      '"The problem-solving skills I learned at A2SV are invaluable. The mentors push you to be your best, and you’re surrounded by people who are just as passionate as you are."',
    // image: '/images/bethlehem.png',
  },
  {
    name: 'Caleb Alemayehu',
    title: 'Software Engineer, Palantir',
    quote:
      '"A2SV is more than a bootcamp. It’s a family that supports you long after you’ve graduated. The network you build here is for life."',
    // image: '/images/caleb.png',
  },
];

export default function Testimonials() {
  return (
    <section  id="Testimonials" className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          Hear from Our Alumni
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <p className="text-gray-700 text-sm mb-4">{t.quote}</p>
              <div className="flex items-center gap-3 mt-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
