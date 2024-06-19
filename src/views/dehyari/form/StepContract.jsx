import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const StepContract = ({ validation }) => {
    const { register, watch, formState: { errors } } = useFormContext()

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="شرح قرارداد"
                        placeholder="شرح قرارداد"
                        {...register('descriptionContract', validation.descriptionContract)}
                        value={watch('descriptionContract')}
                        error={!!errors.descriptionContract}
                        helperText={errors.descriptionContract && errors.descriptionContract.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="عنوان قرارداد"
                        placeholder="عنوان قرارداد"
                        {...register('titleContract', validation.titleContract)}
                        value={watch('titleContract')}
                        error={!!errors.titleContract}
                        helperText={errors.titleContract && errors.titleContract.message}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel>نوع قرارداد</InputLabel>
                        <Select
                            {...register('contractType', validation.contractType)}
                            label="نوع قرارداد"
                            value={watch('contractType')}
                            error={!!errors.contractType}
                        >
                            <MenuItem value="1">تمام وقت</MenuItem>
                            <MenuItem value="2">تمام وقت مشترک</MenuItem>
                            <MenuItem value="3">پاره وقت - ۱۷روز کارکرد</MenuItem>
                            <MenuItem value="4">۱۹ روز کارکرد</MenuItem>
                            <MenuItem value="5">۲۱ روز کارکرد</MenuItem>
                            <MenuItem value="6">۲۴ روز کارکرد</MenuItem>
                            <MenuItem value="7">۲۷ روز کارکرد</MenuItem>
                        </Select>
                        {errors.contractType && <Typography color="error">{errors.contractType.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت استخدام</InputLabel>
                        <Select
                            {...register('employmentStatus', validation.employmentStatus)}
                            label="وضعیت استخدام"
                            value={watch('employmentStatus')}
                            error={!!errors.employmentStatus}
                        >
                            <MenuItem value="1">آزمون</MenuItem>
                            <MenuItem value="2">بدون آزمون</MenuItem>
                            <MenuItem value="3">دهیاری</MenuItem>
                        </Select>
                        {errors.employmentStatus && <Typography color="error">{errors.employmentStatus.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepContract
