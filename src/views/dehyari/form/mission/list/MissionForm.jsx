import DividerSimple from '@/components/common/Divider/DividerSimple';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import api from '@/utils/axiosInstance';
import { getState } from '@/Services/DataService';

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const MissionForm = ({ setData }) => {

    const { control, handleSubmit, formState: { errors } } = useFormContext();

    const requestTypes = [
        { value: 1, label: 'صدور حکم ماموریت' },
        { value: 2, label: 'تمدید ماموریت' },
    ];

    const missionTypes = [
        { value: 1, label: 'انفرادی' },
        { value: 2, label: 'گروهی' },
    ];

    const accommodations = [
        { value: 1, label: 'تامین شده' },
        { value: 2, label: 'تامین نشده' },
    ];

    const transportations = [
        { value: 1, label: 'اتوبوس' },
        { value: 2, label: 'هواپیما' },
        { value: 3, label: 'ماشین دولتی' },
        { value: 4, label: 'ماشین شخصی' },
    ];

    const mission_durations = [
        { value: 1, label: 'روز' },
        { value: 2, label: 'شب' },
        { value: 3, label: 'روز بدون توقف' },
    ];

    const [destination, setDestination] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateResponse = await api.get(`${getState()}`, { requiresAuth: true });
                setDestination(stateResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const renderTextField = (name, label) => (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
                <Box display="flex" alignItems="center" position="relative">
                    <TextField
                        autoComplete="off"
                        InputProps={{
                            style: { height: 45 },
                            inputProps: { style: { textAlign: 'center' } }
                        }}
                        label={label}
                        value={value}
                        onChange={(e) => {
                            const value = persianToEnglishDigits(e.target.value);
                            setData(prevValues => ({ ...prevValues, [name]: value }));
                            onChange(value);
                        }}
                        fullWidth
                        error={!!errors[name]}
                        helperText={errors?.[name]?.message || ''}
                    />
                </Box>
            )}
        />
    );

    const renderDatePicker = (name, label) => (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <DatePicker
                    value={value ? new Date(value * 1000) : null}
                    calendar={persian}
                    locale={persian_fa}
                    onChange={date => {
                        setTimeout(() => {
                            const unixDate = date ? date.toUnix() : null;
                            setData(prevValues => ({ ...prevValues, [name]: unixDate }));
                            onChange(unixDate);
                        }, 0);
                    }}
                    render={(value, onChange) => (
                        <TextField
                            autoComplete="off"
                            label={label}
                            value={value ? value : ''}
                            error={errors[name]}
                            helperText={errors?.[name]?.message || null}
                            onClick={e => {
                                const newValue = persianToEnglishDigits(e.target.value);
                                setTimeout(() => {
                                    setData(prevValues => ({ ...prevValues, [name]: newValue }));
                                    onChange(newValue);
                                }, 0);
                            }}
                            InputProps={{
                                style: { height: 45 },
                                inputProps: { style: { textAlign: 'center' } }
                            }}
                            fullWidth
                        />
                    )}
                />
            )}
        />
    );

    const renderSelect = (name, label, option) => (
        <FormControl fullWidth>
            <InputLabel id={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Select
                        value={value}
                        label={label}
                        onChange={e => {
                            const newValue = e.target.value;
                            setTimeout(() => {
                                setData(prevValues => ({ ...prevValues, [name]: newValue }));
                                onChange(newValue);
                                console.log("Data =>", newValue);
                                console.log("Errors => ", errors[name]);
                            }, 0);
                        }}
                        fullWidth
                        error={Boolean(errors[name])}
                        sx={{ height: 45 }}
                    >
                        {name == "destination" ? (
                            option.data && option.data.data.map(({ hierarchy_code, approved_name }) => (
                                <MenuItem key={hierarchy_code} value={hierarchy_code}>
                                    {approved_name}
                                </MenuItem>
                            ))
                        ) : option.map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );

    const onSubmit = (data) => {
        console.log("Data=>", data);
    }


    return (
        <Grid container spacing={2} mt={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container gap={5}>
                    <div className='mt-5 w-full text-center'>
                        <DividerSimple title={"ثبت درخواست ماموریت"} />
                    </div>
                    <div className='grid w-full gap-5'>
                        {renderSelect('request_type', 'نوع درخواست', requestTypes)}
                        {renderSelect('mission_type', 'نوع ماموریت', missionTypes)}
                        {renderTextField('subject', 'موضوع')}
                        {renderSelect('accommodation', 'محل اقامت', accommodations)}
                        {renderSelect('destination', 'مقصد ماموریت', destination)}
                        {renderSelect('transportation', 'وسیله نقلیه', transportations)}
                        {renderSelect('mission_duration', 'مدت ماموریت', mission_durations)}
                        {renderDatePicker('start_date', 'تاریخ شروع ماموریت')}
                        {renderTextField('description', 'شرح ماموریت')}
                    </div>
                </Grid>
                <Button className='mt-5' variant='contained' fullWidth color='success' type='submit' >ثبت</Button>
            </form>
        </Grid>
    );
}

export default MissionForm