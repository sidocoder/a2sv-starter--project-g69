'use client';

import Image from 'next/image';

export default function Partners() {
  return (
    <section className="flex justify-center gap-10 py-12 bg-gray-50">
      <Image src="/images/google-logo.png" alt="Google" width={100} height={40} />
      <Image src="/images/amazon-logo.png" alt="Amazon" width={120} height={40} />
    </section>
  );
}
