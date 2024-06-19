import React from 'react';
import Grid from "@mui/material/Grid";
import Repeater from "@core/components/Repeater";
import Box from "@mui/material/Box";
import { Collapse, Icon, FormHelperText } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import DirectionalIcon from "@components/DirectionalIcon";

const EducationStep = ({ formData, handleEducationChange, setFormData }) => {
    const { control, handleSubmit, setValue, trigger, formState: { errors } } = useForm({
        defaultValues: {
            educations: formData.educations
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "educations"
    });

    const handleAddEducation = () => {
        append({
            degree: '',
            fieldOfStudy: '',
            graduationDate: ''
        });
    };

    const handleRemoveEducation = (index) => {
        remove(index);
        const updatedEducations = formData.educations.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            educations: updatedEducations
        });
    };

    const onSubmit = (data) => {
        setFormData({
            ...formData,
            educations: data.educations
        });
    };

    const education_degree = [
        { "title": "بی سواد", "value": 41 },
        { "title": "سکل", "value": 42 },
        { "title": "دیپلم", "value": 43 },
        { "title": "کاردانی", "value": 44 },
        { "title": "کارشناسی", "value": 45 },
        { "title": "کارشناسی ارشد", "value": 46 },
        { "title": "دکترا", "value": 47 }
    ];

    const field_of_study = [
        { "title": "مهندسی نرم‌افزار", "value": 51 },
        { "title": "مهندسی برق", "value": 52 },
        { "title": "مهندسی مکانیک", "value": 53 },
        { "title": "پزشکی", "value": 54 },
        { "title": "حقوق", "value": 55 },
        { "title": "مدیریت", "value": 56 },
        { "title": "اقتصاد", "value": 57 },
        { "title": "ریاضی", "value": 58 },
        { "title": "فیزیک", "value": 59 },
        { "title": "شیمی", "value": 60 }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={12} spacing={30}>
                <Repeater count={fields.length}>
                    {i => {
                        const Tag = i === 0 ? Box : Collapse;
                        return (
                            <Tag key={fields[i].id} className="repeater-wrapper" {...(i !== 0 ? { in: true } : {})}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item lg={12} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }} pt={3}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={3}>
                                                        <FormControl fullWidth size="small" error={!!errors.educations?.[i]?.degree}>
                                                            <InputLabel>مدرک تحصیلی</InputLabel>
                                                            <Controller
                                                                name={`educations.${i}.degree`}
                                                                control={control}
                                                                rules={{ required: "این فیلد الزامی است" }}
                                                                render={({ field }) => (
                                                                    <Select
                                                                        {...field}
                                                                        label="مدرک تحصیلی"
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            handleEducationChange(i, e.target.value, "degree");
                                                                        }}
                                                                        value={formData.educations[i].degree}
                                                                    >
                                                                        {education_degree.map((degree) => (
                                                                            <MenuItem key={degree.value} value={degree.value}>
                                                                                {degree.title}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                )}
                                                            />
                                                            {errors.educations?.[i]?.degree && <FormHelperText>{errors.educations[i].degree.message}</FormHelperText>}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <FormControl fullWidth size="small" error={!!errors.educations?.[i]?.fieldOfStudy}>
                                                            <InputLabel>رشته تحصیلی</InputLabel>
                                                            <Controller
                                                                name={`educations.${i}.fieldOfStudy`}
                                                                control={control}
                                                                rules={{ required: "این فیلد الزامی است" }}
                                                                render={({ field }) => (
                                                                    <Select
                                                                        {...field}
                                                                        label="رشته تحصیلی"
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            handleEducationChange(i, e.target.value, "fieldOfStudy");
                                                                        }}
                                                                        value={formData.educations[i].fieldOfStudy}
                                                                    >
                                                                        {field_of_study.map((field) => (
                                                                            <MenuItem key={field.value} value={field.value}>
                                                                                {field.title}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                )}
                                                            />
                                                            {errors.educations?.[i]?.fieldOfStudy && <FormHelperText>{errors.educations[i].fieldOfStudy.message}</FormHelperText>}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <Controller
                                                            name={`educations.${i}.graduationDate`}
                                                            control={control}
                                                            rules={{ required: "این فیلد الزامی است" }}
                                                            render={({ field }) => (
                                                                <DatePicker
                                                                    {...field}
                                                                    scrollSensitive={true}
                                                                    calendar={persian}
                                                                    locale={persian_fa}
                                                                    calendarPosition="bottom-right"
                                                                    onChange={(e) => {
                                                                        field.onChange(e.unix);
                                                                        handleEducationChange(i, e.unix, 'graduationDate');
                                                                    }}
                                                                    value={formData.educations[i].graduationDate}
                                                                    render={
                                                                        <TextField
                                                                            size="small"
                                                                            fullWidth
                                                                            label="تاریخ اخذ مدرک تحصیلی"
                                                                            name="graduationDate"
                                                                            error={!!errors.educations?.[i]?.graduationDate}
                                                                            helperText={errors.educations?.[i]?.graduationDate ? errors.educations[i].graduationDate.message : ''}
                                                                        />
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <IconButton
                                                            sx={{ ml: 15 }}
                                                            color="error"
                                                            aria-label="delete"
                                                            size="large"
                                                            onClick={() => handleRemoveEducation(i)}
                                                        >
                                                            <DeleteIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Tag>
                        );
                    }}
                </Repeater>
                <Grid item xs={12} sx={{ px: 0 }} pt={5}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<Icon icon="mdi:plus" fontSize="20" />}
                        onClick={handleAddEducation}
                    >
                        افزودن
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EducationStep;
