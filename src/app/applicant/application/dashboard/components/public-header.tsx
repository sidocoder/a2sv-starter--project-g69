import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PublicHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:px-6">
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="A2SV Logo"
          width={100}
          height={100}
        />
      </div>
      <nav className="hidden space-x-6 text-sm font-medium md:flex">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          About
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          Success Stories
        </Link>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Apply Now
        </Button>
      </nav>
    </header>
  );
}
