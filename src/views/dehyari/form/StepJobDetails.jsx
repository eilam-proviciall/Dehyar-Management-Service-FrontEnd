import React from 'react'
import {FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material'
import jobTitles from '@data/jobTitles.json'
import {Controller, useFormContext} from 'react-hook-form'
import DividerSimple from "@components/common/Divider/DividerSimple";
import Logo from "@core/svg/Logo";

const StepJobDetails = ({invoiceData, validation}) => {
    const {register, control, watch, formState: {errors}} = useFormContext()

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className='p-6 bg-actionHover rounded-xl'>
                        <div className='flex justify-between items-center'>
                            {/* لوگو در سمت راست */}
                            <Grid item xs={4}>
                                <div style={{width:200}} className='flex justify-start'>
                                    <Logo />
                                </div>
                            </Grid>


                            {/* متن در وسط */}
                            <Grid item xs={4}>
                                <div className='flex flex-col items-center'>
                                    <Typography variant='h6'>قرارداد مدت معین و حکم حقوقی</Typography>
                                    <Typography variant='h6'>دهیار تمام وقت</Typography>
                                </div>
                            </Grid>

                            {/* فرم در سمت چپ */}
                            <Grid item xs={4}>
                                <div className='flex flex-col gap-2'>
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
                                    <div className='flex items-center gap-4'>
                                        <Typography  color='text.primary'>
                                            تاریخ اجرا
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            value={invoiceData[0].id}
                                            InputProps={{
                                                disabled: true,
                                                startAdornment: <InputAdornment position='start'>1403/04/04</InputAdornment>
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='ساختار تشکیلات'/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.jobTitle}>
                        <InputLabel>پست سازمانی</InputLabel>
                        <Controller
                            name='jobTitle'
                            control={control}
                            defaultValue=""
                            rules={validation.jobTitle}
                            render={({field}) => (
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
                            render={({field}) => (
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
                        {errors.coveredVillages &&
                            <Typography color="error">{errors.coveredVillages.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='nationalCode'
                        control={control}
                        defaultValue=""
                        rules={validation.nationalCode}
                        render={({field}) => (
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
