import useMunicipalityUserForm from "@hooks/useMunicipalityUserForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useState} from "react";
import {useFetchCities} from "@hooks/useFetchCities";
import {useFetchVillageInformationList} from "@hooks/useFetchVillageInformationList";
import {useAuth} from "@/contexts/AuthContext";
import {Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SidebarFooter from "@views/municipality/create/SidebarFooter";
import RoleFields from "./RoleFields"
import roles from  "@data/roles"
const CreateMunicipalityUserSidebar = ({ calendarStore, addEventSidebarOpen, handleAddEventSidebarToggle }) => {
    const { control, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: '' } });
    const {
        values,
        setValues,
        handleSidebarClose,
        handleDeleteButtonClick,
        onSubmit,
        resetToStoredValues
    } = useMunicipalityUserForm(calendarStore, setValue, clearErrors, handleAddEventSidebarToggle);
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [shouldFetchCities, setShouldFetchCities] = useState(false);
    const [shouldFetchVillages, setFetchVillages] = useState(false);
    const { cities, isLoading, error } = useFetchCities(shouldFetchCities);
    const { villages, isVillageLoading, VillageError } = useFetchVillageInformationList(shouldFetchVillages);
    const { user } = useAuth();

    useEffect(() => {
        if (values.role === "14") {
            setShouldFetchCities(true);
        } if (values.role === "13") {
            setFetchVillages(true);
        }
    }, [values.role]);

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
                    <RoleFields
                        role={values.role}
                        control={control}
                        errors={errors}
                        isLoading={values.role === "14" ? isLoading : isVillageLoading}
                        options={values.role === "14" ? cities : villages}
                    />
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
