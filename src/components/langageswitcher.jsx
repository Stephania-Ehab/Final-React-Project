// import React, { useContext } from 'react';
// import { LanguageContext } from '../context/languagecontext';

// const LanguageSwitcher = () => {
//   const { switchLanguage } = useContext(LanguageContext);

//   return (
//     <div>
//       <button onClick={() => switchLanguage('en')}>English</button>
//       <button onClick={() => switchLanguage('fr')}>French</button>
//       {/* Add more buttons for other languages as needed */}
//     </div>
//   );
// };

// export default LanguageSwitcher;


import React, { useContext } from 'react';
import { LanguageContext } from '../context/languagecontext';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(LanguageContext);

  return (
    <div className="language-switcher">
      <span onClick={() => switchLanguage(language === 'en' ? 'fr' : 'en')} style={{ cursor: 'pointer' }}>
        {language === 'en' ? 'En' : 'Fr'}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
