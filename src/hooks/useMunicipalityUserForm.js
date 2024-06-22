import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteEvent, selectedEvent} from '@/redux-store/slices/calendar';
import axios from "axios";
import {register} from "@/Services/Auth/AuthService";

const useMunicipalityUserForm = (calendarStore, setValue, clearErrors, handleAddEventSidebarToggle) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        title: '',
        nid: '',
        role: '',
        villages: [],
        city: '',
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
        let processedData = {
            nid: data.nid,
            work_group: 12,
            ...data // include other necessary data
        };

        if (values.role === "14") {
            processedData.city = data.city; // or appropriate key
        } else if (values.role === "13") {
            processedData.villages = data.villages;
        }
        console.log(processedData);
        const response = axios.post(register(), processedData,
            {headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`}})
            .then((res) => console.log(res))
        //
        handleSidebarClose();
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
