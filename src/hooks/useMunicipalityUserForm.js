import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent, selectedEvent } from '@/redux-store/slices/calendar';
import { user } from "@/Services/Auth/AuthService";
import { toast } from "react-toastify";
import api from '@/utils/axiosInstance';

const useMunicipalityUserForm = (calendarStore, setValue, clearErrors, handleAddEventSidebarToggle, setLoading) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        nid: '',
        role: '',
        villages: [],
    });

    const resetToStoredValues = useCallback(() => {
        if (calendarStore.selectedEvent !== null) {
            const event = calendarStore.selectedEvent;
            setValue('title', event.title || '');
            setValue('nid', event.nid || '');
            setValues({
                title: '',
                nid: '',
                role: '',
            });
        }
    }, [setValue, calendarStore.selectedEvent]);

    const resetToEmptyValues = useCallback(() => {
        setValue('title', '');
        setValue('nid', '');
        setValues({
            title: '',
            nid: '',
            role: ''
        });
    }, [setValue]);

    const handleSidebarClose = () => {
        setValues({
            title: '',
            nid: '',
            role: ''
        });
        clearErrors();
        dispatch(selectedEvent(null));
        handleAddEventSidebarToggle();
    };

    const handleDeleteButtonClick = () => {
        if (calendarStore.selectedEvent) {
            dispatch(deleteEvent(calendarStore.selectedEvent.id));
        }
        handleSidebarClose();
    };

    const onSubmit = data => {
        console.log(data)
        data.villages ? data.villages = data.villages.map(village => `${village}`) : undefined;
        let processedData = {
            nid: data.nid,
            work_group: data.role,
            geo_state: data.geo_region.city.geo_state,
            geo_city: data.geo_region.geo_cities,
            geo_region: data.geo_region.hierarchy_code,
            ...data // include other necessary data
        };

        if (values.role === "14") {
            processedData.geo_state = data.geo_region.city.geo_state;
            processedData.geo_city = data.geo_region.geo_cities;
            processedData.geo_region = data.geo_region.hierarchy_code;
            processedData.covered_villages = undefined;
            processedData.villages = undefined;
            // processedData.city = data.city; // or appropriate key
        } else if (values.role === "13") {
            processedData.geo_region = undefined;
            processedData.covered_villages = data.villages;
        }
        console.log(processedData)
        api.post(user(), processedData, { requiresAuth: true })
            .then(() => {
                toast.success("کاربر با موفقیت ایجاد شد", {
                    position: "top-center"
                });
                handleSidebarClose();
                setLoading(true);
            }).catch((error) => error);

    };

    useEffect(() => {
        if (calendarStore.selectedEvent !== null) {
            resetToStoredValues();
        } else {
            resetToEmptyValues();
        }
    }, [resetToStoredValues, resetToEmptyValues, calendarStore.selectedEvent]);

    return {
        values,
        setValues,
        handleSidebarClose,
        handleDeleteButtonClick,
        onSubmit,
        resetToStoredValues,
    };
};

export default useMunicipalityUserForm;
