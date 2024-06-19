import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import Typography from "@mui/material/Typography";

const StepPersonalDetails = () => {
    const { register, watch, formState: { errors } } = useFormContext()

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="نام پدر"
                        placeholder="نام پدر"
                        {...register('fatherName', { required: 'این فیلد الزامی است' })}
                        value={watch('fatherName')}
                        error={!!errors.fatherName}
                        helperText={errors.fatherName && errors.fatherName.message}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="کدملی"
                        placeholder="کد ملی"
                        {...register('nationalCode', { required: 'این فیلد الزامی است' })}
                        value={watch('nationalCode')}
                        error={!!errors.nationalCode}
                        helperText={errors.nationalCode && errors.nationalCode.message}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="شماره شناسنامه"
                        placeholder="شماره شناسنامه"
                        {...register('personalId', { required: 'این فیلد الزامی است' })}
                        value={watch('personalId')}
                        error={!!errors.personalId}
                        helperText={errors.personalId && errors.personalId.message}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="محل تولد"
                        placeholder="محل تولد"
                        {...register('birthPlace', { required: 'این فیلد الزامی است' })}
                        value={watch('birthPlace')}
                        error={!!errors.birthPlace}
                        helperText={errors.birthPlace && errors.birthPlace.message}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="محل صدور شناسنامه"
                        placeholder="محل صدور"
                        {...register('issuancePlace', { required: 'این فیلد الزامی است' })}
                        value={watch('issuancePlace')}
                        error={!!errors.issuancePlace}
                        helperText={errors.issuancePlace && errors.issuancePlace.message}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>جنسیت</InputLabel>
                        <Select
                            {...register('gender', { required: 'این فیلد الزامی است' })}
                            label="جنسیت"
                            value={watch('gender')}
                            error={!!errors.gender}
                        >
                            <MenuItem value="1">مرد</MenuItem>
                            <MenuItem value="0">زن</MenuItem>
                        </Select>
                        {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت تاهل</InputLabel>
                        <Select
                            {...register('maritalStatus', { required: 'این فیلد الزامی است' })}
                            label="وضعیت تاهل"
                            value={watch('maritalStatus')}
                            error={!!errors.maritalStatus}
                        >
                            <MenuItem value="0">مجرد</MenuItem>
                            <MenuItem value="1">متاهل</MenuItem>
                        </Select>
                        {errors.maritalStatus && <Typography color="error">{errors.maritalStatus.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت ایثارگری</InputLabel>
                        <Select
                            {...register('veteranStatus', { required: 'این فیلد الزامی است' })}
                            label="وضعیت ایثارگری"
                            value={watch('veteranStatus')}
                            error={!!errors.veteranStatus}
                        >
                            <MenuItem value="1">شهید</MenuItem>
                            <MenuItem value="2">جانباز</MenuItem>
                            <MenuItem value="3">رزمنده</MenuItem>
                            <MenuItem value="4">آزاده</MenuItem>
                        </Select>
                        {errors.veteranStatus && <Typography color="error">{errors.veteranStatus.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>نظام وظیفه</InputLabel>
                        <Select
                            {...register('militaryService', { required: 'این فیلد الزامی است' })}
                            label="نظام وظیفه"
                            value={watch('militaryService')}
                            error={!!errors.militaryService}
                        >
                            <MenuItem value="0">معاف</MenuItem>
                            <MenuItem value="1">انجام شده</MenuItem>
                            <MenuItem value="2">در حال انجام</MenuItem>
                        </Select>
                        {errors.militaryService && <Typography color="error">{errors.militaryService.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepPersonalDetails
