import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Repeater from "@core/components/Repeater";
import Box from "@mui/material/Box";
import {Collapse, Icon} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function EducationStep({ formData, handleEducationChange, setFormData }) {
    const handleAddEducation = () => {
        setFormData({
            ...formData,
            educations: [
                ...formData.educations,
                {
                    degree: '',
                    fieldOfStudy: '',
                    graduationDate: ''
                }
            ]
        });
    };

    const handleRemoveEducation = (index) => {
        const updatedEducations = formData.educations.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            educations: updatedEducations
        });
    };

    return (
        <>
            <Grid item xs={12} sm={12} spacing={30}>
                <Repeater count={formData.educations.length}>
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
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="مدرک تحصیلی"
                                                            name="degree"
                                                            value={formData.educations[i].degree}
                                                            onChange={(e) => handleEducationChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="رشته تحصیلی"
                                                            name="fieldOfStudy"
                                                            value={formData.educations[i].fieldOfStudy}
                                                            onChange={(e) => handleEducationChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="تاریخ اخذ مدرک تحصیلی"
                                                            name="graduationDate"
                                                            value={formData.educations[i].graduationDate}
                                                            onChange={(e) => handleEducationChange(i, e)}
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
        </>
    );
}

export default EducationStep;
