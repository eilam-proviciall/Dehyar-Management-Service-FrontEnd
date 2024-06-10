// src/hooks/useFetchCities.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {getCity} from "@/Services/CountryDivision";

export const useFetchCities = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(getCity(),{
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });
                setCities(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []);

    return { cities, isLoading, error };
};
