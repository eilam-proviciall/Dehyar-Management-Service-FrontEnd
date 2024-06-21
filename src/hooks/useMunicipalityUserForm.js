import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, selectedEvent } from '@/redux-store/slices/calendar';

const useMunicipalityUserForm = (calendarStore, setValue, clearErrors, handleAddEventSidebarToggle) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        title: '',
        nid: '',
        role: ''
    });

    const resetToStoredValues = useCallback(() => {
        if (calendarStore.selectedEvent !== null) {
            const event = calendarStore.selectedEvent;
            setValue('title', event.title || '');
            setValue('nid', event.nid || '');
            setValues({
                title: event.title || '',
                nid: event.nid || '',
                role: event.extendedProps.role || 'Business',
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
        const modifiedEvent = {
            title: data.title,
            nid: data.nid,
            extendedProps: {
                role: values.role,
            }
        };

        if (!calendarStore.selectedEvent || !calendarStore.selectedEvent.title.length) {
            dispatch(addEvent(modifiedEvent));
        } else {
            dispatch(updateEvent({ ...modifiedEvent, id: calendarStore.selectedEvent.id }));
        }

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
