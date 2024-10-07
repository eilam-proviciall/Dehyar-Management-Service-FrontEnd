import React from 'react'
import { Box, Button, Divider, FormControl, TextField } from '@mui/material';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepPopulationNew = ({ data, setData, step, setStep }) => {

    console.log("Data : ", data);

    const { control, handleSubmit, formState: { errors } } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'population_fields'
    });

    const onSubmit = (newData) => {
        console.log("New Data => ", newData);
        if (newData.population_fields.length) {
            setData(prevValues => ({ ...prevValues, population_fields: newData.population_fields }));
            setStep(step + 1)
        } else {
            toast.error("شما باید حداقل یک ردیف ایجاد کنید", {
                position: "top-center",
                duration: 3000,
            })
        }
    }

    console.log("ERRORS => ", errors);


    const renderTextField = (index, endName, name, label) => {
        return (
            <FormControl fullWidth>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <TextField
                            InputProps={
                                { style: { height: 45 }, inputProps: { style: { textAlign: 'center' } } }
                            }
                            label={label}
                            value={value}
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                setData(prevValues => ({ ...prevValues, [name]: value }));
                                onChange(value);
                            }}
                            {...((errors?.population_fields && errors?.population_fields[index] && errors?.population_fields[index]?.[endName]) && {
                                error: errors?.population_fields[index]?.[endName],
                                helperText: errors?.population_fields[index]?.[endName].message
                            })}
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
                        {renderTextField(index, 'year', `population_fields.${index}.year`, 'سال')}
                        {renderTextField(index, 'population', `population_fields.${index}.population`, 'جمعیت')}
                        {renderTextField(index, 'family', `population_fields.${index}.family`, 'خانوار')}
                        {renderTextField(index, 'man_count', `population_fields.${index}.man_count`, 'زن')}
                        {renderTextField(index, 'woman_count', `population_fields.${index}.woman_count`, 'مرد')}
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
                <Button variant="contained" type="submit" >
                    بعدی
                </Button>
            </Box>
        </Box>
    );
}

export default StepPopulationNew