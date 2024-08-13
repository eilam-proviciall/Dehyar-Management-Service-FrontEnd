"use client";
import React, { useState, useEffect } from 'react';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Typography, Box, Chip, Avatar } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from '@components/common/Divider/DividerSimple';
import AddIcon from '@mui/icons-material/Add';

const EditStepEducation = ({ validation }) => {
    const { control, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations',
    });

    const [expanded, setExpanded] = useState(false);
    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سیکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 },
    ];

    useEffect(() => {
        if (Object.keys(errors.educations || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.educations]);

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title="سوابق تحصیلی" />
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography>سوابق تحصیلی</Typography>
                            <Chip
                                avatar={<Avatar>{/* محاسبه بالاترین مدرک */}</Avatar>}
                                label="آخرین مدرک"
                                variant="outlined"
                                style={{
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {fields.map((item, index) => (
                            <Card key={item.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <Controller
                                                name={`educations[${index}].degree`}
                                                control={control}
                                                defaultValue={item.degree}
                                                render={({ field }) => (
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>مدرک تحصیلی</InputLabel>
                                                        <Select
                                                            {...field}
                                                            label="مدرک تحصیلی"
                                                        >
                                                            {educationDegrees.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Controller
                                                name={`educations[${index}].fieldOfStudy`}
                                                control={control}
                                                defaultValue={item.fieldOfStudy}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="رشته تحصیلی"
                                                        placeholder="رشته تحصیلی"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth size="small">
                                                <Controller
                                                    name={`educations[${index}].graduationDate`}
                                                    control={control}
                                                    defaultValue={item.graduationDate}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            value={field.value ? new Date(field.value * 1000) : ""}
                                                            onChange={(date) => field.onChange(date ? date.toUnix() : "")}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            render={
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    label="تاریخ فارغ‌التحصیلی"
                                                                    inputProps={{
                                                                        style: { textAlign: 'end' }
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <IconButton
                                                aria-label="حذف"
                                                onClick={() => remove(index)}
                                                sx={{ mt: 2 }}
                                            >
                                                <DeleteIcon color="error" />
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
                                sx={{
                                    margin: 1,
                                    backgroundColor: '#3f51b5',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#303f9f',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                startIcon={<AddIcon sx={{ marginRight: 1 }} />}
                                onClick={() => append({
                                    degree: '',
                                    fieldOfStudy: '',
                                    graduationDate: '',
                                })}
                            >
                                افزودن
                            </Button>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
};

export default EditStepEducation;
