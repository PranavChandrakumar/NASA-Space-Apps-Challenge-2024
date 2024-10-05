'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='sticky top-0 z-50 h-20 w-full flex items-center justify-between p-5 bg-slate-100/75 backdrop-blur-sm'>
      <div className='flex items-center'>
        <div>this is a Navbar</div>
        <div className='w-full flex items-center gap-x-3'>
          <Link href='/'>Home</Link>
          <Link href='/'>Foo</Link>
          <Link href='/'>Bar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
