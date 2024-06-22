import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useMunicipalityUserForm from '@hooks/useMunicipalityUserForm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFetchCities } from '@hooks/useFetchCities';
import { useFetchVillageInformationList } from '@hooks/useFetchVillageInformationList';
import { useAuth } from '@/contexts/AuthContext';
import {
    Drawer, Box, Typography, IconButton, FormControl,
    TextField, InputLabel, Select, MenuItem
} from '@mui/material';
import SidebarFooter from '@views/municipality/create/SidebarFooter';
import RoleFields from './RoleFields';
import roles from '@data/roles';

const CreateMunicipalityUserSidebar = ({ calendarStore, addEventSidebarOpen, handleAddEventSidebarToggle }) => {
    const { control, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: '' } });
    const {
        values, setValues, handleSidebarClose, handleDeleteButtonClick,
        onSubmit, resetToStoredValues
    } = useMunicipalityUserForm(calendarStore, setValue, clearErrors, handleAddEventSidebarToggle);

    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [fetchState, setFetchState] = useState({
        shouldFetchCities: false,
        shouldFetchVillages: false
    });

    const { cities, isLoading: isCitiesLoading } = useFetchCities(fetchState.shouldFetchCities);
    const { villages, isLoading: isVillagesLoading } = useFetchVillageInformationList(fetchState.shouldFetchVillages);

    const { user } = useAuth();

    useEffect(() => {
        setFetchState(prevState => ({
            ...prevState,
            shouldFetchCities: values.role === "14",
            shouldFetchVillages: values.role === "13"
        }));
    }, [values.role]);

    const renderTextField = (name, label, errorText) => (
        <FormControl fullWidth className='mbe-5'>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        label={label}
                        value={value}
                        onChange={onChange}
                        error={!!errors[name]}
                        helperText={errors[name] ? errorText : ''}
                    />
                )}
            />
        </FormControl>
    );

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
                <Box className='flex items-center' sx={{ gap: 1 }}>
                    {calendarStore.selectedEvent?.title?.length > 0 && (
                        <IconButton size='small' onClick={handleDeleteButtonClick}>
                            <i className='ri-delete-bin-7-line text-2xl' />
                        </IconButton>
                    )}
                    <IconButton size='small' onClick={handleSidebarClose}>
                        <i className='ri-close-line text-2xl' />
                    </IconButton>
                </Box>
            </Box>
            <Box className='sidebar-body p-5'>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    {renderTextField('title', 'نام و نام خانوادگی', 'نام و نام خانوادگی الزامی است')}
                    {renderTextField('nid', 'کد ملی', 'کدملی الزامی است')}
                    <FormControl fullWidth className='mbe-5'>
                        <InputLabel id='event-role'>نقش</InputLabel>
                        <Select
                            label='نقش'
                            value={values.role}
                            labelId='event-role'
                            onChange={e => {
                                const newRole = e.target.value;
                                setValues(prevValues => ({ ...prevValues, role: '' }));
                                setTimeout(() => {
                                    setValues(prevValues => ({ ...prevValues, role: newRole }));
                                }, 0);
                            }}
                        >
                            {Object.entries(roles).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <RoleFields
                        role={values.role}
                        control={control}
                        errors={errors}
                        isLoading={values.role === "14" ? isCitiesLoading : isVillagesLoading}
                        options={values.role === "14" ? cities : villages}
                    />
                    <SidebarFooter
                        isUpdate={calendarStore.selectedEvent?.title?.length > 0}
                        onReset={resetToStoredValues}
                        onSubmit={onSubmit}
                    />
                </form>
            </Box>
        </Drawer>
    );
};

export default CreateMunicipalityUserSidebar;
