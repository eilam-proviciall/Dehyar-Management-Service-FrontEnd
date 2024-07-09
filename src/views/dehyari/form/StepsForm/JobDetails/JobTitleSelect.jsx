import React from 'react';
import { FormControl, InputLabel, Autocomplete, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import jobTitleOptions from "@data/jobTitles";

const JobTitleSelect = ({ control, validation, errors }) => {
    const { setValue, getValues } = useFormContext();

    const options = jobTitleOptions.flatMap(group =>
        group.titles.map(title => ({
            group: group.group,
            value: title.value,
            label: title.label
        }))
    );

    const findOption = (value) => options.find(option => option.value === value) || null;

    return (
        <FormControl fullWidth size="small">
            <Controller
                name="jobTitle"
                control={control}
                defaultValue=""
                rules={validation.jobTitle}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        size="small"
                        options={options}
                        groupBy={(option) => option.group}
                        getOptionLabel={(option) => option.label}
                        value={findOption(field.value)}
                        onChange={(e, value) => {
                            field.onChange(value?.value || '');
                            setValue('jobTitleLabel', value?.label || '');
                        }}
                        renderInput={(params) => <TextField {...params} label="پست سازمانی" />}
                    />
                )}
            />
            {errors.jobTitle && <Typography color="error">{errors.jobTitle.message}</Typography>}
        </FormControl>
    );
};

export default JobTitleSelect;
