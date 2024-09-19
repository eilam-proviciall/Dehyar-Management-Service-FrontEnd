import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import validationSchemas from './validation';
import { TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete } from '@mui/material';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import PersonalOptions from "@data/PersonalOption.json";
import Button from "@mui/material/Button";
import { GetFieldStudy } from "@/Services/humanResources";
import { styled } from '@mui/material/styles';
import api from '@/utils/axiosInstance';

const CustomGrid = styled(Grid)(({ theme }) => ({
    maxWidth: '1300px',
    margin: '0 auto',
}));

const PersonalForm = ({ onNext }) => {
    const { formData, updateFormData } = useFormContext();
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: formData,
        mode: 'onChange', // Enable live validation
    });

    const [fieldsOfStudy, setFieldsOfStudy] = useState({});
    const renderError = (name) => {
        const field = name.split('.').reduce((o, i) => o[i], validationSchemas);
        return errors[name] ? field.required : '';
    };

    const fetchFieldsOfStudy = async (grade) => {
        grade = grade[0];
        try {
            const response = await api.get(GetFieldStudy(), {
                requiresAuth: true,
                params: { grade }
            });
            setFieldsOfStudy(prev => ({ ...prev, [grade]: response.data }));
        } catch (error) { return error }
    };

    const handleDegreeChange = (e, field) => {
        onChangeHandler('degree', e.target.value);
        field.onChange(e);
        if (e.target.value >= 44) {
            fetchFieldsOfStudy([e.target.value]);
        }
    };

    const onChangeHandler = (field, value) => {
        setValue(field, value);
        updateFormData({ [field]: value });
    };

    const onSubmit = data => {
        updateFormData(data);
        onNext();
    };

    const selectedDegree = watch('degree');

    return (
        <CustomGrid container spacing={5}>
            <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                    اطلاعات شخصی
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: validationSchemas.personalDetails.firstName.required }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            size="small"
                            fullWidth
                            label='نام'
                            error={!!errors.firstName}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                            onChange={e => {
                                onChangeHandler('firstName', e.target.value);
                                field.onChange(e);
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: validationSchemas.personalDetails.lastName.required }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            size="small"
                            fullWidth
                            label='نام خانوادگی'
                            error={!!errors.lastName}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                            onChange={e => {
                                onChangeHandler('lastName', e.target.value);
                                field.onChange(e);
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name='fatherName'
                    control={control}
                    rules={{ required: validationSchemas.personalDetails.fatherName.required }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            size="small"
                            fullWidth
                            label='نام پدر'
                            error={!!errors.fatherName}
                            helperText={errors.fatherName ? errors.fatherName.message : ''}
                            onChange={e => {
                                onChangeHandler('fatherName', e.target.value);
                                field.onChange(e);
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name='personalId'
                    control={control}
                    rules={{ required: validationSchemas.personalDetails.personalId.required }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label='شماره شناسنامه'
                            error={!!errors.personalId}
                            helperText={errors.personalId ? errors.personalId.message : ''}
                            onChange={e => {
                                onChangeHandler('personalId', e.target.value);
                                field.onChange(e);
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small" error={!!errors.birthDate}>
                    <Controller
                        name='birthDate'
                        control={control}
                        defaultValue=""
                        rules={{ required: validationSchemas.personalDetails.birthDate.required }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={date => onChangeHandler('birthDate', date.toUnix())}
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
                        rules={{ required: validationSchemas.personalDetails.gender.required }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="جنسیت"
                                onChange={e => {
                                    onChangeHandler('gender', e.target.value);
                                    field.onChange(e);
                                }}
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
                        rules={{ required: validationSchemas.personalDetails.degree.required }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="مدرک تحصیلی"
                                onChange={e => handleDegreeChange(e, field)}
                            >
                                {PersonalOptions.degreeOptions.map(degree => (
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
            {selectedDegree >= 44 && (
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='fieldOfStudy'
                        control={control}
                        rules={{ required: validationSchemas.personalDetails.fieldOfStudy.required }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={fieldsOfStudy[selectedDegree] || []}
                                getOptionLabel={(option) => option.name || ''}
                                isOptionEqualToValue={(option, value) => option.code === value.code}
                                onChange={(_, value) => onChangeHandler('fieldOfStudy', value.code)}
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
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.code}>
                                        {option.name}
                                    </li>
                                )}
                            />
                        )}
                    />
                </Grid>
            )}
            <Grid item xs={12} className='flex justify-between'>
                <Button variant='outlined' disabled>
                    بازگشت
                </Button>
                <Button variant='contained' onClick={handleSubmit(onSubmit)}>
                    مرحله بعد
                </Button>
            </Grid>
        </CustomGrid>
    );
};

export default PersonalForm;
