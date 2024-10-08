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

const StepCountryDivision = ({ data, setData, step, setStep, mode }) => {
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useFormContext();

    const organizations = [
        { value: 1, label: "شهرداری" },
        { value: 2, label: "دهیاری" },
    ]
    const [errorState, setErrorState] = useState(null);

    const selectedOrganizationType = watch("organization"); // مشاهده نوع سازمان انتخاب‌شده
    useEffect(() => {
        if (selectedOrganizationType === 'شهرداری') {
            setValue("state_grade", "");
            setValue("city_grade", "");
        } else {
            setValue("state_grade", " ");
            setValue("city_grade", " ");
        }
    }, [setValue, selectedOrganizationType]);

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
                            <MenuItem key={value} value={label}>{label}</MenuItem>
                        )))}
                    </Select>
                )}
            />
        </FormControl>
    )

    // const checkValues = (currentData) => {
    //     return Object.values(currentData).every(value => value !== null && value !== undefined && value !== '');
    // };

    const onSubmit = newData => {
        console.log("new Data => ", newData);
        setStep(prevValue => prevValue + 1);
    }

    console.log("Errors => ", errors);


    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} mb={5}>
                <DividerSimple title={data.organization ? data.organization : 'سازمان مورد نظر خودتان را انتخاب کنید'} />
            </Grid>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <Grid container gap={5}>
                    <div className='grid md:grid-cols-3 w-full gap-5'>
                        <br />
                        {renderSelect('organization', 'انتخاب سازمان', organizations, 'انتخاب سازمان الزامی است')}
                        <br />
                        {console.log("Organization Type  => ", data.organization)}
                    </div>
                    {data.organization !== '' && (
                        <SectionLivingInformation fieldKey={data.organization == "شهرداری" ? 'municipality' : 'dehyari'} setData={setData} mode={mode} />
                    )}
                </Grid>
                <Box display={'flex'} mt={2} gap={5} justifyContent={'end'} >
                    <Button variant='contained' color='primary' type='submit' >بعدی</Button>
                </Box>
            </form>
        </Grid>
    )
}

export default StepCountryDivision