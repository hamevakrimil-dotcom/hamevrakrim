import React from 'react';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon } from './icons';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-shrink-0">
                <Logo />
            </div>
            <div className="flex space-x-6">
                <a href="#" className="text-stone-400 hover:text-stone-500">
                    <span className="sr-only">Instagram</span>
                    <InstagramIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-stone-400 hover:text-stone-500">
                    <span className="sr-only">TikTok</span>
                    <TikTokIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-stone-400 hover:text-stone-500">
                    <span className="sr-only">Facebook</span>
                    <FacebookIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-stone-400 hover:text-stone-500">
                    <span className="sr-only">YouTube</span>
                    <YouTubeIcon className="h-6 w-6" />
                </a>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-200 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} המבקרים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
