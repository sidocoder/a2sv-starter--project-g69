import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
        <Link
          href="/applicant/application"
          className="text-gray-600 hover:text-gray-900"
        >
          Dashboard
        </Link>
      </nav>
      <div className="flex items-center space-x-4 text-sm">
        <Link
          href="/profile"
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          Your Profile
        </Link>
        <span className="text-gray-700">Applicant Name</span>
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          Logout
        </Link>
      </div>
    </header>
  );
}
