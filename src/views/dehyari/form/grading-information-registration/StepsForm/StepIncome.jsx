import { Box, Button, Divider, FormControl, Grid, TextField } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepIncome = ({ data, setData, step, setStep, setOpenModal }) => {
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            income_fields: data.income_fields,
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
                    render={({ field: { value = '', onChange } }) => (
                        <TextField
                            label={label}
                            value={value}
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                setData(prevData => {
                                    const updatedPopulationField = [...prevData.income_fields];
                                    console.log("Array", updatedPopulationField[id]);
                                    // تغییر مقدار مورد نظر
                                    updatedPopulationField[id][name] = value;
                                    // بازگشت به آبجکت به‌روز شده
                                    console.log("Data => ", data.income_fields);

                                    return {
                                        ...prevData,
                                        income_fields: updatedPopulationField
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

    const handleSubmit = () => {
        if (allObjectsHaveValues(data.income_fields) == true && data.income_fields.length > 0) {
            toast.success("اطلاعات با موفقیت ذخیره شد", {
                position: "top-center"
            });
            setOpenModal()
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
                'id': newData.length,
                [`income_fields.${id}.year`]: '',
                [`income_fields.${id}.per_income`]: '',
            }
            setData(prevData => {
                const updatedPopulationField = [...prevData.income_fields];
                console.log(updatedPopulationField);

                // تغییر مقدار مورد نظر
                updatedPopulationField.push(newValue);
                // بازگشت به آبجکت به‌روز شده
                return {
                    ...prevData,
                    income_fields: updatedPopulationField
                };
            });
        } else {
            toast.error("ابتدا فیلد قبلی را تکمیل نمایید", {
                position: "top-center"
            });
        }
    }

    const handleDeletePopulationField = (id) => {
        const updatePopulationFields = data.income_fields.filter((field) => field.id !== id);
        setData(prevValues => ({ ...prevValues, income_fields: updatePopulationFields }));
        console.log("Data Then Deleted => ", data.income_fields);

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
                {data.income_fields.map((field) => (
                    <div className='my-5'>
                        <div className='grid md:grid-cols-3 gap-2'>
                            {renderTextField(field.id, `income_fields.${field.id}.year`, 'سال', 'وارد کردن سال الزامی است')}
                            {renderTextField(field.id, `income_fields.${field.id}.per_income`, 'سرانه درآمد (ریال)', 'سرانه درآمد الزامی است')}
                            <Button sx={{ height: '75%' }} variant='contained' color='error' onClick={() => { handleDeletePopulationField(field.id) }}>حذف</Button>
                        </div>
                        <Divider />
                    </div>
                ))}
                <Button variant='contained' color='inherit' className='gap-2' onClick={() => {
                    handleAddNewPopulationField(data.income_fields)
                }
                }>
                    <i className='ri-add-line'></i>
                    افزودن
                </Button>
                <Box display={'flex'} mt={10} gap={5} justifyContent={'center'} >
                    <Button variant='contained' color='secondary' onClick={() => { setStep(step - 1) }}>برگشت</Button>
                    <Button variant='contained' color='success' onClick={() => { handleSubmit() }} >ثبت</Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default StepIncome