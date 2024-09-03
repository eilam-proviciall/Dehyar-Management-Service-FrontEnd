// React Imports
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
// import organizations from "@data/organizations.json"

const StepOrganization = ({ data, setData }) => {
    const { control } = useForm({
        defaultValues: {
            organization_type: data.organization_type,
        }
    });
    const organizations = [
        { value: 1, label: "دهیاری" },
        { value: 2, label: "شهرداری" }
    ]

    return (
        <FormControl fullWidth className='mbe-5'>
            <InputLabel id='organization'>نوع سازمان</InputLabel>
            <Controller
                name="organization_type"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label='نوع سازمان'
                        onChange={e => {
                            const newOrganizationType = e.target.value;
                            setData(prevValues => ({ ...prevValues, organization_type: data.organization_type }));
                            setTimeout(() => {
                                setData(prevValues => ({ ...prevValues, organization_type: newOrganizationType }));
                                field.onChange(e);
                            }, 0);
                        }}
                        fullWidth
                    >
                        {Object.entries(organizations.map(({ value, label }) => (
                            <MenuItem key={value} value={label}>
                                {label}
                            </MenuItem>
                        )))}
                    </Select>
                )}
            />
        </FormControl>
    )
}

export default StepOrganization