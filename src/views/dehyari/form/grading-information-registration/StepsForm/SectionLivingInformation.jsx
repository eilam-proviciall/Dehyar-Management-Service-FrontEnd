import React, { useEffect, useReducer } from 'react';
import LivingInformationInputs from './LivingInformationInputs';
import { useFormContext } from 'react-hook-form';
import { getGeoData, getStateWithCitiesData } from "@/Services/DataService";
import api from '@/utils/axiosInstance';

// // مقداردهی اولیه state کامپوننت
const initialState = {
    stateCities: [],
    regions: [],
    dehestans: [],
    villages: [],
    selectedStateCity: null,
    selectedRegion: null,
    selectedDehestan: null,
    loading: false,
    error: null,
};

// reducer برای مدیریت تغییرات state
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STATE_CITIES':
            return { ...state, stateCities: action.payload };
        case 'SET_REGIONS':
            return { ...state, regions: action.payload };
        case 'SET_DEHESTANS':
            return { ...state, dehestans: action.payload };
        case 'SET_VILLAGES':
            return { ...state, villages: action.payload };
        case 'SET_SELECTED_STATE_CITY':
            return { ...state, selectedStateCity: action.payload, regions: [], dehestans: [], villages: [] };
        case 'SET_SELECTED_REGION':
            return { ...state, selectedRegion: action.payload, dehestans: [], villages: [] };
        case 'SET_SELECTED_DEHESTAN':
            return { ...state, selectedDehestan: action.payload, villages: [] };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const SectionLivingInformation = ({ fieldKey, setData, mode }) => {
    const { setValue, watch } = useFormContext();
    const queryParams = new URLSearchParams(window.location.search);

    const initialLivingLocation = watch(fieldKey);
    console.log("Field Key =>", fieldKey);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });

                const stateCitiesResponse = await api.get(getStateWithCitiesData(), { requiresAuth: true });
                dispatch({ type: 'SET_STATE_CITIES', payload: stateCitiesResponse.data.data });
                console.log("State Cities Response => ", stateCitiesResponse);

                if (initialLivingLocation) {
                    const { state_city, region, dehestan, village, locationName } = initialLivingLocation;

                    if (state_city && state_city.hierarchy_code) {
                        handleStateCityChange(state_city);
                    }

                    if (region && region.hierarchy_code) {
                        handleRegionChange(region);
                    }

                    if (dehestan && dehestan.hierarchy_code) {
                        handleDehestanChange(dehestan);
                    }

                    if (village && village.hierarchy_code) {
                        setValue(`${fieldKey}.village`, village);
                    }

                    if (locationName) {
                        setValue(`${fieldKey}.locationName`, locationName);
                    }
                }
                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error });
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchData();
    }, [setValue]);

    const handleStateCityChange = async (selectedStateCity) => {
        dispatch({ type: 'SET_SELECTED_STATE_CITY', payload: selectedStateCity });

        if (mode !== 'edit') {
            setValue(`${fieldKey}.region`, null);
            setValue(`${fieldKey}.dehestan`, null);
            setValue(`${fieldKey}.village`, null);
            dispatch({ type: 'SET_REGIONS', payload: [] });
            dispatch({ type: 'SET_DEHESTANS', payload: [] });
            dispatch({ type: 'SET_VILLAGES', payload: [] });
        }

        const regionsResponse = await api.get(`${getGeoData()}?level=city&hierarchy_code=${selectedStateCity.hierarchy_code}`, { requiresAuth: true });
        console.log("Region Response => ", regionsResponse.data);

        dispatch({ type: 'SET_REGIONS', payload: regionsResponse.data });
    };

    const handleRegionChange = async (selectedRegion) => {
        dispatch({ type: 'SET_SELECTED_REGION', payload: selectedRegion });

        if (mode !== 'edit') {
            setValue(`${fieldKey}.dehestan`, null);
            setValue(`${fieldKey}.village`, null);
            dispatch({ type: 'SET_DEHESTANS', payload: [] });
            dispatch({ type: 'SET_VILLAGES', payload: [] });
        }

        const dehestansResponse = await api.get(`${getGeoData()}?level=region&hierarchy_code=${selectedRegion.hierarchy_code}`, { requiresAuth: true });
        dispatch({ type: 'SET_DEHESTANS', payload: dehestansResponse.data });
    };

    const handleDehestanChange = async (selectedDehestan) => {
        dispatch({ type: 'SET_SELECTED_DEHESTAN', payload: selectedDehestan });

        if (mode !== 'edit') {
            setValue(`${fieldKey}.village`, null);
            dispatch({ type: 'SET_VILLAGES', payload: [] });
        }

        const villagesResponse = await api.get(`${getGeoData()}?level=dehestan&hierarchy_code=${selectedDehestan.hierarchy_code}`, { requiresAuth: true });
        dispatch({ type: 'SET_VILLAGES', payload: villagesResponse.data });
    };

    return (
        <LivingInformationInputs
            state={state}
            handleStateCityChange={handleStateCityChange}
            handleRegionChange={handleRegionChange}
            handleDehestanChange={handleDehestanChange}
            fieldKey={fieldKey}
            setData={setData}
        />
    );
};

export default SectionLivingInformation;
