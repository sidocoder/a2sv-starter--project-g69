'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center ml-12">
        <Image src="/images/logo.png" alt="A2SV logo" width={120} height={40} />
      </div>
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="#">The Journey</Link>
        <Link href="#">About</Link>
        <Link href="#">Testimonials</Link>
      </nav>
      <Link
        href="#"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold"
      >
        Apply Now
      </Link>
    </header>
  );
}
