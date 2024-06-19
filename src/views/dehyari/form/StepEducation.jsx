import React from 'react'
import { Grid, Divider, Card, CardContent, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import Button from "@mui/material/Button";

const StepEducation = () => {
    const { control, register, watch, setValue, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations'
    })

    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 }
    ]

    const fieldsOfStudy = [
        { title: "مهندسی نرم‌افزار", value: 51 },
        { title: "مهندسی برق", value: 52 },
        { title: "مهندسی مکانیک", value: 53 },
        { title: "پزشکی", value: 54 },
        { title: "حقوق", value: 55 },
        { title: "مدیریت", value: 56 },
        { title: "اقتصاد", value: 57 },
        { title: "ریاضی", value: 58 },
        { title: "فیزیک", value: 59 },
        { title: "شیمی", value: 60 }
    ]

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
                                        <FormControl fullWidth size="small">
                                            <InputLabel>مدرک تحصیلی</InputLabel>
                                            <Select
                                                {...register(`educations.${index}.degree`, { required: 'این فیلد الزامی است' })}
                                                label="مدرک تحصیلی"
                                                value={watch(`educations.${index}.degree`)}
                                                error={!!errors?.educations?.[index]?.degree}
                                            >
                                                {educationDegrees.map(degree => (
                                                    <MenuItem key={degree.value} value={degree.value}>
                                                        {degree.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors?.educations?.[index]?.degree && <Typography color="error">{errors.educations[index].degree.message}</Typography>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>رشته تحصیلی</InputLabel>
                                            <Select
                                                {...register(`educations.${index}.fieldOfStudy`, { required: 'این فیلد الزامی است' })}
                                                label="رشته تحصیلی"
                                                value={watch(`educations.${index}.fieldOfStudy`)}
                                                error={!!errors?.educations?.[index]?.fieldOfStudy}
                                            >
                                                {fieldsOfStudy.map(field => (
                                                    <MenuItem key={field.value} value={field.value}>
                                                        {field.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors?.educations?.[index]?.fieldOfStudy && <Typography color="error">{errors.educations[index].fieldOfStudy.message}</Typography>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`educations.${index}.graduationDate`, date.unix)}
                                            value={watch(`educations.${index}.graduationDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ اخذ مدرک تحصیلی" />}
                                            {...register(`educations.${index}.graduationDate`, { required: 'این فیلد الزامی است' })}
                                            error={!!errors?.educations?.[index]?.graduationDate}
                                            helperText={errors?.educations?.[index]?.graduationDate && errors.educations[index].graduationDate.message}
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
                            onClick={() => append({ degree: '', fieldOfStudy: '', graduationDate: '' })}
                        >
                            افزودن
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default StepEducation
