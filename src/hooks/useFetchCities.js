import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCity } from "@/Services/CountryDivision";

export const useFetchCities = (shouldFetchCities) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(getCity(), {
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

        if (shouldFetchCities) {
            fetchCities();
        }

    }, [shouldFetchCities]);

    return { cities, isLoading, error };
};
