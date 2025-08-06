'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav style={{ backgroundColor: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb' }}>
      <div>
        <img src="images/logo.png" alt="A2SV" height={32} />
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/manager">Dashboard</Link>
        <Link href="/profile">Your Profile</Link>
        <span>Manager Name</span>
        <Link href="/logout">Logout</Link>
      </div>
    </nav>
  );
}
