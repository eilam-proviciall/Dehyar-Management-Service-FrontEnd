import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
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
import AddIcon from '@mui/icons-material/Add';
import EducationFields from '@components/common/EducationFields/EducationFields';

const StepEducation = ({ validation }) => {
    const { control, watch, getValues, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations'
    });

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (Object.keys(errors.educations || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.educations]);

    const getHighestDegree = (educations) => {
        // تابعی برای گرفتن بالاترین مدرک تحصیلی
    };

    const highestDegree = getHighestDegree(watch('educations'));

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
                                            <EducationFields
                                                index={index}
                                                validation={validation}
                                                watch={watch}
                                                errors={errors}
                                            />
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
                                                                sx={{textAlign :"center"}}
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
                                    workplace: '',
                                    insurancePeriod: '',
                                    employmentStartDate: '',
                                    employmentEndDate: ''
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
