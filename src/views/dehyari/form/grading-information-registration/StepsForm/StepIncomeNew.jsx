import React from 'react'
import { Box, Button, Divider, FormControl, TextField } from '@mui/material';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GradingInformationDTO } from "@/utils/GradingInformationDTO";

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepIncomeNew = ({ data, setData, step, setStep, onClose, users, setUsers, mode, methods }) => {
    console.log("Data : ", data);

    const { control, handleSubmit, formState: { errors } } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'income_fields'
    });

    const onSubmit = (newData) => {

        if (newData.income_fields.length) {
            setData(prevValues => ({ ...prevValues, income_fields: newData.income_fields }));
            const gradingDTO = new GradingInformationDTO(data);
            const finallyData = {
                id: mode == 'add' ? Date.now() : gradingDTO.id,
                organization_type: gradingDTO.organizationType,
                hierarchical_code: gradingDTO.hierarchicalCode,
                village_code: gradingDTO.villageCode,
                nid: gradingDTO.nid,
                dehyari_status: gradingDTO.dehyariStatus,
                wide: gradingDTO.wide,
                centrality_status: gradingDTO.centralityStatus,
                tourism_status: gradingDTO.tourismStatus,
                postal_code: gradingDTO.postalCode,
                fire_station: gradingDTO.fireStation,
                date_established: gradingDTO.dateEstablished,
                date_grading: gradingDTO.dateGrading,
                grade: gradingDTO.grade,
                population_fields: gradingDTO.populationFields,
                income_fields: newData.income_fields
            }
            methods = finallyData;
            console.log("Methods =>", methods);
            if (mode == 'add') {
                setUsers([...users, finallyData]);
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-center",
                    duration: 3000,
                });
            } else {
                console.log("Finally Data => ", finallyData);
                const newUsers = users.map(user => user.id == data.id ? { ...user, ...finallyData } : user);
                setUsers(newUsers);
                toast.success("اطلاعات با موفقیت ویرایش شد", {
                    position: "top-center",
                    duration: 3000,
                });
            }
            onClose();
            setStep(0);
        } else {
            toast.error("شما باید حداقل یک ردیف ایجاد کنید", {
                position: "top-center",
                duration: 3000,
            })
        }
        console.log("Mode => ", mode);
        console.log("New Data => ", newData);
    }

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
                            {...((errors?.income_fields && errors?.income_fields[index] && errors?.income_fields[index]?.[endName]) && {
                                error: errors?.income_fields[index]?.[endName],
                                helperText: errors?.income_fields[index]?.[endName].message
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
                        {renderTextField(index, 'year', `income_fields.${index}.year`, 'سال')}
                        {renderTextField(index, 'per_income', `income_fields.${index}.per_income`, 'سرانه درآمد (ریال)')}
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