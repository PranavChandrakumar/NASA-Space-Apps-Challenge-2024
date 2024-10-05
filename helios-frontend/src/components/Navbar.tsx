'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className='sticky top-0 z-50 h-20 w-full flex items-center justify-between p-5 bg-slate-100/75 backdrop-blur-sm'>
      <div className='flex items-center'>
        <div>HELIOS.</div>
        <div className='w-full flex items-center gap-x-3' style={{marginLeft: '20px'}}>
          <p>Want to detect surface reflectance?</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
