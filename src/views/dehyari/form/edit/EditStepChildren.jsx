// EditStepChildren.jsx
import React, { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, IconButton, TextField, FormControl, InputLabel, Select, MenuItem,
    Typography, Accordion, AccordionSummary, AccordionDetails, Button, FormHelperText
} from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from "@components/common/Divider/DividerSimple";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AddIcon from '@mui/icons-material/Add';
import { CSSTransition } from 'react-transition-group';
import './StepChildren.css';

const EditStepChildren = ({ validation }) => {
    const { control, watch, formState: { errors }, trigger, setError, clearErrors } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'children'
    });
    const [expanded, setExpanded] = useState(false);
    const maritalStatus = watch('maritalStatus');

    useEffect(() => {
        if (Object.keys(errors.children || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.children]);
  // هر زمان که children تغییر کند، این اثر فراخوانی می‌شود.

    const children = watch('children') || [];


    useEffect(() => {
        children.forEach((child, index) => {
            const { nid, fullName, gender, birthDate } = child;
            const anyFieldFilled = nid || fullName || gender || birthDate;

            if (anyFieldFilled) {
                trigger(`children.${index}`);
            }
        });
    }, [children, trigger]);

    const validateChild = (index) => {
        const child = children[index];
        const { nid, fullName, gender, birthDate } = child;

        if (nid || fullName || gender || birthDate) {
            if (!nid) setError(`children.${index}.nid`, { type: 'manual', message: 'کد ملی الزامی است' });
            if (!fullName) setError(`children.${index}.fullName`, { type: 'manual', message: 'نام و نام خانوادگی الزامی است' });
            if (!gender) setError(`children.${index}.gender`, { type: 'manual', message: 'جنسیت الزامی است' });
            if (!birthDate) setError(`children.${index}.birthDate`, { type: 'manual', message: 'تاریخ تولد الزامی است' });
        } else {
            clearErrors(`children.${index}`);
        }
    };

    const countChildrenByGender = (gender) => {
        return children.filter(child => child.gender === gender).length;
    };

    let girlsCount = countChildrenByGender(0);
    let boysCount = countChildrenByGender(1);
    useEffect(() => {
         girlsCount = countChildrenByGender('0'); // دخترها
         boysCount = countChildrenByGender('1'); // پسرها
    }, [children]);
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title='اطلاعات فرزندان' />
            </Grid>
                <Grid item xs={12}>
                    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Typography>اطلاعات فرزندان</Typography>
                                <Box display="flex" alignItems="center" gap="20px">
                                    <Chip
                                        avatar={<Avatar>{girlsCount}</Avatar>}
                                        label="دختر"
                                        variant="outlined"
                                        style={{
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    />
                                    <Chip
                                        avatar={<Avatar>{boysCount}</Avatar>}
                                        label="پسر"
                                        variant="outlined"
                                        style={{
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            {fields.map((item, index) => (
                                <Card key={item.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            {/* کد ملی */}
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.nid`}
                                                    control={control}
                                                    defaultValue={item.nid || ""}
                                                    rules={validation.nid}
                                                    render={({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            label="کد ملی"
                                                            {...field}
                                                            error={!!errors?.children?.[index]?.nid}
                                                            helperText={errors?.children?.[index]?.nid && errors.children[index].nid.message}
                                                            onBlur={() => validateChild(index)}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* نام و نام خانوادگی */}
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.fullName`}
                                                    control={control}
                                                    defaultValue={item.fullName || ""}
                                                    rules={validation.fullName}
                                                    render={({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            label="نام و نام خانوادگی"
                                                            {...field}
                                                            error={!!errors?.children?.[index]?.fullName}
                                                            helperText={errors?.children?.[index]?.fullName && errors.children[index].fullName.message}
                                                            onBlur={() => validateChild(index)}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* جنسیت */}
                                            <Grid item xs={12} sm={3}>
                                                <FormControl fullWidth size="small" error={!!errors?.children?.[index]?.gender}>
                                                    <InputLabel>جنسیت</InputLabel>
                                                    <Controller
                                                        name={`children.${index}.gender`}
                                                        control={control}
                                                        defaultValue={item.gender || ""}
                                                        rules={validation.gender}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                label="جنسیت"
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                    validateChild(index);
                                                                }}
                                                                value={field.value}
                                                            >
                                                                <MenuItem value={1}>پسر</MenuItem>
                                                                <MenuItem value={0}>دختر</MenuItem>
                                                            </Select>
                                                        )}
                                                    />
                                                    {errors?.children?.[index]?.gender && <FormHelperText>{errors.children[index].gender.message}</FormHelperText>}
                                                </FormControl>
                                            </Grid>
                                            {/* تاریخ تولد */}
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.birthDate`}
                                                    control={control}
                                                    defaultValue={item.birthDate ? new Date(item.birthDate * 1000) : ""}
                                                    rules={validation.birthDate}
                                                    render={({ field: { onChange, value } }) => (
                                                        <DatePicker
                                                            value={value ? new Date(value * 1000) : ""}
                                                            onChange={(date) => {
                                                                onChange(date ? date.toUnix() : "");
                                                                validateChild(index);
                                                            }}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            render={
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label="تاریخ تولد"
                                                                    error={!!errors?.children?.[index]?.birthDate}
                                                                    helperText={errors?.children?.[index]?.birthDate && errors.children[index].birthDate.message}
                                                                />
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.marriageDate`}
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field: { onChange, value } }) => (
                                                        <DatePicker
                                                            value={value ? new Date(value * 1000) : ""}
                                                            onChange={(date) => {
                                                                onChange(date ? date.toUnix() : "");
                                                                validateChild(index);
                                                            }}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            render={<TextField
                                                                size="small"
                                                                fullWidth
                                                                label="تاریخ ازدواج"
                                                                error={!!errors?.children?.[index]?.marriageDate}
                                                                helperText={errors?.children?.[index]?.marriageDate && errors.children[index].marriageDate.message}
                                                            />}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.endOfStudyExemption`}
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field: { onChange, value } }) => (
                                                        <DatePicker
                                                            value={value ? new Date(value * 1000) : ""}
                                                            onChange={(date) => {
                                                                onChange(date ? date.toUnix() : "");
                                                                validateChild(index);
                                                            }}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            render={<TextField
                                                                size="small"
                                                                fullWidth
                                                                label="پایان معافیت تحصیلی"
                                                                error={!!errors?.children?.[index]?.endOfStudyExemption}
                                                                helperText={errors?.children?.[index]?.endOfStudyExemption && errors.children[index].endOfStudyExemption.message}
                                                            />}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Controller
                                                    name={`children.${index}.deathDate`}
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field: { onChange, value } }) => (
                                                        <DatePicker
                                                            value={value ? new Date(value * 1000) : ""}
                                                            onChange={(date) => {
                                                                onChange(date ? date.toUnix() : "");
                                                                validateChild(index);
                                                            }}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            render={<TextField
                                                                size="small"
                                                                fullWidth
                                                                label="تاریخ وفات"
                                                                error={!!errors?.children?.[index]?.deathDate}
                                                                helperText={errors?.children?.[index]?.deathDate && errors.children[index].deathDate.message}
                                                            />}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* دکمه حذف */}
                                            <Grid item xs={12} sm={3}>
                                                <IconButton
                                                    color="error"
                                                    aria-label="delete"
                                                    size="large"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                            <Grid container sx={{ mt: 4.75 }}>
                                <Grid item xs={12} sx={{ px: 0 }}>
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
                                            nid: '',
                                            fullName: '',
                                            gender: '',
                                            birthDate: ''
                                        })}
                                    >
                                        افزودن فرزند
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
        </Grid>
    );
};

export default EditStepChildren;
