import { useState, useEffect, useCallback } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedVal, setStoredVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {

      console.warn('Error reading from local storage', error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedVal) : value;
      setStoredVal(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('Error writing to local storage', error);
    }
  };
  return [storedVal, setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {

      //total pages 
      const res = await fetch('http://localhost:3001/total');
      const totalProducts = await res.json()
      setTotalPages(Math.ceil(totalProducts / limit))

      const response = await fetch('http://localhost:3001/products?_page=' + currentPage);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.data);


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);



  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reload = () => {
    fetchProducts();
  };

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reload,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;