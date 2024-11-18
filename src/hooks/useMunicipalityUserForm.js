import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent, selectedEvent } from '@/redux-store/slices/calendar';
import { user } from "@/Services/Auth/AuthService";
import { toast } from "react-toastify";
import api from '@/utils/axiosInstance';

const useMunicipalityUserForm = (calendarStore, setValue, clearErrors, handleAddEventSidebarToggle, setLoading, sidebarDetails, setSidebarDetails) => {
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
        console.log("Data => ", data);
        console.log("Sidebar Details => ", sidebarDetails);
        console.log("Data Covered Villages => ", sidebarDetails.defaultValues.covered_villages);
        const finallyVillages = sidebarDetails.defaultValues.covered_villages
            ? sidebarDetails.defaultValues.covered_villages.map(village => {
                return village.village_code ? `${village.village_code}` : `${village}`;
            })
            : data.covered_villages && data.covered_villages.map(village => {
                return `${village.hierarchy_code}`;
            });
        console.log("Finally villages => ", finallyVillages);

        let processedData = {
            nid: data.nid,
            work_group: data.role,
            geo_state: data.covered_villages[0].geo_state,
            ...data // include other necessary data
        };

        if (values.role === "14") {
            processedData.geo_state = data.geo_region.city.geo_state;
            processedData.geo_city = data.geo_region.geo_cities;
            processedData.geo_region = sidebarDetails.defaultValues.geo_region
                ? sidebarDetails.defaultValues.geo_region
                : data.geo_region.hierarchy_code;
            processedData.covered_villages = undefined;
            processedData.villages = undefined;
            // processedData.city = data.city; // or appropriate key
        } else if (values.role === "13") {
            processedData.geo_region = undefined;
            processedData.villages = finallyVillages;
        }
        console.log(processedData);
        sidebarDetails.status == 'edit' ? (
            api.put(`${user()}/${sidebarDetails.defaultValues.id}`, processedData, { requiresAuth: true })
                .then(() => {
                    toast.success("کاربر با موفقیت ویرایش شد");
                    handleSidebarClose();
                    setLoading(true);
                }).catch((error) => error)
        ) : (
            api.post(user(), processedData, { requiresAuth: true })
                .then(() => {
                    toast.success("کاربر با موفقیت ایجاد شد");
                    handleSidebarClose();
                    setLoading(true);
                }).catch((error) => error)
        )
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
