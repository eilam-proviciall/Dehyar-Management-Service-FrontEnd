import React from 'react'
import { Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import contractType from "@data/contractType.json";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DividerSimple from "@components/common/Divider/DividerSimple";

const StepContract = ({ validation }) => {
    const { register, watch,getValues,setValue, formState: { errors } } = useFormContext()

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='اطلاعات قرار داد' />
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

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <DatePicker
                            scrollSensitive={true}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            {...register('execute_start', validation.contractStart)}
                            onChange={(date) => setValue('execute_start', date.toUnix())}
                            value={getValues('execute_start')}
                            render={
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="تاریخ اجرای قرارداد"
                                    name="contractStart"
                                    error={!!errors.execute_start}
                                    placeholder="تاریخ اجرای قرارداد"
                                    inputProps={{
                                        style: { textAlign: 'end' }
                                    }}
                                />
                            }
                        />
                        {errors.execute_start && <Typography color="error">{errors.execute_start.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        multiline
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
                    <FormControl fullWidth size="small">
                        <DatePicker
                            scrollSensitive={true}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            {...register('contractStart', validation.contractStart)}
                            onChange={(date) => setValue('contractStart', date.toUnix())}
                            value={getValues('contractStart')}
                            render={
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="تاریخ شروع قرارداد"
                                    name="contractStart"
                                    error={!!errors.contractStart}
                                    placeholder="تاریخ شروع قرارداد"
                                    inputProps={{
                                        style: { textAlign: 'end' }
                                    }}
                                />
                            }
                        />
                        {errors.contractStart && <Typography color="error">{errors.contractStart.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <DatePicker
                            scrollSensitive={true}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            {...register('contractEnd', validation.contractStart)}
                            onChange={(date) => setValue('contractEnd', date.toUnix())}
                            value={getValues('contractEnd')}
                            render={
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="تاریخ پایان قرارداد"
                                    name="contractStart"
                                    error={!!errors.contractEnd}
                                    placeholder="تاریخ پایان قرارداد"
                                    inputProps={{
                                        style: { textAlign: 'end' }
                                    }}
                                />
                            }
                        />
                        {errors.contractEnd && <Typography color="error">{errors.contractEnd.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default StepContract
