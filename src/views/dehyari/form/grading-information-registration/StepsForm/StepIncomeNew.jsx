import { Box, Button, Divider, FormControl, TextField } from '@mui/material';
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepIncomeNew = ({ data, setData, step, setStep, setOpenModal }) => {
    console.log("Data : ", data);


    const { control, handleSubmit } = useForm({
        defaultValues: {
            income_fields: data.income_fields,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'income_fields'
    });

    const onSubmit = (newData) => {
        console.log("New Data => ", newData);
        setData(prevValues => ({ ...prevValues, income_fields: newData.income_fields }));
        setOpenModal(false);
        setStep(0);
    }

    const renderTextField = (name, label) => {
        return (
            <FormControl fullWidth>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <TextField
                            label={label}
                            value={value}
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                onChange(value);
                            }}
                        />
                    )}
                />
            </FormControl>
        )
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {fields.map((field, index) => (
                <>
                    <div key={field.id} className='md:flex grid mb-2 gap-2'>
                        {renderTextField(`income_fields.${index}.year`, 'سال')}
                        {renderTextField(`income_fields.${index}.per_income`, 'سرانه درآمد (ریال)')}
                        <Button variant="contained" color="error" onClick={() => remove(index)} >
                            <i className='ri-delete-bin-line'></i>
                        </Button>
                    </div>
                    <Divider sx={{ my: 5 }} />
                </>
            ))}
            <Button
                variant="contained"
                color="inherit"
                onClick={() => append({})}
                className='gap-2'
            >
                <i className='ri-add-line'></i>
                افزودن
            </Button>
            <Box display={'flex'} mt={10} gap={5} justifyContent={'space-between'}>
                <Button variant='contained' color='secondary' onClick={() => { setStep(step - 1) }}>برگشت</Button>
                <Button variant="contained" type="submit" color='success' >
                    ثبت
                </Button>
            </Box>
        </Box>
    );
}

export default StepIncomeNew