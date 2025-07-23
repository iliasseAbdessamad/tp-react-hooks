import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';
import {useDebounce} from '../hooks/useProductSearch'

const ProductSearch = ({searchTerm, setSearchTerm}) => {
  
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const {language} = useContext(LanguageContext);

  const placeholderText = {
    fr:"Rechercher un produit...",
    en:"Search for a product..."
  };
  

  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  const [inpVal, setInpVal] = useState(searchTerm);
  const debouncedValue = useDebounce(inpVal, 2000); 

  useEffect(()=>{
    setSearchTerm(debouncedValue);
  }, [debouncedValue,setSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder={placeholderText[language]}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;