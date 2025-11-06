import React from 'react';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Logo from './components/Logo';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            <nav>
              {/* Future nav links can go here */}
            </nav>
          </div>
        </div>
      </header>
      
      <HomePage />
      
      <Footer />
    </div>
  );
}

export default App;
