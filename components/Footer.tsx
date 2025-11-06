import React from 'react';
import { InstagramIcon, TikTokIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-3xl font-bold text-black">המבקרים!</h3>
                <p className="mt-2 text-stone-600 text-sm">
                    המלצות שנבדקו. מקומות ששווה להכיר.
                </p>
            </div>
            
            <div>
                <h4 className="font-bold text-stone-800 mb-2">תמיכה ומידע</h4>
                <a href="mailto:support@hamevakrim.com" className="text-red-700 hover:underline rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50">
                    support@hamevakrim.com
                </a>
            </div>

            <div>
                <h4 className="font-bold text-stone-800 mb-3">עקבו אחרינו</h4>
                <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-500 hover:text-red-700 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50">
                        <InstagramIcon className="w-6 h-6" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-stone-500 hover:text-red-700 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50">
                        <TikTokIcon className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 text-center text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} המבקרים — כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;