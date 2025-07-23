import React, { createContext, useState, useEffect, useContext } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
// TODO: Exercice 2.1 - Créer le LanguageContext
import { LanguageContext } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';



export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounce, setDebounce] = useState("");
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const {language} = useContext(LanguageContext)

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 500);

    return () =>  clearTimeout(timer);
  }, [searchTerm])



  return (
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">
              {language == "fr" ? "Catalogue de Produits" : "Products Catalogue"}
            </h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LanguageSelector/>
            </div>
          </header>
          <main>
            <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ProductList searchTerm={debounce} />
          </main>
        </div>
      </ThemeContext.Provider>
  );
};

export default App
