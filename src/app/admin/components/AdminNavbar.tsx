'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()

  const navItems = [
    {label: 'Dashboard', paths: ['/admin']},
    {label: 'Users', paths: ['/admin/adminusers','/admin/adminusers/create'],
      dynamicStartsWith: '/admin/adminusers/edit'},

    {label: 'Cycles', paths: ['/admin/admincycles', '/admin/admincycles/create'] },
    {label: 'Analytics', paths: ['/admin/adminanalytics'] } ]

  const profileItems = [
    { label: 'Your Profile', path: '/profile' },
    { label: 'Admin User', path: '/admin' },
    { label: 'Logout', path: '/auth/login' }
  ]

  type NavItem = {
    label: string;
    paths: string[];
    dynamicStartsWith?: string;
  };

  const isActive = (item: NavItem) => {
    if (item.paths.some((path: string) => pathname === path)) return true
    if (item.dynamicStartsWith && pathname && pathname.startsWith(item.dynamicStartsWith)) return true
    return false
  }

  return (
    <nav className="flex justify-between items-center bg-white font-semibold text-gray-500 p-4 shadow-md">
      <div className="pl-10 ml-10">
        <img src="/images/logo.png" alt="logo" className="h-7 w-26" />
      </div>

      <ul className="flex gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.paths[0]}
              className={`pb-1 ${
                isActive(item)
                  ? 'text-black border-b-2 border-blue-700'
                  : 'hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-6 pr-15">
        {profileItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`pb-1 ${
              item.label === 'Your Profile'
                ? 'text-blue-600 hover:text-gray-500'
                : pathname === item.path
                ? 'text-black border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav
