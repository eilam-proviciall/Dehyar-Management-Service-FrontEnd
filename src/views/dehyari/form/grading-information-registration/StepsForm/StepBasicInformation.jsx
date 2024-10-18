// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'

// ThirdParty Imports
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { toast } from 'react-toastify';

// Component Imports
import DividerSimple from '@/components/common/Divider/DividerSimple'
import SectionLivingInformation from './SectionLivingInformation';

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepBasicInformation = ({ data, setData, step, setStep, mode }) => {
    const { control, handleSubmit, formState: { errors }, watch, setValue, setError } = useFormContext();

    const centralityStatus = [
        { value: 0, label: "نمیباشد" },
        { value: 1, label: "دهستان" },
        { value: 2, label: "بخش" },
        { value: 3, label: "شهرستان" },
        { value: 4, label: "استان" },
    ]

    const tourismStatus = [
        { value: 0, label: "نمیباشد" },
        { value: 1, label: "میباشد" }
    ]

    const fireStation = [
        { value: 0, label: "ندارد" },
        { value: 1, label: "دارد" }
    ]

    const [errorState, setErrorState] = useState(null);

    const selectedOrganizationType = watch("organization");
    useEffect(() => {
        if (selectedOrganizationType == 1) {
            setValue("state_grade", "");
            setValue("city_grade", "");
        } else {
            setValue("state_grade", " ");
            setValue("city_grade", " ");
        }
    }, [setValue, selectedOrganizationType]);


    console.log("Errors => ", errors);


    const renderTextField = (name, label) => (
        <FormControl fullWidth >
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        InputProps={
                            { style: { height: 45 }, inputProps: { style: { textAlign: 'center' } } }
                        }
                        label={label}
                        value={value}
                        onChange={(e) => {
                            const value = persianToEnglishDigits(e.target.value);
                            setData(prevValues => ({ ...prevValues, [name]: value }));
                            onChange(value);
                            if (!value) {
                                setError(name, { type: 'manual', message: 'این فیلد الزامی است' });
                            } else {
                                setError(name, { type: 'manual', message: '' }); // پاک کردن خطا
                            }
                            errorState !== null && setErrorState(null);
                        }}
                        fullWidth
                        error={!!errors[name]}
                        helperText={String(errors?.[name]?.message?.message || errors?.[name]?.message || errorState?.message?.[0] || '')}
                    />
                )}
            />
        </FormControl>
    );

    const renderSelect = (name, label, option, errorText) => (
        <FormControl fullWidth  >
            <InputLabel id={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { value = '', onChange } }) => (
                    <Select
                        value={value}
                        label={label}
                        onChange={e => {
                            const newValue = e.target.value;
                            setTimeout(() => {
                                setData(prevValues => ({ ...prevValues, [name]: newValue }));
                                onChange(newValue)
                            }, 0);
                        }}
                        fullWidth
                        error={errors[name]}
                        sx={{ height: 45 }}
                    >
                        {Object.entries(option.map(({ value, label }) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        )))}
                    </Select>
                )}
            />
        </FormControl>
    )

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
                            helperText={String(errors?.[name]?.message?.message || errors?.[name]?.message || errorState?.message?.[0] || '')}
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

    // const checkValues = (currentData) => {
    //     return Object.values(currentData).every(value => value !== null && value !== undefined && value !== '');
    // };

    const onSubmit = newData => {
        // data.organization_type === ''
        //     ? toast.error("شما باید یک سازمان را برای رفتن به مرحله بعد انتخاب نمایید", {
        //         position: "top-center",
        //         duration: 3000,
        //     })
        //     : checkValues(data) == false
        //         ? toast.error("شما باید تمامی مقادیر را تکمیل کنید", {
        //             position: "top-center",
        //             duration: 3000,
        //         })
        //         : setStep(1);
        console.log("new Data => ", newData);
        setStep(prevValue => prevValue + 1);
    }

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} mb={5}>
                <DividerSimple title={'اطلاعات پایه را وارد نمایید'} />
            </Grid>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <Grid container gap={5}>
                    <div className='grid md:grid-cols-4 w-full gap-5'>
                        {renderTextField('hierarchy_code', 'کد سلسله مراتبی', 'کد سلسله مراتبی الزامی است')}
                        {renderTextField('village_code', 'کد آبادی', 'کد آبادی مراتبی الزامی است')}
                        {renderTextField('national_id', 'شناسه ملی', 'شناسه ملی مراتبی الزامی است')}
                        {renderTextField('area_hectares', 'وسعت (هکتار)', 'وسعت الزامی است')}
                        {renderSelect('centralization', 'مرکزیت', centralityStatus, 'انتخاب مرکزیت الزامی است')}
                        {renderSelect('tourism_goal', 'هدف گردشگری', tourismStatus, 'انتخاب هدف گردشگری الزامی است')}
                        {renderTextField('postal_code', 'کد پستی', 'کد پستی الزامی است')}
                        {renderSelect('fire_station', 'پایگاه آتش نشانی', fireStation, 'انتخاب پایگاه آتش نشانی الزامی است')}
                        {renderDatePicker('foundation_date', 'تاریخ تاسیس', 'وارد کردن تاریخ تاسیس الزامی است')}
                        {renderTextField('grade', 'درجه', 'وارد کردن درجه الزامی است')}
                        {renderDatePicker('grade_date', 'تاریخ درجه بندی', 'وارد کردن تاریخ درجه بندی الزامی است')}
                        {data.organization == 1 ? (
                            [
                                renderTextField('state_grade', 'درجه شهرستان', 'وارد کردن درجه شهرستان الزامی است'),
                                renderTextField('city_grade', 'درجه استان', 'وارد کردن درجه استان الزامی است')
                            ]
                        ) : ''
                        }
                    </div>
                </Grid>
                <Box display={'flex'} mt={2} gap={5} justifyContent={'end'} >
                    <Button variant='contained' color='secondary' onClick={() => { setStep(prevValue => prevValue - 1) }}>برگشت</Button>
                    <Button variant='contained' color='primary' type='submit' >بعدی</Button>
                </Box>
            </form>
        </Grid>
    )
}

export default StepBasicInformation