import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedValue(value)
    },delay);

    return()=>{
      clearTimeout(handler);
    };
  },[value,delay]);
  return debouncedValue;
};

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
export const useLocalStorage = (key,initialValue) => {
  const[storedVal, setStoredVal] = useState(()=>{
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }catch(error){

      console.warn('Error reading from local storage',error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try{
      const valueToStore = value instanceof Function ? value(storedVal) : value;
      setStoredVal(valueToStore);
      window.localStorage.setItem(key,JSON.stringify(valueToStore));
    }catch(error){
      console.warn('Error writing to local storage',error);
    }
  };
  return [storedVal,setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();

        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
  };
};

export default useProductSearch;