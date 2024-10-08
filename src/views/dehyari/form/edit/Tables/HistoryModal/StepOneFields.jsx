    import React, { useState, useEffect, useCallback } from 'react';
    import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Slider, Box, Chip, IconButton, Autocomplete } from '@mui/material';
    import { Controller, useFormContext } from 'react-hook-form';
    import axios from 'axios';
    import StarBorderIcon from '@mui/icons-material/StarBorder';
    import StarIcon from '@mui/icons-material/Star';
    import jobTitleOptions from "@data/jobTitles";
    import { GetHumanCoverdVillageForCfo } from "@/Services/humanResources";
    import OutlinedInput from "@mui/material/OutlinedInput";

    const StepOneFields = ({ validation ,mode }) => {
        const { control, formState: { errors }, setValue, getValues } = useFormContext();
        const [contractTypeValue, setContractTypeValue] = useState(1);
        const [selectedJobTitle, setSelectedJobTitle] = useState('');
        const [villages, setVillages] = useState([]);
        const [employerVillage, setEmployerVillage] = useState('');
        const [chipsKey, setChipsKey] = useState(0);

        // هندل کردن تغییرات Slider
        const handleSliderChange = (event, newValue) => {
            setContractTypeValue(newValue);
        };

        // هندل تغییرات پست سازمانی
        const handleJobTitleChange = (event, value) => {
            setSelectedJobTitle(value?.value || '');
            setValue('jobTitle', value?.value || '');
        };

        // فانکشن Fetch کردن دهیاری‌های تحت پوشش
        const fetchVillages = async (jobTitle) => {
            if (jobTitle) {
                try {
                    const response = await axios.get(GetHumanCoverdVillageForCfo(), {
                        params: { job_title: jobTitle },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    });
                    setVillages(response.data);
                } catch (error) {
                    console.error('Error fetching villages:', error);
                }
            }
        };

        // هندل تغییرات در دهیاری‌های انتخابی
        const handleEmployerVillageSelect = useCallback((villageCode, event) => {
            event.stopPropagation();
            let currentSelection = getValues('coveredVillages');
            if (!Array.isArray(currentSelection)) {
                currentSelection = [];
            }

            if (!currentSelection.includes(villageCode)) {
                currentSelection.push(villageCode);
            }

            if (employerVillage === villageCode) {
                setEmployerVillage('');
                setValue("villageEmployer", '');
            } else {
                setEmployerVillage(villageCode);
                setValue("villageEmployer", villageCode);
            }

            setValue('coveredVillages', currentSelection);
            setChipsKey(prevKey => prevKey + 1);
        }, [employerVillage, getValues, setValue]);
        useEffect(() => {
            fetchVillages(selectedJobTitle);
        }, [selectedJobTitle]);
        const handleChange = (selectedVillages) => {
            if (!Array.isArray(selectedVillages)) return;

            if (!selectedVillages.includes(employerVillage)) {
                setEmployerVillage('');
                setValue("villageEmployer", '');
            }

            setValue('coveredVillages', selectedVillages);
            setChipsKey(prevKey => prevKey + 1);
        };

        useEffect(() => {
            if (mode === 'edit') {
                // در حالت ویرایش، jobTitle را از مقدار فعلی فرم بخوانید
                const currentJobTitle = getValues('jobTitle');

                // اگر jobTitle موجود بود، دهیاری‌ها را فچ کنید
                if (currentJobTitle) {
                    fetchVillages(currentJobTitle);
                    setSelectedJobTitle(currentJobTitle);  // مقداردهی selectedJobTitle برای ویرایش
                }
            }
        }, [mode, getValues, fetchVillages]);


        const options = jobTitleOptions.flatMap(group =>
            group.titles.map(title => ({
                group: group.group,
                value: title.value,
                label: title.label
            }))
        );

        const findOption = (value) => options.find(option => option.value === value) || null;

        return (
            <Grid container spacing={2}>
                {/* پست سازمانی */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <Controller
                            name="jobTitle"
                            control={control}
                            defaultValue=""
                            rules={validation.jobTitle}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    // size="small"
                                    options={options}
                                    groupBy={(option) => option.group}
                                    getOptionLabel={(option) => option.label}
                                    value={findOption(field.value)}
                                    onChange={handleJobTitleChange}
                                    renderInput={(params) => <TextField {...params} label="پست سازمانی" />}
                                />
                            )}
                        />
                        {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
                    </FormControl>
                </Grid>
                {/* نوع قرارداد با Slider */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel shrink>نوع قرارداد</InputLabel>
                        <OutlinedInput
                            notched
                            label="نوع قرارداد"
                            inputComponent={() => null} // خالی گذاشتن کامپوننت ورودی برای سفارشی‌سازی محتوا
                            endAdornment={
                                <Controller
                                    name="contractType"
                                    control={control}
                                    defaultValue={1} // مقدار پیش‌فرض
                                    render={({ field }) => (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{
                                                mt: 2,
                                                ml: 2,
                                                px: 2,
                                                py: 1,
                                                width: '100%',
                                                gap: 2,
                                            }}
                                        >
                                            <Slider
                                                {...field} // اتصال Slider به فرم
                                                step={1}
                                                min={1}
                                                max={30}
                                                valueLabelDisplay="auto"
                                                sx={{ width: '80%', color: 'primary.main' }}
                                            />
                                            <Typography sx={{ pl: "18px" }}>
                                                {field.value === 30 ? 'تمام وقت' : `${field.value} روز کارکرد`}
                                            </Typography>
                                        </Box>
                                    )}
                                />
                            }
                        />
                        {errors.contractType && <Typography color="error">{errors.contractType.message}</Typography>}
                    </FormControl>
                </Grid>
                {/* شغل فعلی */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth size="small" error={!!errors.currentJob}>
                        <InputLabel>شغل فعلی</InputLabel>
                        <Controller
                            name="currentJob"
                            control={control}
                            defaultValue=""
                            rules={validation.currentJob}
                            render={({ field }) => (
                                <Select {...field} label="شغل فعلی">
                                    <MenuItem value="1">کارمند دهیاری</MenuItem>
                                    <MenuItem value="2">کارمند دولت</MenuItem>
                                    <MenuItem value="3">بخش خصوصی</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.currentJob && <Typography color="error">{errors.currentJob.message}</Typography>}
                    </FormControl>
                </Grid>

                {/* دهیاری‌های تحت پوشش */}
                <Grid item xs={12} sm={9}>
                    <FormControl
                        fullWidth
                        // size="small"
                        error={!!errors.coveredVillages}
                        disabled={mode === 'create' && !selectedJobTitle}
                    >
                        <InputLabel>دهیاری‌های تحت پوشش</InputLabel>
                        <Controller
                            name="coveredVillages"
                            control={control}
                            defaultValue={[]}
                            rules={validation.coveredVillages}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="دهیاری‌های تحت پوشش"
                                    multiple
                                    onChange={(e) => {
                                        handleChange(e.target.value);
                                        field.onChange(e.target.value);
                                    }}
                                    value={Array.isArray(field.value) ? field.value : []}
                                    renderValue={(selected) => (
                                        <div key={chipsKey} style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map(value => (
                                                <Chip
                                                    key={value}
                                                    label={villages.find(village => village.hierarchy_code === value)?.village_name}
                                                    style={{
                                                        backgroundColor: value === employerVillage ? 'gold' : 'default',
                                                        color: value === employerVillage ? 'black' : 'default'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={{
                                        PaperProps: { style: { maxHeight: 224 } }
                                    }}
                                >
                                    {villages.map((village) => (
                                        <MenuItem
                                            key={village.hierarchy_code}
                                            value={village.hierarchy_code}
                                            disabled={village.has_human_resource}
                                        >
                                            <IconButton
                                                onClick={(e) => handleEmployerVillageSelect(village.hierarchy_code, e)}
                                                edge="end"
                                            >
                                                {employerVillage === village.hierarchy_code ? <StarIcon /> : <StarBorderIcon />}
                                            </IconButton>
                                            {village.village_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.coveredVillages && <Typography color="error">{errors.coveredVillages.message}</Typography>}
                    </FormControl>
                </Grid>
            </Grid>
        );
    };

    export default StepOneFields;
