import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from '@components/common/Divider/DividerSimple';
import PersonalOptions from '@data/PersonalOption.json';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const EditStepPersonalDetails = ({ validation }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title="اطلاعات شخصی" />
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
                        name="nationalCode"
                        control={control}
                        defaultValue=""
                        rules={validation.nationalCode}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="کد ملی"
                                placeholder="کد ملی"
                                {...field}
                                error={!!errors.nationalCode}
                                helperText={errors.nationalCode && errors.nationalCode.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.birthDate}>
                        <Controller
                            name="birthDate"
                            control={control}
                            defaultValue=""
                            rules={validation.birthDate}
                            render={({ field }) => (
                                <DatePicker
                                    value={field.value ? new Date(field.value * 1000) : ""}
                                    onChange={(date) => field.onChange(date ? date.toUnix() : "")}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ تولد"
                                            error={!!errors.birthDate}
                                            helperText={errors.birthDate && errors.birthDate.message}
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
                            defaultValue=""
                            rules={validation.gender}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="جنسیت"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value}
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
                                    {PersonalOptions.maritalStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
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
                                    {PersonalOptions.veteranStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
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
                                    {PersonalOptions.militaryServiceOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.militaryService && <FormHelperText>{errors.militaryService.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="phoneNumbers"
                        control={control}
                        defaultValue=""
                        rules={validation.phoneNumbers}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="شماره تماس"
                                placeholder="شماره تماس"
                                {...field}
                                error={!!errors.phoneNumbers}
                                helperText={errors.phoneNumbers && errors.phoneNumbers.message}
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
                                label="محل صدور"
                                placeholder="محل صدور"
                                {...field}
                                error={!!errors.issuancePlace}
                                helperText={errors.issuancePlace && errors.issuancePlace.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default EditStepPersonalDetails;
