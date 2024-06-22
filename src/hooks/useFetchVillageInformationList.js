import { useState, useEffect } from 'react';
import axios from 'axios';
import {getCity, getVillageInformationList} from "@/Services/CountryDivision";

export const useFetchVillageInformationList = (shouldFetchCities) => {
    const [villages, setVillages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVillages = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(getVillageInformationList(), {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });
                setVillages(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldFetchCities) {
            fetchVillages();
        }

    }, [shouldFetchCities]);
    return { villages, isLoading, error };
};
