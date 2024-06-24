import React, {useEffect, useState} from 'react';
import { Grid, Divider, Card, CardContent, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Accordion, AccordionSummary, AccordionDetails, Button, FormHelperText } from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from "@components/common/Divider/DividerSimple";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

const StepInsurance = ({ validation }) => {
    const { control, watch, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'insurances'
    });
    const [expanded, setExpanded] = useState(false);
    const totalInsuranceMonths = watch('insurances').reduce((acc, curr) => acc + (parseInt(curr.insurancePeriod) || 0), 0);
    useEffect(() => {
        if (Object.keys(errors.insurances || {}).length > 0) {
            setExpanded(true);
        }
    }, [errors.insurances]);
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title='سوابق بیمه‌ای'/>
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography>سوابق بیمه‌ای</Typography>
                            <Badge
                                badgeContent={`مجموع ماه‌ها: ${totalInsuranceMonths}`}
                                color="primary"
                                style={{color: 'white',
                                    padding: '0 10px',
                                    marginLeft :50,
                                    borderRadius: '10px',
                                    minWidth: '80px',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
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
                                            <Controller
                                                name={`insurances.${index}.workplace`}
                                                control={control}
                                                defaultValue=""
                                                rules={validation.workplace}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="دهیاری محل خدمت"
                                                        {...field}
                                                        error={!!errors?.insurances?.[index]?.workplace}
                                                        helperText={errors?.insurances?.[index]?.workplace && errors.insurances[index].workplace.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Controller
                                                name={`insurances.${index}.insurancePeriod`}
                                                control={control}
                                                defaultValue=""
                                                rules={validation.insurancePeriod}
                                                render={({ field }) => (
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        label="سابقه بیمه (ماه)"
                                                        {...field}
                                                        error={!!errors?.insurances?.[index]?.insurancePeriod}
                                                        helperText={errors?.insurances?.[index]?.insurancePeriod && errors.insurances[index].insurancePeriod.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Controller
                                                name={`insurances.${index}.employmentStartDate`}
                                                control={control}
                                                defaultValue=""
                                                rules={validation.employmentStartDate}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        {...field}
                                                        calendar={persian}
                                                        locale={persian_fa}
                                                        calendarPosition="bottom-right"
                                                        render={<TextField size="small" fullWidth label="تاریخ شروع" error={!!errors?.insurances?.[index]?.employmentStartDate} helperText={errors?.insurances?.[index]?.employmentStartDate && errors.insurances[index].employmentStartDate.message} />}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Controller
                                                name={`insurances.${index}.employmentEndDate`}
                                                control={control}
                                                defaultValue=""
                                                rules={validation.employmentEndDate}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        {...field}
                                                        calendar={persian}
                                                        locale={persian_fa}
                                                        calendarPosition="bottom-right"
                                                        render={<TextField size="small" fullWidth label="تاریخ پایان" error={!!errors?.insurances?.[index]?.employmentEndDate} helperText={errors?.insurances?.[index]?.employmentEndDate && errors.insurances[index].employmentEndDate.message} />}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
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
                                    size='small'
                                    variant='contained'
                                    startIcon={<DeleteIcon />}
                                    onClick={() => append({ workplace: '', insurancePeriod: '', employmentStartDate: '', employmentEndDate: '' })}
                                >
                                    افزودن
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

export default StepInsurance;
