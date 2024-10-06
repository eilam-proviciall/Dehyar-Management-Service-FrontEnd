import DividerSimple from '@/components/common/Divider/DividerSimple';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const TimeOffForm = ({ setData }) => {

    const { control, handleSubmit, formState: { errors } } = useFormContext();

    const types = [
        { value: 1, label: 'استحقاقی' },
        { value: 2, label: 'استعلاجی' },
    ];

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
                    {name == "duration" && (
                        <Box
                            sx={{
                                position: 'absolute',
                                right: '10px',
                                backgroundColor: 'yellowgreen',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                            }}
                        >
                            <Typography variant="body2" className='text-backgroundPaper'>روز</Typography>
                        </Box>
                    )}
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
                        {option.map(({ value, label }) => (
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
                        <DividerSimple title={"ثبت درخواست مرخصی"} />
                    </div>
                    <div className='grid w-full gap-5'>
                        {renderSelect('type', 'نوع مرخصی', types)}
                        {renderDatePicker('start_date', 'تاریخ شروع')}
                        {renderTextField('duration', 'مدت مرخصی')}
                    </div>
                    <div className='grid w-full gap-5'>
                        {renderTextField('attachment_file', 'مدرک پیوست')}
                        {renderTextField('user_id', 'انتخاب بخشدار مربوطه')}
                    </div>
                </Grid>
                <Button className='mt-5' variant='contained' fullWidth color='success' type='submit' >ثبت</Button>
            </form>
        </Grid>
    )
}

export default TimeOffForm