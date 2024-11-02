// React Imports
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import organizations from "@data/organizations.json"

const StepOrganization = ({ data, setData, step, setStep }) => {
    const { control } = useForm({
        defaultValues: {
            organization_type: data.organization_type,
        }
    });
    const organizations = [
        { value: 1, label: "دهیاری" },
        { value: 2, label: "شهرداری" }
    ]

    const handleNextStep = () => {
        data.organization_type === '' ? toast.error("شما باید یک سازمان را برای رفتن به مرحله بعد انتخاب نمایید") : setStep(1);
    }

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
            <Box display={'flex'} mt={2} gap={5} justifyContent={'center'} >
                <Button type='submit' variant='contained' color='primary' onClick={() => { handleNextStep() }}>بعدی</Button>
            </Box>
        </FormControl>
    )
}

export default StepOrganization