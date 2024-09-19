import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Box
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from "@components/common/Divider/DividerSimple";
import Badge from "@mui/material/Badge";
import { GetFieldStudy } from "@/Services/humanResources";
import AddIcon from "@mui/icons-material/Add";
import api from '@/utils/axiosInstance';

const StepEducation = ({ validation }) => {
    const { control, watch, getValues, formState: { errors }, trigger } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations'
    });

    const [expanded, setExpanded] = useState(false);
    const [fieldsOfStudy, setFieldsOfStudy] = useState({});

    useEffect(() => {
        if (Object.keys(errors.educations || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.educations]);

    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سیکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 }
    ];

    const getHighestDegree = (educations) => {
        if (!educations || educations.length === 0) {
            return { title: 'بدون مدرک', color: 'gray' };
        }

        const highestDegree = educations.reduce((prev, current) => (prev.degree > current.degree ? prev : current));
        const degree = educationDegrees.find(degree => degree.value === highestDegree.degree);

        switch (highestDegree.degree) {
            case 47:
                return { ...degree, color: 'red' };
            case 46:
                return { ...degree, color: 'orange' };
            case 45:
                return { ...degree, color: 'green' };
            case 44:
                return { ...degree, color: 'blue' };
            default:
                return { ...degree, color: 'gray' };
        }
    };

    const highestDegree = getHighestDegree(watch('educations'));

    const fetchFieldsOfStudy = async (grade) => {
        grade = grade[0];
        try {
            const response = await api.get(GetFieldStudy(), {
                requiresAuth: false,
                params: { grade }
            });
            setFieldsOfStudy(prev => ({ ...prev, [grade]: response.data }));
        } catch (error) {
            console.error('Error fetching fields of study:', error);
        }
    };

    const handleDegreeChange = (e, field, index) => {
        field.onChange(e.target.value);
        if (e.target.value >= 44) {
            fetchFieldsOfStudy([e.target.value]);
        }
    };

    const educations = watch('educations') || [];

    useEffect(() => {
        educations.forEach((education, index) => {
            const { degree, fieldOfStudy, graduationDate } = education;
            const anyFieldFilled = degree || fieldOfStudy || graduationDate;

            if (anyFieldFilled) {
                Object.keys(education).forEach(field => {
                    trigger(`educations.${index}.${field}`);
                });
            }
        });
    }, [educations, trigger]);

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title='سوابق تحصیلی' />
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography sx={{ fontWeight: 'bold', marginRight: '-10px' }}>آخرین مدرک تحصیلی:</Typography>
                            <Badge
                                badgeContent={highestDegree.title}
                                color="primary"
                                sx={{
                                    color: 'white',
                                    padding: '0 10px',
                                    borderRadius: '10px',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    marginRight: 10
                                }}
                            />
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        {fields.map((item, index) => (
                            <Card key={item.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl fullWidth size="small"
                                                error={!!errors?.educations?.[index]?.degree}>
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
                                                            onChange={(e) => handleDegreeChange(e, field, index)}
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
                                                {errors?.educations?.[index]?.degree &&
                                                    <FormHelperText>{errors.educations[index].degree.message}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl fullWidth size="small"
                                                error={!!errors?.educations?.[index]?.fieldOfStudy}>
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
                                                            disabled={!watch(`educations.${index}.degree`) || watch(`educations.${index}.degree`) < 44}
                                                        >
                                                            {(fieldsOfStudy[watch(`educations.${index}.degree`)] || []).map(field => (
                                                                <MenuItem key={field.code} value={field.code}>
                                                                    {field.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                {errors?.educations?.[index]?.fieldOfStudy &&
                                                    <FormHelperText>{errors.educations[index].fieldOfStudy.message}</FormHelperText>}
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
                                                        onChange={(date) => {
                                                            field.onChange(date ? date.toUnix() : '');
                                                        }}
                                                        value={getValues("graduationDate")}
                                                        render={
                                                            <TextField
                                                                sx={{ textAlign: "center" }}
                                                                fullWidth
                                                                size="small"
                                                                label="تاریخ اخذ مدرک تحصیلی"
                                                                error={!!errors?.educations?.[index]?.graduationDate}
                                                                helperText={errors?.educations?.[index]?.graduationDate && errors.educations[index].graduationDate.message}
                                                                inputProps={{
                                                                    style: { textAlign: 'end' }
                                                                }}
                                                            />
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <IconButton color="error" aria-label="delete" size="large"
                                                onClick={() => remove(index)}>
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
                                    graduationDate: ''
                                })}
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
