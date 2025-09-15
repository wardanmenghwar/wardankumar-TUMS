'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-6 h-6 bg-orange-500 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
        mixBlendMode: 'difference'
      }}
    />
  );
};

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { src: '/IT_resource.jfif', alt: 'IT Resource Center', title: 'IT Resource Center' },
    { src: '/auditorium.png', alt: 'University Auditorium', title: 'University Auditorium' },
    { src: '/convocation.jpeg', alt: 'Convocation Ceremony', title: 'Convocation Ceremony' },
    { src: '/maincampus.png', alt: 'Main Campus', title: 'Main Campus' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            onLoad={() => console.log(`✓ Image loaded: ${slide.src}`)}
            onError={(e) => {
              console.error(`✗ Failed to load: ${slide.src}`);
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
            style={{ display: 'none' }}
          >
            <div className="text-white text-center">
              <h3 className="text-4xl font-bold mb-4">{slide.title}</h3>
              <p className="text-lg">Image failed to load</p>
              <p className="text-sm mt-2">Path: {slide.src}</p>
            </div>
          </div>
          
          {/* Image Title Overlay */}
          <div className="absolute bottom-4 right-4 z-10">
            <h2 className="text-2xl font-bold text-white shadow-text bg-black bg-opacity-50 px-4 py-2 rounded">{slide.title}</h2>
          </div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20 text-xl"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20 text-xl"
      >
        &#8250;
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    animatedSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />

      {/* Slideshow Section */}
      <section>
        <Slideshow />
      </section>

      {/* Admissions and Colleges Section */}
      <section className="py-12 bg-blue-950">
        <div className="container mx-auto px-8">
          <div className="flex justify-center items-center space-x-6 overflow-x-auto">
            {/* Undergraduate Admissions */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-blue-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">Undergraduate<br/>Admissions</h3>
            </div>

            {/* Graduate Admissions */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-green-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">Graduate<br/>Admissions</h3>
            </div>

            {/* Virtual Campus */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-purple-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">Virtual<br/>Campus</h3>
            </div>

            {/* Indus Medical College */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-red-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-red-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">Medical<br/>College</h3>
            </div>

            {/* Indus College of Nursing */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-teal-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-teal-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">College of<br/>Nursing</h3>
            </div>

            {/* Indus College of Pharmacy */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-orange-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">College of<br/>Pharmacy</h3>
            </div>

            {/* Indus College of Engineering */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-indigo-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">College of<br/>Engineering</h3>
            </div>

            {/* Academic Programs */}
            <div className="text-center group flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-pink-100 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center group-hover:bg-pink-200 group-hover:scale-110 transition-all duration-300 transform">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-orange-400 transition duration-300 whitespace-nowrap">Academic<br/>Programs</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About TUMS Section - Based on Screenshot */}
      <section className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 overflow-hidden animate-on-scroll" style={{height: '350px'}}>
        <div className="mx-auto relative z-10 h-full flex items-center" style={{maxWidth: '1350px', padding: '0 40px'}}>
          
          {/* Left Side - Content */}
          <div className="w-full lg:w-2/3 space-y-6 animate-slide-in-left">
            
            {/* Title */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">About TUMS</h2>
              <div className="w-80 h-0.5 bg-white"></div>
            </div>
            
            {/* Tagline */}
            <div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">
                GATEWAY TO A BRIGHTER FUTURE
              </h3>
              <h4 className="text-sm font-medium text-white uppercase mb-4">
                TO PREPARE GRADUATES IN THE FIELD OF MEDICINE, AS THE MOST COMPETENT DOCTORS ABLE TO SERVE THE POPULATION
              </h4>
            </div>
            
            {/* Main Content */}
            <div className="text-white">
              <p className="text-sm leading-relaxed max-w-2xl">
                The prime objective of University Of Modern Sciences Tando Muhammad Khan is to provide Quality Medical Education and caring for ailing humanity through the Quality Health Delivery System. To prepare the Medical Graduates in the field of Medicine as most competent learned doctors, able to serve the population
              </p>
            </div>
            
            {/* Read More Button */}
            <div className="pt-2">
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                onClick={() => window.location.reload()}
              >
                Read More
              </button>
            </div>
            
          </div>
          
          {/* Right Side - Hospital Image */}
          <div className="hidden lg:block w-1/3 relative animate-slide-in-right">
            <div className="relative h-full overflow-hidden">
              <img 
                src="/maincampus.png" 
                alt="University Medical College Hospital" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent"></div>
              
              {/* Orange decorative circle */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500 rounded-full opacity-80"></div>
            </div>
          </div>
          
        </div>
        
        {/* Background overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-blue-900/80"></div>
        
      </section>

      {/* Message From The Chancellor Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden animate-on-scroll" style={{height: '350px'}}>
        <div className="mx-auto relative z-10 h-full flex items-center" style={{maxWidth: '1350px', padding: '0 40px'}}>
          
          {/* Left Side - Chancellor Image */}
          <div className="hidden lg:block w-1/3 relative animate-slide-in-left">
            <div className="relative h-full overflow-hidden">
              <img 
                src="/chancellor.jpg" 
                alt="Chancellor of University Of Modern Sciences" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/20 rounded-xl"></div>
              
              {/* Orange decorative circle */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-orange-500 rounded-full opacity-80"></div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="w-full lg:w-2/3 lg:pl-16 space-y-6 animate-slide-in-right">
            
            {/* Title */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Message From The <span className="text-orange-500">Chancellor</span>
              </h2>
              <div className="w-80 h-0.5 bg-white"></div>
            </div>
            
            {/* Main Content */}
            <div className="text-white">
              <p className="text-lg leading-relaxed max-w-2xl">
                The University Of Modern Sciences has been a torch bearer of quality
              </p>
            </div>
            
            {/* Read More Button */}
            <div className="pt-4">
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                onClick={() => window.location.reload()}
              >
                Read More
              </button>
            </div>
            
          </div>
          
        </div>
        
        {/* Background overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80"></div>
        
      </section>

      {/* Three Cards Section */}
      <section className="relative bg-gray-100 py-16" style={{height: '513px'}}>
        <div className="mx-auto h-full flex items-center" style={{maxWidth: '1341px', padding: '0 40px'}}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            {/* Card 1 - Chancellor Message */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/chancellor.jpg" 
                  alt="Chancellor" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 uppercase relative z-10 transition-colors duration-500">
                  CHANCELLOR MESSAGE
                </h3>
                <p className="text-gray-600 group-hover:text-white text-sm mb-4 relative z-10 transition-colors duration-500">
                  The most powerful weapon that you can use to change the world is education. It helps an individual to face new life..
                </p>
                <button 
                  className="bg-orange-500 group-hover:bg-white group-hover:text-orange-500 text-white font-semibold px-6 py-2 rounded-full transition-all duration-500 hover:shadow-lg relative z-10 border-2 border-transparent group-hover:border-orange-500"
                  onClick={() => window.location.reload()}
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Card 2 - Vice Chancellor Message */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/vice-chancellor.jpg" 
                  alt="Vice Chancellor" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 uppercase relative z-10 transition-colors duration-500">
                  VICE CHANCELLOR MESSAGE
                </h3>
                <p className="text-gray-600 group-hover:text-white text-sm mb-4 relative z-10 transition-colors duration-500">
                  We are proud of the fact that University of Modern Sciences Tando Muhammad Khan continues to impart quality education to deserving..
                </p>
                <button 
                  className="bg-orange-500 group-hover:bg-white group-hover:text-orange-500 text-white font-semibold px-6 py-2 rounded-full transition-all duration-500 hover:shadow-lg relative z-10 border-2 border-transparent group-hover:border-orange-500"
                  onClick={() => window.location.reload()}
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Card 3 - Associates Community Message */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/associates.jpg" 
                  alt="Associates Community" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 uppercase relative z-10 transition-colors duration-500">
                  ASSOCIATES COMMUNITY MESSAGE
                </h3>
                <p className="text-gray-600 group-hover:text-white text-sm mb-4 relative z-10 transition-colors duration-500">
                  With Grace of Almighty ALLAH University Of Modern Sciences Tando Muhammad Khan now steadily progressing in its march towards..
                </p>
                <button 
                  className="bg-orange-500 group-hover:bg-white group-hover:text-orange-500 text-white font-semibold px-6 py-2 rounded-full transition-all duration-500 hover:shadow-lg relative z-10 border-2 border-transparent group-hover:border-orange-500"
                  onClick={() => window.location.reload()}
                >
                  Read More
                </button>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* TUMS AT STUDY Section */}
      <section className="bg-blue-900 text-white" style={{maxWidth: '1355px', height: '440px', margin: '0 auto'}}>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-1/2 h-full pr-12 py-8">
            <h2 className="text-2xl font-bold mb-4">Important Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-orange-500 text-white text-center rounded-lg p-2 mr-4">
                  <div className="font-bold text-lg">Jun</div>
                  <div className="text-2xl">05</div>
                </div>
                <div>
                  <p className="font-semibold">5TH CONVOCATION DEPOSIT FEES LAST DATE.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500 text-white text-center rounded-lg p-2 mr-4">
                  <div className="font-bold text-lg">Aug</div>
                  <div className="text-2xl">06</div>
                </div>
                <div>
                  <p className="font-semibold">1st Semester Examinations of Bs IT circular 6-Aug-2024</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500 text-white text-center rounded-lg p-2 mr-4">
                  <div className="font-bold text-lg">Aug</div>
                  <div className="text-2xl">06</div>
                </div>
                <div>
                  <p className="font-semibold">3rd Semester Examinations of BBA circular 6-Aug-2024</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/notifications" className="text-orange-400 hover:text-orange-500 font-semibold">Read More</Link>
            </div>
          </div>
          <div className="w-1/2 pl-12">
            <h2 className="text-4xl font-bold mb-4">TUMS AT STUDY</h2>
            <p className="mb-4">
              The University of Modern Sciences (TUMS) is a leading private sector university in Pakistan, providing modern teaching and research facilities. Our institution offers well-equipped classrooms, advanced laboratories, and a vast library collection with online access to books and journals, fostering a robust learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold inline-block relative text-blue-900">
              EVENT ANNOUNCEMENT
              <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/1cardimage.jpg" 
                  alt="Technical Support" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h4 className="text-orange-500 font-bold text-lg mb-2">Radiology Workshop</h4>
                
                
                <p className="text-blue-500 text-sm mb-4 relative z-10">THE UNIVERSITY OF MODERN SCIENCES CELEBRATES SUCCESS...</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/2cardimage.jpg" 
                  alt="Resource Library" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h3 className="text-xl font-bold text-orange-500 group-hover:text-white mb-3 uppercase relative z-10 transition-colors duration-500">
                  NURSING FIELD VISIT
                </h3>
                <p className="text-gray-600 group-hover:text-white text-sm mb-4 relative z-10 transition-colors duration-500">
                  THE UNIVERSITY OF MODERN SCIENCE CELEBRATES SUCCESS..
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-95 hover:shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/3cardimage.jpg" 
                  alt="Training Programs" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                {/* Orange overlay from bottom */}
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-b-lg"></div>
                <h3 className="text-xl font-bold text-orange-500 group-hover:text-white mb-3 uppercase relative z-10 transition-colors duration-500">
                  INDEPENDENCE DAY
                </h3>
                <p className="text-gray-600 group-hover:text-white text-sm mb-4 relative z-10 transition-colors duration-500">
                  THE UNIVERSITY OF MODERN SCIENCES CELEBRATES SUCCESS..
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold inline-block relative text-blue-900">
              WHY CHOOSE TUMS ?
              <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500"></span>
            </h2>
            <p className="text-black text-sm mt-6 max-w-3xl mx-auto">
              With the blend of dynamic academic programs and research policies, we are vying to attain academic excellence invigorating research productivity through sustainable institutional development.
            </p>
          </div>
        </div>
      </section>

      {/* Four Cards Section */}
      <section className="py-16 bg-blue-950 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Academic Excellence Card */}
            <div className="bg-blue-800 rounded-lg p-8 relative group cursor-pointer overflow-hidden animate-slide-in-left">
              <h3 className="text-white text-xl font-semibold mb-4 relative z-10">Academic Excellence</h3>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </div>

            {/* Research Productivity Card */}
            <div className="bg-blue-800 rounded-lg p-8 relative group cursor-pointer overflow-hidden animate-slide-in-right">
              <h3 className="text-white text-xl font-semibold mb-4 relative z-10">Research Productivity</h3>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </div>

            {/* Knowledge Sharing Card */}
            <div className="bg-blue-800 rounded-lg p-8 relative group cursor-pointer overflow-hidden animate-slide-in-left">
              <h3 className="text-white text-xl font-semibold mb-4 relative z-10">Knowledge Sharing</h3>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </div>

            {/* Global Outlook Card */}
            <div className="bg-blue-800 rounded-lg p-8 relative group cursor-pointer overflow-hidden animate-slide-in-right">
              <h3 className="text-white text-xl font-semibold mb-4 relative z-10">Global Outlook</h3>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-12 relative">
        <div className="container mx-auto px-4">
          
          {/* Top Section - Contact Info */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-blue-700 pb-8">
            
            {/* Find us */}
            <div className="flex items-start mb-6 md:mb-0">
              <div className="bg-blue-700 rounded-full p-3 mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Find us</h4>
                <p className="text-blue-200 text-sm">Main Tando Muhammad Khan,Badin Rd Sindh</p>
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2"></div>
              </div>
            </div>

            {/* Call us */}
            <div className="flex items-start mb-6 md:mb-0">
              <div className="bg-blue-700 rounded-full p-3 mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Call us</h4>
                <p className="text-blue-200 text-sm">(+92)22 3409562 & 67</p>
              </div>
            </div>

            {/* Mail us */}
            <div className="flex items-start">
              <div className="bg-blue-700 rounded-full p-3 mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Mail us</h4>
                <p className="text-blue-200 text-sm">info@tums.edu.pk</p>
              </div>
            </div>
            
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side - Logo and Social */}
            <div className="lg:col-span-4">
              <div className="flex items-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="TUMS Logo" 
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-orange-400">THE UNIVERSITY OF</h3>
                  <h3 className="text-xl font-bold text-orange-400">MODERN SCIENCES</h3>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/TUMS.Official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 rounded-full p-3 cursor-pointer transition-colors duration-300 block"
                  title="Visit our Facebook page"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/TUMS_Official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 rounded-full p-3 cursor-pointer transition-colors duration-300 block"
                  title="Follow us on Twitter"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/tums_official/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 rounded-full p-3 cursor-pointer transition-all duration-300 block"
                  title="Follow us on Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle - Information Links */}
            <div className="lg:col-span-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Information
                <div className="w-12 h-1 bg-orange-500 mt-1"></div>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Link href="/" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Home</Link>
                  <Link href="/admission" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Admission</Link>
                  <Link href="/events" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Events</Link>
                  <Link href="/contact" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Contact</Link>
                  <Link href="/contact-us" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Contact Us</Link>
                </div>
                <div className="space-y-3">
                  <Link href="/about" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">About Us</Link>
                  <Link href="/academic" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Academic</Link>
                  <Link href="/notifications" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Notifications</Link>
                  <Link href="/help" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Help & Support</Link>
                  <Link href="/news" className="block text-blue-200 hover:text-white transition-colors duration-300 text-sm">Latest News</Link>
                </div>
              </div>
            </div>

            {/* Right - Newsletter */}
            <div className="lg:col-span-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Latest News
                <div className="w-12 h-1 bg-orange-500 mt-1"></div>
              </h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="flex-1 bg-blue-800 border border-blue-700 rounded-l-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                />
                <button className="bg-orange-500 hover:bg-orange-600 rounded-r-lg px-4 py-3 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Orange line below footer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
      </footer>

      {/* New Navy Blue Section */}
      <section className="bg-blue-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-sm mb-2">
            © 2024 The University of Modern Sciences. All rights reserved.
          </p>
          <p className="text-orange-400 text-lg font-bold tracking-widest font-serif">
            CREATED BY : WARDAN KUMAR
          </p>
        </div>
      </section>
    </div>
  );
}