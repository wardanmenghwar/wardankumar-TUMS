
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-black px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
    {children}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
  </Link>
);

const DropdownLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors">
    {children}
  </Link>
);

const Navbar = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 text-white border-b border-blue-800 bg-blue-950 px-8">
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              <span>(+92)22 3409562-67</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              <span>info@ums.edu.pk</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link href="/publications" className="hover:text-orange-400">Publications</Link>
            <Link href="/alumni" className="hover:text-orange-400">Alumni</Link>
            <Link href="/apply" className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600">Apply Now</Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4 px-8">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="The University Of Modern Sciences" 
              width={250} 
              height={60} 
              className="h-12 w-auto"
            />
          </div>
          <nav className="flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            
            <div onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave} className="relative group">
              <button className="text-black px-3 py-2 text-sm font-medium transition-all duration-300 relative flex items-center">
                About Us
                <svg className="w-3 h-3 ml-1 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </button>
              {dropdown === 'about' && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <DropdownLink href="/about">About TUMS</DropdownLink>
                  <DropdownLink href="/chancellor-message">Chancellor's Message</DropdownLink>
                  <DropdownLink href="/vice-chancellor-message">Vice Chancellor's Message</DropdownLink>
                </div>
              )}
            </div>

            <NavLink href="/oric">ORIC</NavLink>
            <NavLink href="/qec">QEC</NavLink>

            <div onMouseEnter={() => handleMouseEnter('admissions')} onMouseLeave={handleMouseLeave} className="relative group">
              <button className="text-black px-3 py-2 text-sm font-medium transition-all duration-300 relative flex items-center">
                Admission
                <svg className="w-3 h-3 ml-1 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </button>
              {dropdown === 'admissions' && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <DropdownLink href="/admissions/undergraduate">Undergraduate</DropdownLink>
                  <DropdownLink href="/admissions/graduate">Graduate</DropdownLink>
                  <DropdownLink href="/admissions/fee-structure">Fee Structure</DropdownLink>
                </div>
              )}
            </div>

            <div onMouseEnter={() => handleMouseEnter('programs')} onMouseLeave={handleMouseLeave} className="relative group">
              <button className="text-black px-3 py-2 text-sm font-medium transition-all duration-300 relative flex items-center">
                Program
                <svg className="w-3 h-3 ml-1 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </button>
              {dropdown === 'programs' && (
                <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg">
                  <DropdownLink href="/programs/medical">Medical Programs</DropdownLink>
                  <DropdownLink href="/programs/nursing">Nursing Programs</DropdownLink>
                  <DropdownLink href="/programs/pharmacy">Pharmacy Programs</DropdownLink>
                  <DropdownLink href="/programs/engineering">Engineering Programs</DropdownLink>
                </div>
              )}
            </div>

            <div onMouseEnter={() => handleMouseEnter('faculties')} onMouseLeave={handleMouseLeave} className="relative group">
              <button className="text-black px-3 py-2 text-sm font-medium transition-all duration-300 relative flex items-center">
                Faculties
                <svg className="w-3 h-3 ml-1 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
              </button>
              {dropdown === 'faculties' && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <DropdownLink href="/faculties/medical">Medical Faculty</DropdownLink>
                  <DropdownLink href="/faculties/nursing">Nursing Faculty</DropdownLink>
                  <DropdownLink href="/faculties/pharmacy">Pharmacy Faculty</DropdownLink>
                  <DropdownLink href="/faculties/engineering">Engineering Faculty</DropdownLink>
                </div>
              )}
            </div>

            <NavLink href="/examination-result">Examination Result</NavLink>
            <NavLink href="/journal">Journal</NavLink>
            <NavLink href="/careers">Careers</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
