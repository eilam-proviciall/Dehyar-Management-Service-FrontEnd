import React from 'react';
import { Grid, Divider, Card, CardContent, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Accordion, AccordionSummary, AccordionDetails, Button, FormHelperText } from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const StepEducation = ({ validation }) => {
    const { control, watch, setValue, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations'
    });

    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 }
    ];

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
    ];

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>تحصیلات</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {fields.map((item, index) => (
                            <Card key={item.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl fullWidth size="small" error={!!errors?.educations?.[index]?.degree}>
                                                <InputLabel>مدرک تحصیلی</InputLabel>
                                                <Controller
                                                    name={`educations.${index}.degree`}
                                                    control={control}
                                                    defaultValue=""
                                                    rules={validation.degree}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            label="مدرک تحصیلی"
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            value={field.value}
                                                        >
                                                            {educationDegrees.map(degree => (
                                                                <MenuItem key={degree.value} value={degree.value}>
                                                                    {degree.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                {errors?.educations?.[index]?.degree && <FormHelperText>{errors.educations[index].degree.message}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl fullWidth size="small" error={!!errors?.educations?.[index]?.fieldOfStudy}>
                                                <InputLabel>رشته تحصیلی</InputLabel>
                                                <Controller
                                                    name={`educations.${index}.fieldOfStudy`}
                                                    control={control}
                                                    defaultValue=""
                                                    rules={validation.fieldOfStudy}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            label="رشته تحصیلی"
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            value={field.value}
                                                        >
                                                            {fieldsOfStudy.map(fieldOfStudy => (
                                                                <MenuItem key={fieldOfStudy.value} value={fieldOfStudy.value}>
                                                                    {fieldOfStudy.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                {errors?.educations?.[index]?.fieldOfStudy && <FormHelperText>{errors.educations[index].fieldOfStudy.message}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Controller
                                                name={`educations.${index}.graduationDate`}
                                                control={control}
                                                defaultValue=""
                                                rules={validation.graduationDate}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        scrollSensitive={true}
                                                        calendar={persian}
                                                        locale={persian_fa}
                                                        calendarPosition="bottom-right"
                                                        onChange={(date) => field.onChange(date.unix)}
                                                        value={field.value}
                                                        render={
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                label="تاریخ اخذ مدرک تحصیلی"
                                                                error={!!errors?.educations?.[index]?.graduationDate}
                                                                helperText={errors?.educations?.[index]?.graduationDate && errors.educations[index].graduationDate.message}
                                                            />
                                                        }
                                                    />
                                                )}
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
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

export default StepEducation;
