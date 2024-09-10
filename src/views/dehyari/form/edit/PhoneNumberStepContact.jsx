"use client";
import React, { useState, useEffect } from 'react';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, Box, Chip, Avatar } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import EitaaIcon from '@mui/icons-material/Message'; // می‌توانید بعدا آیکون‌های شبکه‌های اجتماعی را اضافه کنید
import BaleIcon from '@mui/icons-material/Chat';
import ShadIcon from '@mui/icons-material/School';
import DividerSimple from "@components/common/Divider/DividerSimple";
import InputAdornment from "@mui/material/InputAdornment";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
const PhoneNumberStepContact = ({ validation }) => {
    const { control, watch, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'contacts',
    });
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (Object.keys(errors.contacts || {})) {
            setExpanded(true);
        }
    }, [errors.contacts]);

    useEffect(() => {
        if (fields.length === 0) {
            append({
                phoneNumber: '',
                socialNetwork: '',
                description: '',
            });
        }
    }, [fields, append]);

    const socialNetworks = [
        { value: 'eitaa', label: 'ایتا' },
        { value: 'bale', label: 'بله' },
        { value: 'shad', label: 'شاد' },
        { value: 'contactPhone', label: 'شماره ضروری' }
    ];

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title="اطلاعات تماس" />
            </Grid>
            <Grid item xs={12}>
                <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>اطلاعات تماس</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {fields.map((item, index) => (
                            <Card key={item.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name={`contacts[${index}].phoneNumber`}
                                                control={control}
                                                defaultValue={item.phoneNumber}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="شماره تلفن"
                                                        placeholder="شماره تلفن"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <PhoneIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name={`contacts[${index}].socialNetwork`}
                                                control={control}
                                                defaultValue={item.socialNetwork}
                                                render={({ field }) => (
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id={`social-network-label-${index}`}>شبکه اجتماعی</InputLabel>
                                                        <Select
                                                            labelId={`social-network-label-${index}`}
                                                            label="شبکه اجتماعی"
                                                            multiple // افزودن این ویژگی برای چند انتخابی
                                                            value={field.value || []}
                                                            onChange={field.onChange}
                                                            renderValue={(selected) => (
                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                    {selected.map((value) => {
                                                                        const network = socialNetworks.find((network) => network.value === value);
                                                                        return <Chip key={value} label={network ? network.label : value} />;
                                                                    })}
                                                                </Box>
                                                            )}
                                                        >
                                                            <MenuItem value="eitaa">
                                                                <IconButton edge="end" disabled>
                                                                    <EitaaIcon />
                                                                </IconButton>
                                                                <Typography sx={{ mr: 'auto' }}>ایتا</Typography>
                                                            </MenuItem>
                                                            <MenuItem value="bale">
                                                                <IconButton edge="end" disabled>
                                                                    <BaleIcon />
                                                                </IconButton>
                                                                <Typography sx={{ mr: 'auto' }}>بله</Typography>
                                                            </MenuItem>
                                                            <MenuItem value="shad">
                                                                <IconButton edge="end" disabled>
                                                                    <ShadIcon />
                                                                </IconButton>
                                                                <Typography sx={{ mr: 'auto' }}>شاد</Typography>
                                                            </MenuItem>
                                                            <MenuItem value="contactPhone">
                                                                <IconButton edge="end" disabled>
                                                                    <ContactPhoneIcon />
                                                                </IconButton>
                                                                <Typography sx={{ mr: 'auto' }}>شماره ضروری</Typography>
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <IconButton
                                                aria-label="حذف"
                                                onClick={() => {
                                                    if (fields.length > 1) {
                                                        remove(index);
                                                    }
                                                }}
                                                sx={{ mt: 2 }}
                                                disabled={fields.length === 1} // دکمه حذف را در صورتی که فقط یک آیتم باشد غیرفعال می‌کند
                                            >
                                                <DeleteIcon color={fields.length === 1 ? "disabled" : "error"} />
                                            </IconButton>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}

                        <Grid container sx={{ mt: 4 }}>
                            <Grid item xs={12}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#3f51b5',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#303f9f',
                                        },
                                    }}
                                    startIcon={<AddIcon />}
                                    onClick={() => append({
                                        phoneNumber: '',
                                        socialNetwork: '',
                                        description: '',
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

export default PhoneNumberStepContact;
