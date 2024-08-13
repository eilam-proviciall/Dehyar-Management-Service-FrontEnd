import React, { useState, useEffect } from 'react';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, Box, Chip, Avatar } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from '@components/common/Divider/DividerSimple';
import AddIcon from '@mui/icons-material/Add';
import contractType from '@data/contractType.json';

const EditStepInsurance = ({ validation }) => {
    const { control, watch, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'insurances',
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
                <DividerSimple title="سوابق بیمه‌ای" />
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography>سوابق بیمه‌ای</Typography>
                            <Chip
                                avatar={<Avatar>{totalInsuranceMonths}</Avatar>}
                                label="مجموع ماه‌ها"
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
                                        {/* فیلدهای فرم مانند قبل */}
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
                                        workplace: '',
                                        insurancePeriod: '',
                                        employmentStartDate: '',
                                        employmentEndDate: '',
                                    })}
                                >
                                    افزودن
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
};

export default EditStepInsurance;
