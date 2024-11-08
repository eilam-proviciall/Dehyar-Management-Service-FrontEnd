import React, {useState, useEffect, useCallback} from 'react';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Slider,
    Box,
    Chip,
    IconButton,
    Autocomplete
} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import jobTitleOptions from "@data/jobTitles";
import {GetHumanCoverdVillageForCfo} from "@/Services/humanResources";
import OutlinedInput from "@mui/material/OutlinedInput";
import api from '@/utils/axiosInstance';
import contractType from "@data/contractType.json";

const StepOneFields = ({validation, mode}) => {
    const {control, formState: {errors}, setValue, getValues} = useFormContext();
    const [contractTypeValue, setContractTypeValue] = useState(1);
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [villages, setVillages] = useState([]);
    const [employerVillage, setEmployerVillage] = useState('');
    const [chipsKey, setChipsKey] = useState(0);

    console.log("Covered Villages => ", getValues('coveredVillages'));


    // هندل کردن تغییرات Slider
    const handleSliderChange = (event, newValue) => {
        setContractTypeValue(newValue);
    };

    const handleJobTitleChange = (event, value) => {
        const jobTitle = value?.value || '';
        setSelectedJobTitle(jobTitle);
        setValue('jobTitle', jobTitle);
    };

    // فانکشن Fetch کردن دهیاری‌های تحت پوشش
    const fetchVillages = useCallback(async (jobTitle) => {
        if (jobTitle) {
            try {
                const response = await api.get(GetHumanCoverdVillageForCfo(), {
                    params: { job_title: jobTitle },
                    requiresAuth: true
                });
                setVillages(response.data);
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        }
    }, []);

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
        if (selectedJobTitle) {
            fetchVillages(selectedJobTitle);
        }
    }, [selectedJobTitle, fetchVillages]);
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
            const currentJobTitle = getValues('jobTitle');
            if (currentJobTitle) {
                fetchVillages(currentJobTitle);
                setSelectedJobTitle(currentJobTitle);
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
        <Grid className='p-5 border-2 rounded-xs' container spacing={2}>
            <div className='grid grid-cols-2 gap-5 w-full my-5'>
                {/* پست سازمانی */}
                <FormControl fullWidth>
                    <Controller
                        name="jobTitle"
                        control={control}
                        defaultValue=""
                        rules={validation.jobTitle}
                        render={({field}) => (
                            <Autocomplete
                                {...field}
                                // size="small"
                                options={options}
                                groupBy={(option) => option.group}
                                getOptionLabel={(option) => option.label}
                                value={findOption(field.value)}
                                onChange={handleJobTitleChange}
                                renderInput={(params) => <TextField {...params} label="پست سازمانی"/>}
                            />
                        )}
                    />
                    {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
                </FormControl>
                {/* شغل فعلی */}
                <FormControl fullWidth error={!!errors.currentJob}>
                    <InputLabel>شغل فعلی</InputLabel>
                    <Controller
                        name="currentJob"
                        control={control}
                        defaultValue=""
                        rules={validation.currentJob}
                        render={({field}) => (
                            <Select {...field} label="شغل فعلی">
                                <MenuItem value="1">کارمند دهیاری</MenuItem>
                                <MenuItem value="2">کارمند دولت</MenuItem>
                                <MenuItem value="3">بخش خصوصی</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.currentJob && <Typography color="error">{errors.currentJob.message}</Typography>}
                </FormControl>
            </div>
            <div className='grid grid-cols-1 w-full gap-5'>
                {/* نوع قرارداد با Slider */}
                <FormControl fullWidth variant="outlined" className=''>
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
                                render={({field}) => (
                                    <Box
                                        className={'grid grid-cols-4 text-center items-center mt-2 ml-2 px-2 py-2 w-full gap-2'}
                                    >
                                        <Slider
                                            {...field} // اتصال Slider به فرم
                                            step={1}
                                            min={1}
                                            max={30}
                                            valueLabelDisplay="auto"
                                            className='col-span-3'
                                            sx={{width: '80%', color: 'primary.main'}}
                                        />
                                        <Chip label={field.value === 30 ? "تمام وقت" : `${field.value} روز کارکرد `}
                                              className={`h-7 rounded-full ${field.value === 30 && "bg-green-700 text-backgroundDefault" || "bg-gray-200 text-textPrimary"}`}
                                        />
                                    </Box>
                                )}
                            />
                        }
                    />
                    {errors.contractType && <Typography color="error">{errors.contractType.message}</Typography>}
                </FormControl>
            </div>
            <div className='grid grid-cols-1 gap-5 w-full my-5'>
                {/* دهیاری‌های تحت پوشش */}
                <FormControl
                    fullWidth
                    error={!!errors.coveredVillages}
                    disabled={mode === 'create' && !selectedJobTitle}
                >
                    <InputLabel>دهیاری‌های تحت پوشش</InputLabel>
                    <Controller
                        name="coveredVillages"
                        control={control}
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
                                            {employerVillage === village.hierarchy_code ? <StarIcon /> :
                                                <StarBorderIcon />}
                                        </IconButton>
                                        {village.village_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.coveredVillages && <Typography color="error">{errors.coveredVillages.message}</Typography>}
                </FormControl>
            </div>
        </Grid>
    );
};

export default StepOneFields;
