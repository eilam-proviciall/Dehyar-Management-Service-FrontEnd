import React, { useEffect, useState } from 'react';
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import jobTitles from '@data/jobTitles.json';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";
import Logo from "@core/svg/Logo";
import {GetHumanCoverdVillageForCfo} from "@/Services/humanResources";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
const StepJobDetails = ({ invoiceData, validation }) => {
    const { register, control, setValue,getValues, formState: { errors } } = useFormContext();
    const [villages, setVillages] = useState([]);
    const [employerVillage, setEmployerVillage] = useState('');
    const handleEmployerVillageSelect = (villageCode) => {
        setValue("villageEmployer",villageCode)
        setEmployerVillage(villageCode);
    };
    useEffect(() => {
        const fetchVillages = async () => {
            try {
                const response = await axios.get(GetHumanCoverdVillageForCfo(), {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                setVillages(response.data);
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        };

        fetchVillages();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className='p-6 bg-actionHover rounded-xl'>
                        <div className='flex justify-between items-center'>
                            <Grid item xs={4}>
                                <div style={{ width: 200 }} className='flex justify-start'>
                                    <Logo />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className='flex flex-col items-center'>
                                    <Typography variant='h6'>قرارداد مدت معین و حکم حقوقی</Typography>
                                    <Typography variant='h6'>دهیار تمام وقت</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center'>
                                        <Typography>شماره قرارداد:</Typography>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            value={invoiceData[0].id}
                                            InputProps={{
                                                disabled: true,
                                                startAdornment: <InputAdornment position='start'>#</InputAdornment>
                                            }}
                                        />
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Typography color='text.primary'>تاریخ اجرا</Typography>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            value={invoiceData[0].id}
                                            InputProps={{
                                                disabled: true,
                                                startAdornment: <InputAdornment position='start'>1403/04/04</InputAdornment>
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='ساختار تشکیلات' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.jobTitle}>
                        <InputLabel>پست سازمانی</InputLabel>
                        <Controller
                            name='jobTitle'
                            control={control}
                            defaultValue=""
                            rules={validation.jobTitle}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="پست سازمانی"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    value={field.value || ''}
                                >
                                    {Object.entries(jobTitles).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" error={!!errors.coveredVillages}>
                        <InputLabel>دهیاری های تحت پوشش</InputLabel>
                        <Controller
                            name='coveredVillages'
                            control={control}
                            defaultValue={[]}
                            rules={validation.coveredVillages}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="دهیاری های تحت پوشش"
                                    multiple
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    value={Array.isArray(field.value) ? field.value : []}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map(value => (
                                                <span key={value}>
                                                    {villages.find(village => village.hierarchy_code === value)?.village_name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                >
                                    {villages.map((village) => (
                                        <MenuItem
                                            key={village.hierarchy_code}
                                            value={village.hierarchy_code}
                                            disabled={village.has_human_resource}
                                        >
                                            {village.village_name}
                                            <IconButton
                                                onClick={() => handleEmployerVillageSelect(village.hierarchy_code)}
                                                edge="end"
                                                disabled={false}
                                            >
                                                {employerVillage === village.hierarchy_code ? <StarIcon /> : <StarBorderIcon />}
                                            </IconButton>
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.coveredVillages && <Typography color="error">{errors.coveredVillages.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='nationalCode'
                        control={control}
                        defaultValue=""
                        rules={validation.nationalCode}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="کد ملی"
                                placeholder="کد ملی"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                value={field.value || ''}
                                error={!!errors.nationalCode}
                                helperText={errors.nationalCode && errors.nationalCode.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default StepJobDetails;
