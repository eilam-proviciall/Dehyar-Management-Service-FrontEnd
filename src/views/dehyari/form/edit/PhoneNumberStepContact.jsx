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
import Autocomplete from "@mui/material/Autocomplete";
import socialNetworks from "@data/socialNetworks.json"
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

    const getIconByName = (iconName) => {
        const icons = {
            EitaaIcon: <EitaaIcon />,
            BaleIcon: <BaleIcon />,
            ShadIcon: <ShadIcon />,
            RubikaIcon: <ShadIcon />,
            IGapIcon: <ShadIcon />,
            TelegramIcon: <ShadIcon />,
            WhatsappIcon: <ShadIcon />,
            ContactPhoneIcon: <ContactPhoneIcon />
        };

        return icons[iconName] || null; // برگرداندن آیکون بر اساس نام
    };
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
                                        <Grid item xs={12} sm={3}>
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

                                        <Grid item xs={12} sm={9}>
                                            <Controller
                                                name={`contacts[${index}].socialNetwork`}
                                                control={control}
                                                defaultValue={item.socialNetwork}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        multiple
                                                        options={socialNetworks}
                                                        disableCloseOnSelect={true}
                                                        getOptionLabel={(option) => option.label}
                                                        value={socialNetworks.filter((option) => field.value.includes(option.value))}
                                                        onChange={(_, newValue) => {
                                                            field.onChange(newValue.map((option) => option.value));
                                                        }}
                                                        renderOption={(props, option) => (
                                                            <li {...props}>
                                                                <IconButton edge="end" disabled
                                                                            style={{marginLeft: 1}}> {/* اضافه کردن فاصله */}
                                                                    {getIconByName(option.icon)}
                                                                </IconButton>
                                                                <Typography
                                                                    sx={{flexGrow: 1}}>{option.label}</Typography>
                                                            </li>
                                                        )}
                                                        renderTags={(selected, getTagProps) => (
                                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                                            {selected.map((option, index) => (
                                                                    <Chip
                                                                        key={option.value}
                                                                        label={option.label}
                                                                        {...getTagProps({ index })}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        )}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="شبکه اجتماعی"
                                                                size="small"
                                                                placeholder="انتخاب شبکه‌های اجتماعی"
                                                            />
                                                        )}
                                                    />
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
