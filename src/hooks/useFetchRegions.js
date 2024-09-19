import { useState, useEffect } from 'react';
import axios from 'axios';
import {getCity, getRegion} from "@/Services/CountryDivision";

export const useFetchRegions = (shouldFetchRegions) => {
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(getRegion(), {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });
                setRegions(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldFetchRegions) {
            fetchRegions();
        }

    }, [shouldFetchRegions]);

    return { regions, isLoading, error };
};
