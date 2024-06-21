import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import {
    Box,
    Drawer,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';

import { addEvent, deleteEvent, updateEvent, selectedEvent } from '@/redux-store/slices/calendar';
// import { capitalize } from '@/utils/utility';
import SidebarFooter from './SidebarFooter';

const defaultState = {
    title: '',
    nid: '',
    calendar: 'Business'
};

const CreateMunicipalityUserSidebar = ({ calendarStore, addEventSidebarOpen, handleAddEventSidebarToggle }) => {
    const [values, setValues] = useState(defaultState);
    const dispatch = useDispatch();
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const { control, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: '' } });

    const resetToStoredValues = useCallback(() => {
        if (calendarStore.selectedEvent !== null) {
            const event = calendarStore.selectedEvent;
            setValue('title', event.title || '');
            setValue('nid', event.nid || '');
            setValues({
                title: event.title || '',
                nid: event.nid || '',
                calendar: event.extendedProps.calendar || 'Business',
            });
        }
    }, [setValue, calendarStore.selectedEvent]);

    const resetToEmptyValues = useCallback(() => {
        setValue('title', '');
        setValue('nid', '');
        setValues(defaultState);
    }, [setValue]);

    const handleSidebarClose = () => {
        setValues(defaultState);
        clearErrors();
        dispatch(selectedEvent(null));
        handleAddEventSidebarToggle();
    };

    const onSubmit = data => {
        const modifiedEvent = {
            title: data.title,
            nid: data.nid,
            extendedProps: {
                calendar: capitalize(values.calendar),
            }
        };

        if (!calendarStore.selectedEvent || !calendarStore.selectedEvent.title.length) {
            dispatch(addEvent(modifiedEvent));
        } else {
            dispatch(updateEvent({ ...modifiedEvent, id: calendarStore.selectedEvent.id }));
        }

        handleSidebarClose();
    };

    const handleDeleteButtonClick = () => {
        if (calendarStore.selectedEvent) {
            dispatch(deleteEvent(calendarStore.selectedEvent.id));
        }
        handleSidebarClose();
    };

    useEffect(() => {
        if (calendarStore.selectedEvent !== null) {
            resetToStoredValues();
        } else {
            resetToEmptyValues();
        }
    }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, calendarStore.selectedEvent]);

    return (
        <Drawer
            anchor='right'
            open={addEventSidebarOpen}
            onClose={handleSidebarClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
        >
            <Box className='flex justify-between items-center sidebar-header pli-5 plb-4 border-be'>
                <Typography variant='h5'>افزودن کاربر جدید</Typography>
                {calendarStore.selectedEvent && calendarStore.selectedEvent.title.length ? (
                    <Box className='flex items-center' sx={{ gap: 1 }}>
                        <IconButton size='small' onClick={handleDeleteButtonClick}>
                            <i className='ri-delete-bin-7-line text-2xl' />
                        </IconButton>
                        <IconButton size='small' onClick={handleSidebarClose}>
                            <i className='ri-close-line text-2xl' />
                        </IconButton>
                    </Box>
                ) : (
                    <IconButton size='small' onClick={handleSidebarClose}>
                        <i className='ri-close-line text-2xl' />
                    </IconButton>
                )}
            </Box>
            <PerfectScrollbar
                options={isBelowSmScreen ? {} : { wheelPropagation: false, suppressScrollX: true }}
                className='sidebar-body p-5'
            >
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <FormControl fullWidth className='mbe-5'>
                        <Controller
                            name='title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <TextField
                                    label='نام و نام خانوادگی'
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.title}
                                    helperText={errors.title ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mbe-5'>
                        <Controller
                            name='nid'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <TextField
                                    label='کد ملی'
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.nid}
                                    helperText={errors.nid ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mbe-5'>
                        <InputLabel id='event-calendar'>نقش</InputLabel>
                        <Select
                            label='Calendar'
                            value={values.calendar}
                            labelId='event-calendar'
                            onChange={e => setValues({ ...values, calendar: e.target.value })}
                        >
                            <MenuItem value='Personal'>امور مالی</MenuItem>
                            <MenuItem value='Business'>ناظر فنی</MenuItem>
                            <MenuItem value='Family'>دفتر امور روستایی</MenuItem>
                            <MenuItem value='Holiday'>بخشدار</MenuItem>
                            <MenuItem value='ETC'>دهیار</MenuItem>
                        </Select>
                    </FormControl>
                    <SidebarFooter
                        isUpdate={calendarStore.selectedEvent && calendarStore.selectedEvent.title.length}
                        onReset={resetToStoredValues}
                        onSubmit={onSubmit}
                    />
                </form>
            </PerfectScrollbar>
        </Drawer>
    );
};

export default CreateMunicipalityUserSidebar;
