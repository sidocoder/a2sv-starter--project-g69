import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Apply = () => {
  return (
    <>
      <div className="bg-indigo-700 h-60 flex items-center justify-center">
        <div className="text-center text-white flex-col">
          <h1 className="font-bold text-4xl mb-2">Ready to change your life?</h1>
          <p className='mb-4'>The next application cycle is now open. Take the first step towards your dream career.</p>
          <Link
        href="#"
        className="bg-white text-indigo-700  px-5 py-2 rounded-md font-semibold"
      >
        Apply Now
      </Link>
       
         
       </div>
      </div>
       
    </>
  );
};

export default Apply;
