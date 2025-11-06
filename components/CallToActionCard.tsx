import React from 'react';
import { PlusCircleIcon } from './icons';

const CallToActionCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:border-red-600 hover:bg-red-50">
      <div className="bg-red-100 rounded-full p-3 mb-4">
        <PlusCircleIcon className="w-10 h-10 text-red-700" />
      </div>
      <h3 className="text-2xl font-bold text-stone-900 mb-2">רוצים להופיע כאן?</h3>
      <p className="text-stone-600 mb-6 max-w-xs">
        אנחנו תמיד מחפשים מקומות חדשים ומיוחדים. אם העסק שלכם מתאים, נשמח לבדוק אתכם!
      </p>
      <a
        href="mailto:support@hamevakrim.com?subject=בקשה להופיע באתר המבקרים"
        className="flex items-center justify-center gap-2 w-full max-w-sm bg-red-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-600/20"
      >
        <span>צרו קשר לבדיקה</span>
      </a>
    </div>
  );
};

export default CallToActionCard;