import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useMunicipalityUserForm from '@hooks/useMunicipalityUserForm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFetchVillageInformationList } from '@hooks/useFetchVillageInformationList';
import { useAuth } from '@/contexts/AuthContext';
import {
    Drawer, Box, Typography, IconButton, FormControl,
    TextField, InputLabel, Select, MenuItem
} from '@mui/material';
import SidebarFooter from '@views/municipality/create/SidebarFooter';
import RoleFields from './RoleFields';
import { useFetchRegions } from "@hooks/useFetchRegions";
import CustomDrawer from '@/@core/components/mui/Drawer';
import {useFetchStates} from "@hooks/useFetchStates";
import roles from '@data/roles';


const CreateMunicipalityUserSidebar = ({ calendarStore, addEventSidebarOpen, handleAddEventSidebarToggle, sidebarDetails, setSidebarDetails, setLoading,userGeoState }) => {
    const { control, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            first_name: "",
            last_name: "",
            nid: '',
            role: '',
            covered_villages: [],
        },
    });

    const {
        values, setValues, handleSidebarClose, handleDeleteButtonClick,
        onSubmit, resetToStoredValues
    } = useMunicipalityUserForm(calendarStore, setValue, clearErrors, handleAddEventSidebarToggle, setLoading, sidebarDetails, setSidebarDetails);

    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [fetchState, setFetchState] = useState({
        shouldFetchRegion: false,
        shouldFetchVillages: false,
        shouldFetchCities: false,
    });

    const { regions, isLoading: isRegionsLoading } = useFetchRegions(fetchState.shouldFetchRegion, userGeoState);
    const { villages, isLoading: isVillagesLoading } = useFetchVillageInformationList(fetchState.shouldFetchVillages, userGeoState);
    const { cities, isLoading: isCitiesLoading } = useFetchStates(fetchState.shouldFetchCities, userGeoState);

    useEffect(() => {
        setValue('nid', sidebarDetails.defaultValues.nid);
        setValue('first_name', sidebarDetails.defaultValues.first_name);
        setValue('last_name', sidebarDetails.defaultValues.last_name);
        setValue('role', sidebarDetails.defaultValues.work_group);
        setValue('covered_villages', sidebarDetails.defaultValues.covered_villages);
        setValues(prevValues => ({ ...prevValues, role: `${sidebarDetails.defaultValues.work_group}` }));
    }, [sidebarDetails]);

    useEffect(() => {
        setFetchState(prevState => ({
            ...prevState,
            shouldFetchRegion: values.role == "14",
            shouldFetchVillages: values.role == "13",
            shouldFetchCities: values.role == "16",
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
        <CustomDrawer
            anchor='right'
            open={addEventSidebarOpen}
            onClose={handleSidebarClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
        >
            <Box className='flex justify-between items-center sidebar-header pli-5 plb-4 border-be'>
                <Typography variant='h5'>{sidebarDetails.status == "add" ? "افزودن کاربر جدید" : "ویرایش کاربر"}</Typography>
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
                    {renderTextField('first_name', 'نام ', 'نام الزامی است')}
                    {renderTextField('last_name', 'نام خانوادگی', 'نام خانوادگی الزامی است')}
                    {renderTextField('nid', 'کد ملی', 'کدملی الزامی است')}
                    <FormControl fullWidth className='mbe-5'>
                        <InputLabel id='event-role'>نقش</InputLabel>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label='نقش'
                                    onChange={e => {
                                        const newRole = e.target.value;
                                        setValues(prevValues => ({ ...prevValues, role: '' }));
                                        setTimeout(() => {
                                            setValues(prevValues => ({ ...prevValues, role: newRole }));
                                            field.onChange(e);
                                        }, 0);
                                    }}
                                >
                                    {Object.entries(roles).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <RoleFields
                        role={values.role}
                        control={control}
                        errors={errors}
                        isLoading={values.role == "14" && isRegionsLoading || values.role == "13" && isVillagesLoading || isCitiesLoading}
                        options={values.role == "14" && regions || values.role == "13" && villages || cities}
                        selectedOptions={values.role == '14' && sidebarDetails.defaultValues.geo_region || values.role == "13" && sidebarDetails.defaultValues.covered_villages || sidebarDetails.defaultValues.geo_state}
                        sidebarDetails={sidebarDetails}
                        setSidebarDetails={setSidebarDetails}
                    />
                    <SidebarFooter
                        sidebarStatus={sidebarDetails.status}
                        isUpdate={calendarStore.selectedEvent?.title?.length > 0}
                        onReset={resetToStoredValues}
                        onSubmit={onSubmit}
                    />
                </form>
            </Box>
        </CustomDrawer>
    );
};

export default CreateMunicipalityUserSidebar;