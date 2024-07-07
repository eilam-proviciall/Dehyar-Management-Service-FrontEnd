import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const defaultValues = {
        fullName: '',
        fatherName: '',
        nationalId: '',
        birthDate: '',
        gender: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(defaultValues);


    const updateFormData = (data) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
    };

    // Watch formData changes
    useEffect(() => {
        console.log("formData changed:", formData);
    }, [formData]);

    return (
        <FormContext.Provider value={{ formData, updateFormData, defaultValues }}>
            {children}
        </FormContext.Provider>
    );
};
