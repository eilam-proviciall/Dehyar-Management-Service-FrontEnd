import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { personalSchema } from './validation';
import { TextField, Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete } from '@mui/material';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import PersonalOptions from "@data/PersonalOption.json";
import axios from 'axios';
import { GetFieldStudy } from "@/Services/humanResources";

const PersonalForm = ({ onNext }) => {
    const { formData, updateFormData } = useFormContext();

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: valibotResolver(personalSchema),
        defaultValues: formData.personal
    });

    const [fieldsOfStudy, setFieldsOfStudy] = useState({});

    const fetchFieldsOfStudy = async (grade) => {
        grade = grade[0];
        try {
            const response = await axios.get(GetFieldStudy(), {
                params: { grade }
            });
            setFieldsOfStudy(prev => ({ ...prev, [grade]: response.data }));
        } catch (error) {
            console.error('Error fetching fields of study:', error);
        }
    };

    const handleDegreeChange = (e, field) => {
        field.onChange(e.target.value);
        if (e.target.value >= 44) {
            fetchFieldsOfStudy([e.target.value]);
        }
    };

    const onSubmit = data => {
        updateFormData('personal', data);
        onNext();
    };

    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سیکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 }
    ];

    const selectedDegree = watch('degree');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography className='font-medium' color='text.primary'>
                        اطلاعات شخصی
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='fullName'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                size="small"
                                {...field}
                                fullWidth
                                label='نام و نام خانوادگی'
                                error={!!errors.fullName}
                                helperText={errors.fullName ? errors.fullName.message : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='fatherName'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                fullWidth
                                label='نام پدر'
                                error={!!errors.fatherName}
                                helperText={errors.fatherName ? errors.fatherName.message : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='nationalId'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                size="small"
                                label='شماره شناسنامه'
                                error={!!errors.nationalId}
                                helperText={errors.nationalId ? errors.nationalId.message : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.birthDate}>
                        <Controller
                            name='birthDate'
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ تولد"
                                            error={!!errors.birthDate}
                                            helperText={errors.birthDate ? errors.birthDate.message : ''}
                                            inputProps={{
                                                style: { textAlign: 'end' }
                                            }}
                                        />
                                    }
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.gender}>
                        <InputLabel>جنسیت</InputLabel>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="جنسیت"
                                >
                                    {PersonalOptions.genderOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.degree}>
                        <InputLabel>مدرک تحصیلی</InputLabel>
                        <Controller
                            name='degree'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="مدرک تحصیلی"
                                    onChange={(e) => handleDegreeChange(e, field)}
                                    value={field.value}
                                >
                                    {educationDegrees.map(degree => (
                                        <MenuItem key={degree.value} value={degree.value}>
                                            {degree.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors?.degree &&
                            <FormHelperText>{errors.degree.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='fieldOfStudy'
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={fieldsOfStudy[selectedDegree] || []}
                                getOptionLabel={(option) => option.name || ''}
                                isOptionEqualToValue={(option, value) => option.code === value.code}
                                onChange={(_, value) => field.onChange(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="رشته تحصیلی"
                                        size="small"
                                        error={!!errors.fieldOfStudy}
                                        helperText={errors.fieldOfStudy ? errors.fieldOfStudy.message : ''}
                                        inputProps={{
                                            ...params.inputProps,
                                            style: { maxWidth: '300px' }
                                        }}
                                        disabled={!selectedDegree || selectedDegree < 44}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} className='flex justify-between'>
                    <Button variant='outlined' disabled>
                        بازگشت
                    </Button>
                    <Button variant='contained' type='submit'>
                        مرحله بعد
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PersonalForm;
