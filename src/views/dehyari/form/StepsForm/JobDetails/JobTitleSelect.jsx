import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { GetJobTitles } from "@/Services/humanResources";

const JobTitleSelect = ({ control, validation, errors }) => {
    const [jobTitles, setJobTitles] = useState([]);

    useEffect(() => {
        const fetchJobTitles = async () => {
            try {
                const response = await axios.get(GetJobTitles(), {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                setJobTitles(response.data);
            } catch (error) {
                console.error('Error fetching job titles:', error);
            }
        };

        fetchJobTitles();
    }, []);

    return (
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
                        {jobTitles.map((jobTitle) => (
                            <MenuItem key={jobTitle.id} value={jobTitle.id}>
                                {`${jobTitle.title} (درجه ${jobTitle.grade})`}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
        </FormControl>
    );
};

export default JobTitleSelect;
