import React from 'react';
import { useSelector } from 'react-redux';

import { homeContentJsx as textOptions } from '../../data/dataLanguages';

export default function HomeContent() {
  const { language } = useSelector(state => state.currentKakeleFilters);
  const text = textOptions[language] || textOptions.PTBR;

  return (
    <div className="container d-flex flex-column justify-content-center align-content-center">
      <span className="d-flex align-self-center mt-5 mb-5">
        {text.underConstruction}
      </span>
    </div>
  );
}
