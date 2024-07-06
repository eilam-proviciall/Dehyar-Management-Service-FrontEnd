import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import axios from 'axios';
import { GetFieldStudy } from "@/Services/humanResources";

const EducationFields = ({ control, watch, errors, validation }) => {
    const [fieldsOfStudy, setFieldsOfStudy] = useState({});

    const educationDegrees = [
        { title: "بی سواد", value: 41 },
        { title: "سیکل", value: 42 },
        { title: "دیپلم", value: 43 },
        { title: "کاردانی", value: 44 },
        { title: "کارشناسی", value: 45 },
        { title: "کارشناسی ارشد", value: 46 },
        { title: "دکترا", value: 47 }
    ];

    const fetchFieldsOfStudy = async (grade) => {
        grade = grade[0];
        try {
            const response = await axios.get(GetFieldStudy(), {
                params: { grade }
            });
            setFieldsOfStudy(prev => ({ ...prev, [grade]: response.data }));
        } catch (error) {
            console.error('Error fetching fields of study:', error);
        }
    };

    const handleDegreeChange = (e, field) => {
        field.onChange(e.target.value);
        if (e.target.value >= 44) {
            fetchFieldsOfStudy([e.target.value]);
        }
    };

    return (
        <>
            <FormControl fullWidth size="small" error={!!errors?.degree}>
                <InputLabel>مدرک تحصیلی</InputLabel>
                <Controller
                    name='degree'
                    control={control}
                    defaultValue=""
                    rules={validation.degree}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="مدرک تحصیلی"
                            onChange={(e) => handleDegreeChange(e, field)}
                            value={field.value}
                        >
                            {educationDegrees.map(degree => (
                                <MenuItem key={degree.value} value={degree.value}>
                                    {degree.title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors?.degree &&
                    <FormHelperText>{errors.degree.message}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth size="small" error={!!errors?.fieldOfStudy}>
                <InputLabel>رشته تحصیلی</InputLabel>
                <Controller
                    name='fieldOfStudy'
                    control={control}
                    defaultValue=""
                    rules={validation.fieldOfStudy}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="رشته تحصیلی"
                            disabled={!watch('degree') || watch('degree') < 44}
                        >
                            {(fieldsOfStudy[watch('degree')] || []).map(field => (
                                <MenuItem key={field.code} value={field.code}>
                                    {field.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors?.fieldOfStudy &&
                    <FormHelperText>{errors.fieldOfStudy.message}</FormHelperText>}
            </FormControl>
        </>
    );
};

export default EducationFields;
