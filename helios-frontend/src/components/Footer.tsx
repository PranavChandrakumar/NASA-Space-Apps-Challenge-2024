'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        padding: 15,
      }}
    >
      <div className='container mx-auto text-center'>
        <p>&copy; {new Date().getFullYear()} Helios. All rights reserved.</p>
        <p>
          Andrew De Rango | Hashim Bukhtiar | Hashir Imam | Marco Tan | Pranav
          Chandrakumar | Rafael Toameh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
