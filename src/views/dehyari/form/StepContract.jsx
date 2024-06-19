import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const StepContract = () => {
    const { register, watch } = useFormContext()

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
                        {...register('descriptionContract')}
                        value={watch('descriptionContract')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="عنوان قرارداد"
                        placeholder="عنوان قرارداد"
                        {...register('titleContract')}
                        value={watch('titleContract')}
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
                        <Select {...register('contractType')} label="نوع قرارداد" value={watch('contractType')}>
                            <MenuItem value="1">تمام وقت</MenuItem>
                            <MenuItem value="2">تمام وقت مشترک</MenuItem>
                            <MenuItem value="3">پاره وقت - ۱۷روز کارکرد</MenuItem>
                            <MenuItem value="4">۱۹ روز کارکرد</MenuItem>
                            <MenuItem value="5">۲۱ روز کارکرد</MenuItem>
                            <MenuItem value="6">۲۴ روز کارکرد</MenuItem>
                            <MenuItem value="7">۲۷ روز کارکرد</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت استخدام</InputLabel>
                        <Select {...register('employmentStatus')} label="وضعیت استخدام" value={watch('employmentStatus')}>
                            <MenuItem value="1">آزمون</MenuItem>
                            <MenuItem value="2">بدون آزمون</MenuItem>
                            <MenuItem value="3">دهیاری</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepContract
