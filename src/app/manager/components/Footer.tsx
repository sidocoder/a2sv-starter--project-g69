import React from 'react';
import Image from 'next/image';


export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#222c3b',
        color: '#ccc',
        padding: '3rem 2rem',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Image
            src="images/a2sv-logo-white.png" 
            alt="A2SV logo"
            style={{ width: '120px', marginBottom: '1rem' }}
          />
          <p style={{ lineHeight: 1.5, color: '#aaa' }}>
  {"Preparing Africa's top tech talent for global opportunities."}
</p>

            
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>SOLUTIONS</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888' }}>
            <li>Student Training</li>
            <li>Corporate Partnership</li>
          </ul>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>SUPPORT</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888' }}>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>COMPANY</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888' }}>
            <li>About</li>
            <li>Blog</li>
          </ul>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ color: '#fff', marginBottom: '1rem' }}>LEGAL</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#888' }}>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <hr style={{ borderColor: '#444', margin: '2rem 0' }} />

      <div
        style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '13px',
          userSelect: 'none',
        }}
      >
        © 2023 A2SV. All rights reserved.
      </div>
    </footer>
  );
}
