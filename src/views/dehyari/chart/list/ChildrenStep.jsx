import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Repeater from "@core/components/Repeater";
import Box from "@mui/material/Box";
import {Collapse, Icon} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

function ChildrenStep({ formData, handleChildChange, setFormData }) {
    const handleAddChild = () => {
        setFormData({
            ...formData,
            children: [
                ...formData.children,
                {
                    nationalCode: '',
                    fullName: '',
                    gender: '',
                    birthDate: '',
                    marriageDate: '',
                    endOfStudyExemption: '',
                    deathDate: ''
                }
            ]
        });
    };

    const handleRemoveChild = (index) => {
        const updatedChildren = formData.children.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            children: updatedChildren
        });
    };

    return (
        <>
            <Grid item xs={12} sm={12} spacing={30}>
                <Repeater count={formData.children.length}>
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
                                                            label="کد ملی"
                                                            name="nationalCode"
                                                            value={formData.children[i].nationalCode}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="نام و نام خانوادگی"
                                                            name="fullName"
                                                            value={formData.children[i].fullName}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel>جنسیت</InputLabel>
                                                            <Select
                                                                label="جنسیت"
                                                                name="gender"
                                                                value={formData.children[i].gender}
                                                                onChange={(e) => handleChildChange(i, e)}
                                                            >
                                                                <MenuItem value="male">مرد</MenuItem>
                                                                <MenuItem value="female">زن</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="تاریخ تولد"
                                                            name="birthDate"
                                                            value={formData.children[i].birthDate}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="تاریخ ازدواج"
                                                            name="marriageDate"
                                                            value={formData.children[i].marriageDate}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="پایان معافیت تحصیلی"
                                                            name="endOfStudyExemption"
                                                            value={formData.children[i].endOfStudyExemption}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="تاریخ وفات"
                                                            name="deathDate"
                                                            value={formData.children[i].deathDate}
                                                            onChange={(e) => handleChildChange(i, e)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <IconButton
                                                            sx={{ ml: 15 }}
                                                            color="error"
                                                            aria-label="delete"
                                                            size="large"
                                                            onClick={() => handleRemoveChild(i)}
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
                        onClick={handleAddChild}
                    >
                        افزودن
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default ChildrenStep;
