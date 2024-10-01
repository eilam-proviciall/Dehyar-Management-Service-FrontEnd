import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from '@components/common/Divider/DividerSimple';
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useFetchCities } from '@hooks/useFetchCities';
import Chip from '@mui/material/Chip';
import PersonalOptions from '@data/PersonalOption.json';
import { toast } from 'react-toastify';

const EditStepPersonalDetails = ({ validation }) => {
    const { control, register, getValues, setValue, formState: { errors } } = useFormContext();
    const { cities, isLoading, error } = useFetchCities(true);

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{1,11}$/;
        if (!phoneRegex.test(phoneNumber)) {
            toast.error('شماره تلفن باید حداکثر ۱۱ رقم و فقط شامل اعداد انگلیسی باشد', {
                position: "top-center"
            });
            return false;
        }
        return true;
    };

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='اطلاعات شخصی' />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={validation.firstName}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="نام"
                                placeholder="نام"
                                {...field}
                                error={!!errors.firstName}
                                helperText={errors.firstName && errors.firstName.message}
                            />
                        )}
                    />
                </Grid>
                {/* نام خانوادگی */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={validation.lastName}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="نام خانوادگی"
                                placeholder="نام خانوادگی"
                                {...field}
                                error={!!errors.lastName}
                                helperText={errors.lastName && errors.lastName.message}
                            />
                        )}
                    />
                </Grid>
                {/* نام پدر */}
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

                {/* کد ملی */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='nationalCode'
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
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value || ''}
                                error={!!errors.nationalCode}
                                helperText={errors.nationalCode && errors.nationalCode.message}
                            />
                        )}
                    />
                </Grid>

                {/* تاریخ تولد */}
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <Controller
                            name="birthDate"
                            control={control}
                            defaultValue=""
                            rules={validation.birthDate}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    value={value ? new Date(value * 1000) : ""}
                                    onChange={(date) => onChange(date ? date.toUnix() : "")}
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

                {/* شماره شناسنامه */}
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

                {/* محل تولد */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="birthPlace"
                        control={control}
                        defaultValue=""
                        rules={validation.birthPlace}
                        render={({ field }) => (
                            <Autocomplete
                                options={cities}
                                value={cities.find(option => option.hierarchy_code === field.value) || null} // تنظیم مقدار پیش‌فرض
                                getOptionLabel={(option) => `${option.state.approved_name}-${option.approved_name}`}
                                isOptionEqualToValue={(option, value) => option.hierarchy_code === value} // مقایسه درست آیتم
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

                {/* محل صدور */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="issuancePlace"
                        control={control}
                        defaultValue=""
                        rules={validation.issuancePlace}
                        render={({ field }) => (
                            <Autocomplete
                                options={cities}
                                value={cities.find(option => option.hierarchy_code === field.value) || null} // تنظیم مقدار پیش‌فرض
                                getOptionLabel={(option) => `${option.state.approved_name}-${option.approved_name}`}
                                isOptionEqualToValue={(option, value) => option.hierarchy_code === value} // مقایسه درست آیتم
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

                {/* جنسیت */}
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

                {/* وضعیت تاهل */}
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

                {/* وضعیت ایثارگری */}
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

                {/* نظام وظیفه */}
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
                {/* کدپستی */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="postalCode"
                        control={control}
                        defaultValue=""
                        rules={validation.postalCode}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="کدپستی"
                                placeholder="کدپستی"
                                {...field}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode && errors.postalCode.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Controller
                        name="insuranceIdentifier"
                        control={control}
                        defaultValue=""
                        rules={validation.insuranceIdentifier}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="شناسه تامین اجتماعی"
                                placeholder="شناسه تامین اجتماعی"
                                {...field}
                                error={!!errors.insuranceIdentifier}
                                helperText={errors.insurance_identifier && errors.insuranceIdentifier.message}
                            />
                        )}
                    />
                </Grid>

                {/* شماره تماس ثابت */}
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="landlineNumber"
                        control={control}
                        defaultValue=""
                        rules={validation.landlineNumber}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="شماره تماس ثابت"
                                placeholder="شماره تماس ثابت"
                                {...field}
                                error={!!errors.landlineNumber}
                                helperText={errors.landlineNumber && errors.landlineNumber.message}
                            />
                        )}
                    />
                </Grid>

                {/* آدرس محل سکونت */}
                <Grid item xs={12} sm={12}>
                    <Controller
                        name="residenceAddress"
                        control={control}
                        defaultValue=""
                        rules={validation.residenceAddress}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="آدرس محل سکونت"
                                placeholder="آدرس محل سکونت"
                                {...field}
                                error={!!errors.residenceAddress}
                                helperText={errors.residenceAddress && errors.residenceAddress.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default EditStepPersonalDetails;
