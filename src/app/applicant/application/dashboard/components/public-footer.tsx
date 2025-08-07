import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-12 text-sm">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/A2SV.png"
              alt="A2SV Logo"
              width={100}
              height={100}
            />
          </div>
          <p className="text-gray-400">
            Preparing Africa's top tech talent for global opportunities.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-white mb-2">SOLUTIONS</h3>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Student Training
          </Link>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Corporate Partnership
          </Link>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-white mb-2">SUPPORT</h3>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Contact Us
          </Link>
          <Link href="#" className="block text-gray-400 hover:text-white">
            FAQ
          </Link>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-white mb-2">COMPANY</h3>
          <Link href="#" className="block text-gray-400 hover:text-white">
            About
          </Link>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Blog
          </Link>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-white mb-2">LEGAL</h3>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Privacy
          </Link>
          <Link href="#" className="block text-gray-400 hover:text-white">
            Terms
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p>&copy; {new Date().getFullYear()} A2SV. All rights reserved.</p>
      </div>
    </footer>
  );
}
