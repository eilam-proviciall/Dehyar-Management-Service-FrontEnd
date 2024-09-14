// React Imports
import React, { useState } from 'react'

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

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepBasicInformation = ({ data, setData, step, setStep }) => {
    const { control, formState: { errors } } = useFormContext();

    const organizations = [
        { value: 1, label: "دهیاری" },
        { value: 2, label: "شهرداری" }
    ]

    const centralityStatus = [
        { value: 0, label: "نمیباشد" },
        { value: 1, label: "دهستان" },
        { value: 2, label: "بخش" },
        { value: 3, label: "شهرستان" },
        { value: 4, label: "استان" },
    ]

    const dehyariStatus = [
        { value: 0, label: "استان" },
        { value: 1, label: "شهرستان" },
        { value: 2, label: "بخش" },
        { value: 3, label: "دهستان" },
        { value: 4, label: "روستا" },
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

    const renderTextField = (name, label) => (
        <FormControl fullWidth >
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        InputProps={
                            { style: { height: 45 } }
                        }
                        label={label}
                        value={value}
                        onChange={(e) => {
                            const value = persianToEnglishDigits(e.target.value);
                            setData(prevValues => ({ ...prevValues, [name]: value }));
                            onChange(value);
                            errorState !== null && setErrorState(null);
                        }}
                        fullWidth
                    />
                )}
            />
        </FormControl>
    );

    const renderSelect = (name, label, option) => (
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

    const renderDatePicker = (name, label) => (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        value={value}
                        calendar={persian}
                        locale={persian_fa}
                        onChange={date => {
                            const newDate = `${date.year}/${date.month}/${date.day}`
                            console.log("New Date => ", newDate);
                            setData(prevData => ({ ...prevData, [name]: newDate }))
                        }
                        }
                        render={(value, onChange) => (
                            <TextField
                                label={label}
                                value={value}
                                onClick={e => {
                                    const newValue = e.target.value;
                                    setTimeout(() => {
                                        setData(prevValues => ({ ...prevValues, [name]: newValue }));
                                        onChange(newValue)
                                    }, 0);
                                }}
                                InputProps={
                                    { style: { height: 45 } }
                                }
                                fullWidth
                            />
                        )}
                    />
                )}
            />
        </FormControl>
    );

    const checkValues = (currentData) => {
        return Object.values(currentData).every(value => value !== null && value !== undefined && value !== '');
    };

    const onSubmit = data => {
        console.log("Is Data => ", checkValues(data));
        data.organization_type === ''
            ? toast.error("شما باید یک سازمان را برای رفتن به مرحله بعد انتخاب نمایید", {
                position: "top-center",
                duration: 3000,
            })
            : checkValues(data) == false
                ? toast.error("شما باید تمامی مقادیر را تکمیل کنید", {
                    position: "top-center",
                    duration: 3000,
                })
                : setStep(1);
    }

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} mb={5}>
                <DividerSimple title={data.organization_type ? data.organization_type : 'سازمان مورد نظر خودتان را انتخاب کنید'} />
            </Grid>
            <form className='w-full'>
                <Grid container gap={5}>
                    <div className='grid md:grid-cols-4 w-full gap-5'>
                        {renderSelect('organization_type', 'انتخاب سازمان', organizations, 'انتخاب سازمان الزامی است')}
                        {renderTextField('hierarchical_code', 'کد سلسله مراتبی', 'کد سلسله مراتبی الزامی است')}
                        {renderTextField('village_code', 'کد آبادی', 'کد آبادی مراتبی الزامی است')}
                        {renderTextField('nid', 'شناسه ملی', 'شناسه ملی مراتبی الزامی است')}
                    </div>
                    <div className='grid md:grid-cols-4 w-full gap-5'>
                        {renderSelect('dehyari_status', 'انتخاب دهیاری', dehyariStatus, 'انتخاب دهیاری الزامی است')}
                        {renderTextField('wide', 'وسعت (هکتار)', 'وسعت الزامی است')}
                        {renderSelect('centrality_status', 'مرکزیت', centralityStatus, 'انتخاب مرکزیت الزامی است')}
                        {renderSelect('tourism_status', 'هدف گردشگری', tourismStatus, 'انتخاب هدف گردشگری الزامی است')}
                    </div>
                    <div className='grid md:grid-cols-3 w-full gap-5'>
                        {renderTextField('postal_code', 'کد پستی', 'کد پستی الزامی است')}
                        {renderSelect('fire_station', 'پایگاه آتش نشانی', fireStation, 'انتخاب پایگاه آتش نشانی الزامی است')}
                        {renderDatePicker('date_established', 'تاریخ تاسیس', 'وارد کردن تاریخ تاسیس الزامی است')}
                    </div>
                    <div className='grid md:grid-cols-4 w-full gap-5'>
                        {data.organization_type == 'شهرداری' ? (
                            [
                                renderTextField('grade_city', 'درجه شهرستان', 'وارد کردن درجه شهرستان الزامی است'),
                                renderTextField('grade_state', 'درجه استان', 'وارد کردن درجه استان الزامی است')
                            ]
                        ) : ''
                        }
                        {renderTextField('grade', 'درجه', 'وارد کردن درجه الزامی است')}
                        {renderDatePicker('date_grading', 'تاریخ درجه بندی', 'وارد کردن تاریخ درجه بندی الزامی است')}
                    </div>
                </Grid>
                <Box display={'flex'} mt={2} gap={5} justifyContent={'end'} >
                    <Button variant='contained' color='primary' onClick={() => { onSubmit(data) }} >بعدی</Button>
                </Box>
            </form>
        </Grid>
    )
}

export default StepBasicInformation