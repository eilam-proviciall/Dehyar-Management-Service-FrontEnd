import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
    InputLabel
} from '@mui/material';

import SidebarFooter from './SidebarFooter';
import useMunicipalityUserForm from '@hooks/useMunicipalityUserForm';
import roles from "@data/roles.json";
import {useFetchCities} from "@hooks/useFetchCities";
import Autocomplete from "@mui/material/Autocomplete";

// Import other role field components

const CreateMunicipalityUserSidebar = ({ calendarStore, addEventSidebarOpen, handleAddEventSidebarToggle }) => {
    const { control, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: '' } });
    const { values, setValues, handleSidebarClose, handleDeleteButtonClick, onSubmit, resetToStoredValues } = useMunicipalityUserForm(calendarStore, setValue, clearErrors, handleAddEventSidebarToggle);
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { cities, isLoading, error } = useFetchCities()
    console.log(cities)
    const renderRoleFields = () => {
        switch (values.role) {
            case "14":
                return (
                    <FormControl fullWidth className='mbe-5'>
                        <Controller
                            name='personalField1'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => `${option.state.approved_name} - ${option.approved_name}`}
                                    onChange={(event, newValue) => {
                                        onChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='شهر'
                                            value={value}
                                            onChange={onChange}
                                            error={!!errors.city}
                                            helperText={errors.city ? 'شهر الزامی است' : ''}
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>
                );
            case "13":
                return (
                    <FormControl fullWidth className='mbe-5'>
                        <Controller
                            name='businessField1'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <TextField
                                    label='Business Field 1'
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.businessField1}
                                    helperText={errors.businessField1 ? 'This field is required' : ''}
                                />
                            )}
                        />
                    </FormControl>
                );
            // Add other cases for different roles
            default:
                return null;
        }
    };

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
            <Box className='sidebar-body p-5'>
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
                                    helperText={errors.title ? 'نام و نام خانوادگی الزامی است' : ''}
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
                                    helperText={errors.nid ? 'کدملی الزامی است' : ''}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mbe-5'>
                        <InputLabel id='event-role'>نقش</InputLabel>
                        <Select
                            label='نقش'
                            value={values.role}
                            labelId='event-role'
                            onChange={e => setValues({ ...values, role: e.target.value })}
                        >
                            {Object.entries(roles).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    { renderRoleFields()}
                    <SidebarFooter
                        isUpdate={calendarStore.selectedEvent && calendarStore.selectedEvent.title.length}
                        onReset={resetToStoredValues}
                        onSubmit={onSubmit}
                    />
                </form>
            </Box>
        </Drawer>
    );
};

export default CreateMunicipalityUserSidebar;
