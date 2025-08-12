'use client'

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and description */}
          <div className="flex-1 min-w-[250px]">
            <Image
              src="/images/white_logo.png"
              alt="A2SV logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed">
              Preparing Africa&apos;s top tech talent for global opportunities.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex-1 min-w-[150px] space-y-2">
            <h4 className="font-semibold pb-2 ">Solutions</h4>
            <p className='pb-2'>Student Training</p>
            <p>Corporate Partnership</p>
          </div>

          <div className="flex-1 min-w-[150px] space-y-2">
            <h4 className="font-semibold pb-2 ">Support</h4>
            <p className='pb-2'>Contact Us</p>
            <p>FAQ</p>
          </div>

          <div className="flex-1 min-w-[150px] space-y-2">
            <h4 className="font-semibold pb-2">Company</h4>
            <p className='pb-2'>About</p>
            <p>Blog</p>
          </div>

          <div className="flex-1 min-w-[150px] space-y-2">
            <h4 className="font-semibold pb-2">Legal</h4>
            <p className='pb-2 '>Privacy</p>
            <p>Terms</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-xs">&copy; 2023 A2SV. All rights reserved.</p>
      </div>
    </footer>
  );
}
