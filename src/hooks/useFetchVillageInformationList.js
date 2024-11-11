import {useState, useEffect} from 'react';
import {getVillageInformationList} from "@/Services/CountryDivision";
import api from '@/utils/axiosInstance';

export const useFetchVillageInformationList = (shouldFetchCities) => {
    const [villages, setVillages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVillages = async () => {
            setIsLoading(true);
            await api.get(getVillageInformationList(), {requiresAuth: true})
                .then(response => {
                    console.log("Response Villages => ",response.data);
                    setVillages(response.data.filter(village=> village.geo_state === userData));
                })
                .catch(err => setError(err))
                .finally(setIsLoading(false));
        };

        if (shouldFetchCities) {
            fetchVillages();
        }

    }, [shouldFetchCities]);
    return {villages, isLoading, error};
};
