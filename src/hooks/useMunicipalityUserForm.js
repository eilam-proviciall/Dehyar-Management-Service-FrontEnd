import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent, selectedEvent } from '@/redux-store/slices/calendar';
import axios from "axios";
import { user } from "@/Services/Auth/AuthService";
import { toast } from "react-toastify";
import { useFetchVillageInformationList } from './useFetchVillageInformationList';

const useMunicipalityUserForm = (calendarStore, setValue, clearErrors, handleAddEventSidebarToggle, sidebarDetails, setSidebarDetails, setLoading) => {
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
            setValue('role', event.role || '');
            setValues({
                title: '',
                nid: '',
                role: '',
            });
        }
    }, [setValue, calendarStore.selectedEvent]);

    const resetToEmptyValues = useCallback(() => {
        setValue('title', '');
        setValues({
            title: '',
            nid: '',
            role: ''
        });
        setSidebarDetails({ status: sidebarDetails.status, defaultValues: {} })
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
        setSidebarDetails({ status: 'add', defaultValues: {} })
    };

    const handleDeleteButtonClick = () => {
        if (calendarStore.selectedEvent) {
            dispatch(deleteEvent(calendarStore.selectedEvent.id));
        }
        handleSidebarClose();
    };

    const onSubmit = (data) => {

        data.villages ? data.villages = data.villages.map(village => village.toString()) : null


        console.log(data)
        let processedData = {
            nid: data.nid,
            work_group: data.role,
            covered_villages: data.villages,
            ...data // include other necessary data
        };

        if (values.role == "14") {
            processedData.city = data.city; // or appropriate key
        } else if (values.role == "13") {
            processedData.villages = data.villages;
        }

        console.log("Processed Data : ", processedData)

        sidebarDetails.status == 'add' ? (
            axios.post(user(), processedData,
                { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } })
                .then(() => {
                    toast.success("کاربر با موفقیت ایجاد شد", {
                        position: "top-center"
                    });
                    handleSidebarClose();
                    setLoading(true);
                }).catch((error) => {
                    if (error.response && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        Object.keys(errors).forEach((key) => {
                            errors[key].forEach((message) => {
                                toast.error(message);
                            });
                        });
                    } else if (error.response && error.response.data.message) {
                        console.log(error.response)
                        toast.error(error.response.data.message, {
                            position: "top-center"
                        });
                    } else {
                        toast.error("خطای ناشناخته", {
                            position: "top-center"
                        });
                    }
                })
        ) : (
            axios.put(`${user()}/${1}`, processedData,
                { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } })
                .then(() => {
                    toast.success("کاربر با موفقیت ویرایش شد", {
                        position: "top-center"
                    });
                    handleSidebarClose();
                    setLoading(true);
                }).catch((error) => {
                    if (error.response && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        Object.keys(errors).forEach((key) => {
                            errors[key].forEach((message) => {
                                toast.error(message);
                            });
                        });
                    } else if (error.response && error.response.data.message) {
                        console.log(error.response)
                        toast.error(error.response.data.message, {
                            position: "top-center"
                        });
                    } else {
                        toast.error("خطای ناشناخته", {
                            position: "top-center"
                        });
                    }
                })
        );
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
