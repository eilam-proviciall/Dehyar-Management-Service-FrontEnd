import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const StepPersonalDetails = () => {
    const { register, watch } = useFormContext()

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
                        {...register('fatherName')}
                        value={watch('fatherName')}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="کدملی"
                        placeholder="کد ملی"
                        {...register('nationalCode')}
                        value={watch('nationalCode')}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="شماره شناسنامه"
                        placeholder="شماره شناسنامه"
                        {...register('personalId')}
                        value={watch('personalId')}
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
                        {...register('birthPlace')}
                        value={watch('birthPlace')}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="محل صدور شناسنامه"
                        placeholder="محل صدور"
                        {...register('issuancePlace')}
                        value={watch('issuancePlace')}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>جنسیت</InputLabel>
                        <Select {...register('gender')} label="جنسیت" value={watch('gender')}>
                            <MenuItem value="1">مرد</MenuItem>
                            <MenuItem value="0">زن</MenuItem>
                        </Select>
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
                        <Select {...register('maritalStatus')} label="وضعیت تاهل" value={watch('maritalStatus')}>
                            <MenuItem value="0">مجرد</MenuItem>
                            <MenuItem value="1">متاهل</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت ایثارگری</InputLabel>
                        <Select {...register('veteranStatus')} label="وضعیت ایثارگری" value={watch('veteranStatus')}>
                            <MenuItem value="1">شهید</MenuItem>
                            <MenuItem value="2">جانباز</MenuItem>
                            <MenuItem value="3">رزمنده</MenuItem>
                            <MenuItem value="4">آزاده</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>نظام وظیفه</InputLabel>
                        <Select {...register('militaryService')} label="نظام وظیفه" value={watch('militaryService')}>
                            <MenuItem value="0">معاف</MenuItem>
                            <MenuItem value="1">انجام شده</MenuItem>
                            <MenuItem value="2">در حال انجام</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepPersonalDetails
