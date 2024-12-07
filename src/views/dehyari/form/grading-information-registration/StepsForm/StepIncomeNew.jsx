import React from 'react'
import { Box, Button, Divider, FormControl, TextField } from '@mui/material';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GradingInformationDTO } from "@/utils/gradingInformationDTO";
import api from '@/utils/axiosInstance';
import { getDivisonInformation } from '@/Services/Grading';

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const StepIncomeNew = ({ data, setData, step, setStep, onClose, mode, methods }) => {
    console.log("Data : ", data);

    const { control, handleSubmit, formState: { errors } } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'incomes'
    });

    const onSubmit = async (newData) => {

        if (newData.incomes.length) {
            const numericIncomes = newData.incomes.map(income => ({
                year: parseInt(income.year, 10),
                income_per_capital: parseFloat(income.income_per_capital.replace(/,/g, '')),
                total_income: parseFloat(income.total_income.replace(/,/g, ''))
            }));

            const finallyData = {
                ...data,
                incomes: numericIncomes,
            };

            console.log("Finally Data => ", finallyData);

            const gradingDTO = new GradingInformationDTO(data);
            // const finallyData = {
            //     organization: gradingDTO.organization,
            //     hierarchical_code: gradingDTO.hierarchyCode,
            //     village_code: gradingDTO.villageCode,
            //     nid: gradingDTO.nid,
            //     dehyari_status: gradingDTO.dehyariStatus,
            //     area_hectares: gradingDTO.areaHectares,
            //     centralization: gradingDTO.centralization,
            //     tourism_goal: gradingDTO.tourismGoal,
            //     postal_code: gradingDTO.postalCode,
            //     fire_station: gradingDTO.fireStation,
            //     foundation_date: gradingDTO.foundationDate,
            //     grade_date: gradingDTO.gradeDate,
            //     grade: gradingDTO.grade,
            //     populations: gradingDTO.populations,
            //     incomes: newData.incomes,
            //     states: gradingDTO.states,
            //     cities: gradingDTO.cities,
            //     regions: gradingDTO.regions,
            //     departments: gradingDTO.departments,
            //     dehestans: gradingDTO.dehestans,
            //     villages: gradingDTO.villages,
            // }
            methods = finallyData;
            console.log("Methods =>", methods);
            if (mode == 'add') {
                await api.post(getDivisonInformation(), finallyData, { requiresAuth: true });
                toast.success("اطلاعات با موفقیت ثبت شد");
            } else {
                await api.put(`${getDivisonInformation()}/${data.id}`, finallyData, { requiresAuth: true });
                console.log("Finally Data => ", finallyData);
                toast.success("اطلاعات با موفقیت ویرایش شد");
            }
            onClose();
            setStep(0);
        } else {
            toast.error("شما باید حداقل یک ردیف ایجاد کنید")
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
                            {...((errors?.incomes && errors?.incomes[index] && errors?.incomes[index]?.[endName]) && {
                                error: errors?.incomes[index]?.[endName],
                                helperText: errors?.incomes[index]?.[endName].message
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
                        {renderTextField(index, 'year', `incomes.${index}.year`, 'سال')}
                        {renderTextField(index, 'income_per_capital', `incomes.${index}.income_per_capital`, 'سرانه درآمد (ریال)')}
                        {renderTextField(index, 'total_income', `incomes.${index}.total_income`, 'درآمد (ریال)')}
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