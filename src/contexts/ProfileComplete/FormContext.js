import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const defaultValues = {
        fullName: '',
        fatherName: '',
        personalId: '',
        birthDate: '',
        gender: '',
        password: '',
        confirmPassword: '',
        degree: '',
        fieldOfStudy: '',
    };

    const [formData, setFormData] = useState(defaultValues);


    const updateFormData = (data) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
    };


    return (
        <FormContext.Provider value={{ formData, updateFormData, defaultValues }}>
            {children}
        </FormContext.Provider>
    );
};
