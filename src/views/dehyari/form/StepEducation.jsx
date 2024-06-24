import React, {useEffect, useState} from 'react';
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
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from "@components/common/Divider/DividerSimple";
import Badge from "@mui/material/Badge";

const StepEducation = ({validation}) => {
    const {control, watch, setValue, formState: {errors}} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'educations'
    });
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        if (Object.keys(errors.educations || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.educations]);
    const educationDegrees = [
        {title: "بی سواد", value: 41},
        {title: "سیکل", value: 42},
        {title: "دیپلم", value: 43},
        {title: "کاردانی", value: 44},
        {title: "کارشناسی", value: 45},
        {title: "کارشناسی ارشد", value: 46},
        {title: "دکترا", value: 47}
    ];

    const fieldsOfStudy = [
        {title: "مهندسی نرم‌افزار", value: 51},
        {title: "مهندسی برق", value: 52},
        {title: "مهندسی مکانیک", value: 53},
        {title: "پزشکی", value: 54},
        {title: "حقوق", value: 55},
        {title: "مدیریت", value: 56},
        {title: "اقتصاد", value: 57},
        {title: "ریاضی", value: 58},
        {title: "فیزیک", value: 59},
        {title: "شیمی", value: 60}
    ];
    const getHighestDegree = (educations) => {
        if (!educations || educations.length === 0) {
            return {title: 'بدون مدرک', color: 'gray'};
        }

        const highestDegree = educations.reduce((prev, current) => (prev.degree > current.degree ? prev : current));
        const degree = educationDegrees.find(degree => degree.value === highestDegree.degree);

        switch (highestDegree.degree) {
            case 47:
                return {...degree, color: 'red'};
            case 46:
                return {...degree, color: 'orange'};
            case 45:
                return {...degree, color: 'green'};
            case 44:
                return {...degree, color: 'blue'};
            default:
                return {...degree, color: 'gray'};
        }
    };

    const highestDegree = getHighestDegree(watch('educations'));
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title='سوابق تحصیلی'/>
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center">
                            <Typography sx={{ fontWeight: 'bold', marginRight: '-10px' }}>اخرین مدرک تحصیلی:</Typography>
                            <Badge
                                badgeContent={highestDegree.title}
                                color="primary"
                                sx={{
                                    color: 'white',
                                    padding: '0 10px',
                                    borderRadius: '10px',
                                    minWidth: '80px', // تنظیم عرض کمتر برای جلوگیری از شکستن متن
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap', // جلوگیری از شکستن متن به خطوط جدید
                                    // overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {fields.map((item, index) => (
                            <Card key={item.id} sx={{mb: 2}}>
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
                                                    render={({field}) => (
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
                                                    render={({field}) => (
                                                        <Select
                                                            {...field}
                                                            label="رشته تحصیلی"
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            value={field.value}
                                                        >
                                                            {fieldsOfStudy.map(fieldOfStudy => (
                                                                <MenuItem key={fieldOfStudy.value}
                                                                          value={fieldOfStudy.value}>
                                                                    {fieldOfStudy.title}
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
                                                render={({field}) => (
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
                                            <IconButton color="error" aria-label="delete" size="large"
                                                        onClick={() => remove(index)}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                        <Grid item xs={12} sx={{px: 0}} pt={5}>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => append({degree: '', fieldOfStudy: '', graduationDate: ''})}
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
