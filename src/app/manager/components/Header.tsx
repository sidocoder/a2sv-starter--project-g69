import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-300 flex items-center px-8 py-4">
      {/* Left side: logo */}
      <div className="flex items-center space-x-2 ml-8">
        <img src="/images/logo.png" alt="A2SV" width={100} height={75} className="h-8" />
      </div>

      {/* Center: Dashboard */}
      <div className="flex-grow text-center">
        <a href="#" className="text-sm text-gray-700 font-medium underline decoration-blue-600">
          Dashboard
        </a>
      </div>

      {/* Right side: nav */}
      <nav className="flex items-center space-x-8 text-sm text-gray-700 font-medium">
        <a href="#" className="text-blue-600 hover:underline">Your Profile</a>
        <span>Manager Name</span>
        <a href="#" className="hover:underline">Logout</a>
      </nav>
    </header>
  );
}
