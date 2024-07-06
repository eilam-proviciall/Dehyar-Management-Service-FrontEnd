// src/contexts/FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const defaultValues = {
        personal: { fullName: '', fatherName: '', nationalId: '', birthDate: '', gender: '' },
        password: { password: '', confirmPassword: '' }
    };

    const [formData, setFormData] = useState(defaultValues);

    const updateFormData = (section, data) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData, defaultValues }}>
            {children}
        </FormContext.Provider>
    );
};
