import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { personalSchema } from './validation';
import { TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete } from '@mui/material';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import PersonalOptions from "@data/PersonalOption.json";
import Button from "@mui/material/Button";
import axios from 'axios';
import { GetFieldStudy } from "@/Services/humanResources";
import { styled } from '@mui/material/styles';

const CustomGrid = styled(Grid)(({ theme }) => ({
    maxWidth: '1300px',
    margin: '0 auto',
}));

const PersonalForm = ({ onNext }) => {
    const { formData, updateFormData } = useFormContext();
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: valibotResolver(personalSchema),
        defaultValues: formData
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
                    name='fullName'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            size="small"
                            fullWidth
                            label='نام و نام خانوادگی'
                            error={!!errors.fullName}
                            helperText={errors.fullName ? errors.fullName.message : ''}
                            onChange={e => onChangeHandler('fullName', e.target.value)}
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
                            onChange={e => onChangeHandler('fatherName', e.target.value)}
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
                            onChange={e => onChangeHandler('nationalId', e.target.value)}
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
