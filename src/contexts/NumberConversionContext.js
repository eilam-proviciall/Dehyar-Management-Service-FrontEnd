// contexts/NumberConversionContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { convertNumbersToEnglish } from '../utils/convertNumbers';

const NumberConversionContext = createContext();

export const useNumberConversion = () => useContext(NumberConversionContext);

const NumberConversionProvider = ({ children }) => {
    useEffect(() => {
        const handleInputChange = (event) => {
            const { value } = event.target;
            event.target.value = convertNumbersToEnglish(value);
        };

        document.addEventListener('input', handleInputChange);

        return () => {
            document.removeEventListener('input', handleInputChange);
        };
    }, []);

    return (
        <NumberConversionContext.Provider value={null}>
            {children}
        </NumberConversionContext.Provider>
    );
};

export default NumberConversionProvider;
