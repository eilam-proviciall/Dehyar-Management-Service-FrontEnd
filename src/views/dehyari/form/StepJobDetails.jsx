import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Typography, InputAdornment } from '@mui/material'
import jobTitles from '@data/jobTitles.json'
import { useFormContext } from 'react-hook-form'

const StepJobDetails = ({ invoiceData }) => {
    const { register, watch } = useFormContext()

    return (
        <>
            <Grid item xs={12}>
                <div className='p-6 bg-actionHover rounded-xl'>
                    <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center'>
                                <Typography>شماره قرارداد:</Typography>
                                <TextField
                                    fullWidth
                                    size='small'
                                    value={invoiceData[0].id}
                                    InputProps={{
                                        disabled: true,
                                        startAdornment: <InputAdornment position='start'>#</InputAdornment>
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Typography className='min-is-[95px]' color='text.primary'>
                                یه شماره دیگه:
                            </Typography>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>پست سازمانی</InputLabel>
                        <Select {...register('jobTitle')} label="پست سازمانی" value={watch('jobTitle')}>
                            {Object.entries(jobTitles).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>دهیاری های تحت پوشش</InputLabel>
                        <Select {...register('coveredVillages')} label="دهیاری های تحت پوشش" value={watch('coveredVillages')}>
                            <MenuItem value="1">چم جنگل</MenuItem>
                            <MenuItem value="2">چم شیر</MenuItem>
                            <MenuItem value="3">سرکان</MenuItem>
                            <MenuItem value="4">سیاه سیاه</MenuItem>
                            <MenuItem value="5">15 خرداد</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="نام و نام خانوادگی"
                        placeholder="نام و نام خانوادگی"
                        {...register('fullName')}
                        value={watch('fullName')}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default StepJobDetails
