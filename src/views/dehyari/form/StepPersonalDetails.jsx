import React from 'react';
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Typography, FormHelperText } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const StepPersonalDetails = ({ validation }) => {
    const { control, watch, formState: { errors } } = useFormContext();

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
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
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="birthPlace"
                        control={control}
                        defaultValue=""
                        rules={validation.birthPlace}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="محل تولد"
                                placeholder="محل تولد"
                                {...field}
                                error={!!errors.birthPlace}
                                helperText={errors.birthPlace && errors.birthPlace.message}
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
                            <TextField
                                fullWidth
                                size="small"
                                label="محل صدور شناسنامه"
                                placeholder="محل صدور"
                                {...field}
                                error={!!errors.issuancePlace}
                                helperText={errors.issuancePlace && errors.issuancePlace.message}
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
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
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
