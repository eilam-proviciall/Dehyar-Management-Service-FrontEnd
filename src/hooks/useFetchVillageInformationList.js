import { useState, useEffect } from 'react';
import { getVillageInformationList } from "@/Services/CountryDivision";
import api from '@/utils/axiosInstance';

export const useFetchVillageInformationList = (shouldFetchCities, userData) => {
    const [villages, setVillages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVillages = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(getVillageInformationList(), { requiresAuth: true });
                const data = response.data;

                if (userData) {
                    setVillages(data.filter(village => village.geo_state === userData));
                } else {
                    setVillages(data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldFetchCities) {
            fetchVillages();
        }

    }, [shouldFetchCities, userData]);

    return { villages, isLoading, error };
};