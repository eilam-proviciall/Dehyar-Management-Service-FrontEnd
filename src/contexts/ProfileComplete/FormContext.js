import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const defaultValues = {
        firstName: '',
        lastName: '',
        fatherName: '',
        personalId: '',
        birthDate: '',
        gender: '',
        password: '',
        confirmPassword: '',
        degree: '',
        fieldOfStudy: '',
        profilePicture:''
    };

    const [formData, setFormData] = useState(defaultValues);


    const updateFormData = (data) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
    };


    return (
        <FormContext.Provider value={{ formData, updateFormData, defaultValues,setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
