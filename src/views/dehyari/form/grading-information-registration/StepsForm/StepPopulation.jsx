import DividerSimple from '@/components/common/Divider/DividerSimple';
import { Box, Button, Divider, FormControl, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepPopulation = ({ data, setData, step, setStep }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            population_fields: data.population_fields,
        },
    });

    const renderTextField = (id, name, label, errorText) => {
        return (
            <FormControl fullWidth className='mbe-5'>
                <Controller
                    key={id}
                    name={name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <TextField
                            label={label}
                            value={value}
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                setData(prevData => {
                                    const updatedPopulationField = [...prevData.population_fields];
                                    console.log("Array", updatedPopulationField[id]);
                                    // تغییر مقدار مورد نظر
                                    updatedPopulationField[id][name] = value;
                                    // بازگشت به آبجکت به‌روز شده
                                    console.log("Data => ", data.population_fields);

                                    return {
                                        ...prevData,
                                        population_fields: updatedPopulationField
                                    };
                                });
                                onChange(value);
                            }}
                        />
                    )}
                    error={!!errors[name]}
                    helperText={errors[name] ? errorText : ''}
                />
            </FormControl>
        )
    }

    const allObjectsHaveValues = (arr) => {
        return arr.every(obj =>
            Object.values(obj).every(value => value !== '')
        );
    };

    const handleNextStep = () => {
        if (allObjectsHaveValues(data.population_fields) == true && data.population_fields.length > 0) {
            setStep(step + 1);
        } else {
            toast.error("مقادیر مربوط به جمعیت را وارد نمایید", {
                position: "top-center"
            });
        }
    }

    const handleAddNewPopulationField = (newData) => {
        console.log("New Data => ", newData);
        console.log(allObjectsHaveValues(newData));

        if (allObjectsHaveValues(newData) == true || newData.length == 0) {
            const id = newData.length;
            const newValue = {
                'id': Date.now(),
                [`population_fields.${id}.year`]: '',
                [`population_fields.${id}.population`]: '',
                [`population_fields.${id}.family`]: '',
                [`population_fields.${id}.man_count`]: '',
                [`population_fields.${id}.woman_count`]: '',
            }
            setData(prevData => {
                const updatedPopulationField = [...prevData.population_fields];
                console.log(updatedPopulationField);

                // تغییر مقدار مورد نظر
                updatedPopulationField.push(newValue);
                // بازگشت به آبجکت به‌روز شده
                return {
                    ...prevData,
                    population_fields: updatedPopulationField
                };
            });
        } else {
            toast.error("ابتدا فیلد قبلی را تکمیل نمایید", {
                position: "top-center"
            });
        }
    }

    const handleDeletePopulationField = (id) => {
        const updatePopulationFields = data.population_fields.filter((field) => field.id !== id);
        setData(prevValues => ({ ...prevValues, population_fields: updatePopulationFields }));
        console.log("Data Then Deleted => ", data.population_fields);
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Grid container spacing={2} mt={1}>
            {/* <Grid item xs={12} mb={5}>
                <DividerSimple title={data.organization_type} />
            </Grid> */}
            <Grid className='w-full'>
                {data.population_fields.map((field) => (
                    <div className='my-5'>
                        <div className='grid md:grid-cols-6 gap-2'>
                            {renderTextField(field.id, `population_fields.${field.id}.year`, 'سال', 'وارد کردن سال الزامی است')}
                            {renderTextField(field.id, `population_fields.${field.id}.population`, 'جمعیت', 'وارد کردن جمعیت الزامی است')}
                            {renderTextField(field.id, `population_fields.${field.id}.family`, 'خانوار', 'وارد کردن خانوار الزامی است')}
                            {renderTextField(field.id, `population_fields.${field.id}.man_count`, 'مرد', 'وارد کردن مرد الزامی است')}
                            {renderTextField(field.id, `population_fields.${field.id}.woman_count`, 'زن', 'وارد کردن زن الزامی است')}
                            <Button sx={{ height: '75%' }} variant='contained' color='error' onClick={() => { handleDeletePopulationField(field.id) }}><i className='ri-delete-bin-line'></i></Button>
                        </div>
                        <Divider />
                    </div>
                ))}
                <Button variant='contained' color='inherit' className='gap-2' onClick={() => {
                    handleAddNewPopulationField(data.population_fields)
                }
                }>
                    <i className='ri-add-line'></i>
                    افزودن
                </Button>
                <Box display={'flex'} mt={10} gap={5} justifyContent={'center'} >
                    <Button variant='contained' color='secondary' onClick={() => { setStep(step - 1) }}>برگشت</Button>
                    <Button variant='contained' color='primary' onClick={() => { handleNextStep() }} >بعدی</Button>
                    {/* <Button variant='contained' color='success' onClick={() => { }}>ثبت</Button> */}
                </Box>
            </Grid>
        </Grid>
    );
}

export default StepPopulation