import React, {useEffect, useState} from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Typography, InputAdornment } from '@mui/material'
import jobTitles from '@data/jobTitles.json'
import {Controller, useFormContext} from 'react-hook-form'
import DividerSimple from "@components/common/Divider/DividerSimple";

const StepJobDetails = ({ invoiceData, validation }) => {
    const { register,control, watch, formState: { errors } } = useFormContext()

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
                    <DividerSimple title='اطلاعات تکمیلی'/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.jobTitle}>
                        <InputLabel>پست سازمانی</InputLabel>
                        <Controller
                            name='jobTitle'
                            control={control}
                            defaultValue=""
                            rules={validation.jobTitle}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="پست سازمانی"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    value={field.value || ''}
                                >
                                    {Object.entries(jobTitles).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.coveredVillages}>
                        <InputLabel>دهیاری های تحت پوشش</InputLabel>
                        <Controller
                            name='coveredVillages'
                            control={control}
                            defaultValue=""
                            rules={validation.coveredVillages}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="دهیاری های تحت پوشش"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    value={field.value || ''}
                                >
                                    <MenuItem value="1">چم جنگل</MenuItem>
                                    <MenuItem value="2">چم شیر</MenuItem>
                                    <MenuItem value="3">سرکان</MenuItem>
                                    <MenuItem value="4">سیاه سیاه</MenuItem>
                                    <MenuItem value="5">15 خرداد</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.coveredVillages && <Typography color="error">{errors.coveredVillages.message}</Typography>}
                    </FormControl>
                </Grid>
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
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                value={field.value || ''}
                                error={!!errors.nationalCode}
                                helperText={errors.nationalCode && errors.nationalCode.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default StepJobDetails
