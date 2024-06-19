import React from 'react'
import { Grid, Divider, Card, CardContent, IconButton, TextField } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import Button from "@mui/material/Button";

const StepInsurance = () => {
    const { control, register, watch, setValue, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'insurances'
    })

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12}>
                    {fields.map((item, index) => (
                        <Card key={item.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="دهیاری محل خدمت"
                                            {...register(`insurances.${index}.workplace`, { required: 'این فیلد الزامی است' })}
                                            value={watch(`insurances.${index}.workplace`)}
                                            error={!!errors?.insurances?.[index]?.workplace}
                                            helperText={errors?.insurances?.[index]?.workplace && errors.insurances[index].workplace.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="سابقه بیمه (ماه)"
                                            {...register(`insurances.${index}.insurancePeriod`, { required: 'این فیلد الزامی است' })}
                                            value={watch(`insurances.${index}.insurancePeriod`)}
                                            error={!!errors?.insurances?.[index]?.insurancePeriod}
                                            helperText={errors?.insurances?.[index]?.insurancePeriod && errors.insurances[index].insurancePeriod.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`insurances.${index}.employmentStartDate`, date.unix)}
                                            value={watch(`insurances.${index}.employmentStartDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ شروع" />}
                                            {...register(`insurances.${index}.employmentStartDate`, { required: 'این فیلد الزامی است' })}
                                            error={!!errors?.insurances?.[index]?.employmentStartDate}
                                            helperText={errors?.insurances?.[index]?.employmentStartDate && errors.insurances[index].employmentStartDate.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`insurances.${index}.employmentEndDate`, date.unix)}
                                            value={watch(`insurances.${index}.employmentEndDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ پایان" />}
                                            {...register(`insurances.${index}.employmentEndDate`, { required: 'این فیلد الزامی است' })}
                                            error={!!errors?.insurances?.[index]?.employmentEndDate}
                                            helperText={errors?.insurances?.[index]?.employmentEndDate && errors.insurances[index].employmentEndDate.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <IconButton color="error" aria-label="delete" size="large" onClick={() => remove(index)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Grid item xs={12} sx={{ px: 0 }} pt={5}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => append({ workplace: '', insurancePeriod: '', insuranceType: '', employmentStartDate: '', employmentEndDate: '' })}
                        >
                            افزودن
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default StepInsurance
