import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="fr">Français</option>
      <option value="en">Anglais</option>
    </select>
  );
};

export default LanguageSelector;