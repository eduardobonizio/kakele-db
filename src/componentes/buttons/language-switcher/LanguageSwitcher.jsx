import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = ({ locale, locales }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [language, setLanguage] = useState(locale);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={styles.languageContainer}>
      <Image
        src={`/${language}-flag.svg`}
        alt={`/${language} flag`}
        width="36"
        height="36"
        responsive="true"
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions &&
        locales.map((loc, index) => {
          if (loc === language) return;
          return (
            <Image
              src={`/${loc}-flag.svg`}
              alt={`/${language} flag`}
              width="36"
              height="36"
              responsive="true"
              key={loc + index}
              onClick={() => {
                setLanguage(loc);
                setShowOptions(!showOptions);
                router.push({ pathname, query }, asPath, { locale: loc });
              }}
            />
          );
        })}
    </div>
  );
};

export default LanguageSwitcher;
