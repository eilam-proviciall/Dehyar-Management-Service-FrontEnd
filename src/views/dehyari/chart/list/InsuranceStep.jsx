import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Repeater from "@core/components/Repeater";
import Box from "@mui/material/Box";
import {Collapse, Icon} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

function InsuranceStep({ formData, handleInsuranceChange, setFormData,cities}) {
    const handleAddInsurance = () => {
        setFormData({
            ...formData,
            insurances: [
                ...formData.insurances,
                {
                    workplace: '',
                    insurancePeriod: '',
                    insuranceType: '',
                    employmentDate: ''
                }
            ]
        });
    };

    const handleRemoveInsurance = (index) => {
        const updatedInsurances = formData.insurances.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            insurances: updatedInsurances
        });
    };

    return (
        <>
            <Grid item xs={12} sm={12} spacing={30}>
                <Repeater count={formData.insurances.length}>
                    {i => {
                        const Tag = i === 0 ? Box : Collapse;
                        return (
                            <Tag key={i} className="repeater-wrapper" {...(i !== 0 ? { in: true } : {})}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item lg={12} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }} pt={3}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={3}>
                                                            <Autocomplete
                                                                options={cities}
                                                                getOptionLabel={(option) =>`${option.approved_name}`}
                                                                value={formData.birthPlace || null}
                                                                onChange={(e,newValue) => handleInsuranceChange(i, newValue.hierarchy_code,"workplace")}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        size="small"
                                                                        label="محل خدمت"
                                                                        name="workplace"
                                                                    />
                                                                )}
                                                            />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="سابقه بیمه (ماه)"
                                                            name="insurancePeriod"
                                                            value={formData.insurances[i].insurancePeriod}
                                                            onChange={(e) => handleInsuranceChange(i, e.target.value,"insurancePeriod")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="نوع بیمه"
                                                            name="insuranceType"
                                                            value={formData.insurances[i].insuranceType}
                                                            onChange={(e) => handleInsuranceChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>

                                                        <DatePicker
                                                            scrollSensitive={true}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                            onChange={(e) => handleInsuranceChange(i, e.unix,"employmentDate")}
                                                            render={
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label="تاریخ استخدام"
                                                                    name="employmentDate"
                                                                    value={formData.insurances[i].employmentDate}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <IconButton
                                                            sx={{ ml: 15 }}
                                                            color="error"
                                                            aria-label="delete"
                                                            size="large"
                                                            onClick={() => handleRemoveInsurance(i)}
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
                        onClick={handleAddInsurance}
                    >
                        افزودن
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default InsuranceStep;
