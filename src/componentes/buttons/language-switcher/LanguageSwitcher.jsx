import { useState } from 'react';

import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(locale);

  onChange = e => {
    setLanguage(e.target.className);
  };

  const options = locales.map(lang => {
    if (lang !== language) {
      return (
        <li onClick={this.onChange}>
          <div value={lang} className={lang}></div>
        </li>
      );
    }
  });

  return (
    <div className={styles.languageSwitcher}>
      <div className={styles.lang}>
        <div className={styles[language]}></div>
        <ul className="dropdown">{options}</ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
