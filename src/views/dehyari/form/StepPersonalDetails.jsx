import React from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";
import { useFetchCities } from "@hooks/useFetchCities";
import Autocomplete from "@mui/material/Autocomplete";

const StepPersonalDetails = ({ validation }) => {
    const { control, formState: { errors } } = useFormContext();
    const { cities, isLoading, error } = useFetchCities(true);

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='اطلاعات شخصی' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue=""
                        rules={validation.fullName}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="نام و نام خانوادگی"
                                placeholder="نام و نام خانوادگی"
                                {...field}
                                error={!!errors.fullName}
                                helperText={errors.fullName && errors.fullName.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="fatherName"
                        control={control}
                        defaultValue=""
                        rules={validation.fatherName}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="نام پدر"
                                placeholder="نام پدر"
                                {...field}
                                error={!!errors.fatherName}
                                helperText={errors.fatherName && errors.fatherName.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="personalId"
                        control={control}
                        defaultValue=""
                        rules={validation.personalId}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="شماره شناسنامه"
                                placeholder="شماره شناسنامه"
                                {...field}
                                error={!!errors.personalId}
                                helperText={errors.personalId && errors.personalId.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="birthPlace"
                        control={control}
                        defaultValue=""
                        rules={validation.birthPlace}
                        render={({ field }) => (
                            <Autocomplete
                                options={cities}
                                getOptionLabel={(option) => `${option.state.approved_name}-${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue ? newValue.hierarchy_code : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...field}
                                        size="small"
                                        label='محل تولد'
                                        error={!!errors.birthPlace}
                                        helperText={errors.birthPlace && errors.birthPlace.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="issuancePlace"
                        control={control}
                        defaultValue=""
                        rules={validation.issuancePlace}
                        render={({ field }) => (
                            <Autocomplete
                                options={cities}
                                getOptionLabel={(option) => `${option.state.approved_name}-${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue ? newValue.hierarchy_code : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...field}
                                        size="small"
                                        label='محل صدور شناسنامه'
                                        error={!!errors.issuancePlace}
                                        helperText={errors.issuancePlace && errors.issuancePlace.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.gender}>
                        <InputLabel>جنسیت</InputLabel>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            rules={validation.gender}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="جنسیت"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
                                >
                                    <MenuItem value="1">مرد</MenuItem>
                                    <MenuItem value="0">زن</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.maritalStatus}>
                        <InputLabel>وضعیت تاهل</InputLabel>
                        <Controller
                            name="maritalStatus"
                            control={control}
                            defaultValue=""
                            rules={validation.maritalStatus}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="وضعیت تاهل"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
                                >
                                    <MenuItem value="0">مجرد</MenuItem>
                                    <MenuItem value="1">متاهل</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.maritalStatus && <FormHelperText>{errors.maritalStatus.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.veteranStatus}>
                        <InputLabel>وضعیت ایثارگری</InputLabel>
                        <Controller
                            name="veteranStatus"
                            control={control}
                            defaultValue=""
                            rules={validation.veteranStatus}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="وضعیت ایثارگری"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
                                >
                                    <MenuItem value="1">شهید</MenuItem>
                                    <MenuItem value="2">جانباز</MenuItem>
                                    <MenuItem value="3">رزمنده</MenuItem>
                                    <MenuItem value="4">آزاده</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.veteranStatus && <FormHelperText>{errors.veteranStatus.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.militaryService}>
                        <InputLabel>نظام وظیفه</InputLabel>
                        <Controller
                            name="militaryService"
                            control={control}
                            defaultValue=""
                            rules={validation.militaryService}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="نظام وظیفه"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
                                >
                                    <MenuItem value="0">معاف</MenuItem>
                                    <MenuItem value="1">انجام شده</MenuItem>
                                    <MenuItem value="2">در حال انجام</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.militaryService && <FormHelperText>{errors.militaryService.message}</FormHelperText>}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepPersonalDetails;
