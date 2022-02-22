import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonForKakele from "../componentes/ButtonForKakele";
import { homeContentJsx as textOptions } from "../data/dataLanguages";
import { updateItensFilter } from "../store/actions/KakeleFilters.actions";

export default function HomeContent() {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.currentKakeleFilters);
  const text = textOptions[language] || textOptions.PTBR;

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("language") || false;
    dispatch(updateItensFilter("CHANGE_LANGUAGE", selectedLanguage));
  }, []);

  const changeLanguage = (newLanguage) => {
    localStorage.setItem("language", newLanguage);
    dispatch(updateItensFilter("CHANGE_LANGUAGE", newLanguage));
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-content-center">
      <span className="d-flex align-self-center mt-3 mb-3">
        {text.selectLanguage}
      </span>
      <ButtonForKakele onClick={() => changeLanguage("EN")} text="English" />
      <ButtonForKakele
        onClick={() => changeLanguage("PTBR")}
        text="Português"
      />
    </div>
  );
}
