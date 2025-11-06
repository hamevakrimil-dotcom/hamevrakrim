import React from 'react';
import Logo from './Logo';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon } from './icons';
import { SocialLinks } from '../types';

interface FooterProps {
  socialLinks: SocialLinks;
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  return (
    <footer className="bg-white border-t border-stone-200 mt-16 md:mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-stone-500 text-center md:text-left">
            © {new Date().getFullYear()} המבקרים! | כל ההמלצות נבדקו באופן אישי.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.instagramUrl && (
              <a href={socialLinks.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-500 hover:text-red-700 transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
            )}
            {socialLinks.facebookUrl && (
              <a href={socialLinks.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-stone-500 hover:text-red-700 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>
            )}
            {socialLinks.youtubeUrl && (
              <a href={socialLinks.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-stone-500 hover:text-red-700 transition-colors">
                <YouTubeIcon className="w-6 h-6" />
              </a>
            )}
            {socialLinks.tiktokUrl && (
              <a href={socialLinks.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-stone-500 hover:text-red-700 transition-colors">
                <TikTokIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
