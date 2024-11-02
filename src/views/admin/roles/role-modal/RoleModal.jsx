import { getRoles } from '@/Services/Admin';
import api from '@/utils/axiosInstance';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { minLength, object, string } from 'valibot';


const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const schema = object({
    name: string([minLength(1, 'این فیلد الزامی است')]),
    guard_name: string([minLength(1, 'این فیلد الزامی است'),])
})

const RoleModal = ({ data, allData, onRefresh, onClose }) => {

    // States
    const [errorState, setErrorState] = useState(null);
    const rowId = data.id;
    const status = data.status;
    const name = data.name;
    const guard_name = data.guard_name;

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            name: status == "edit" ? name : "",
            guard_name: status == "edit" ? guard_name : "",
        }
    })

    // Style
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: "1rem",
        boxShadow: 24,
        p: 4,
    }


    const onSubmit = async (data) => {
        console.log("GuardName => ", data.guard_name);

        if (status == "add") {
            const exists = allData.some(item => item.name == data.name);
            if (exists) {
                return toast.error("نام لاتین انتخابی شما تکراری است!");
            } else {
                try {
                    await api.post(
                        getRoles(),
                        {
                            name: data.name,
                            guard_name: data.guard_name,
                        },
                        { requiresAuth: true }
                    );
                    toast.success('نقش جدید با موفقیت افزوده شد');
                    onClose();
                    return onRefresh();
                }
                catch {
                    return toast.error('خطایی رخ داده');
                }
            }
        }
        try {
            await api.put(
                `${getRoles()}/${rowId}`,
                {
                    name: data.name,
                    guard_name: data.guard_name,
                },
                {
                    params: {
                        roleId: data.id
                    },
                    requiresAuth: true,
                },
            );
            toast.success('نقش مورد نظر شما ویرایش شد');
            onClose();
            return onRefresh();
        }
        catch {
            toast.error('خطایی رخ داده');
        }
    }

    return (
        <Box sx={modalStyle}>
            <div className='flex justify-between'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`${status == "edit" ? "ویرایش" : "افزودن"} نقش`}
                </Typography>
                <Button className='rounded-full' color='inherit' onClick={onClose}><i className='ri-close-line'></i></Button>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                لطفا فیلد های زیر را با دقت پر کنید
            </Typography>
            <form
                noValidate
                method='post'
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-5 my-5'
            >
                <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            autoFocus
                            type='text'
                            label="عنوان لاتین"
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                field.onChange(value);
                                errorState !== null && setErrorState(null);
                            }}
                            {...((errors.name || errorState !== null) && {
                                error: true,
                                helperText: errors?.name?.message || errorState?.message[0]
                            })}
                        />
                    )}
                />
                <Controller
                    name='guard_name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            autoFocus
                            type='text'
                            label="عنوان فارسی"
                            onChange={(e) => {
                                const value = persianToEnglishDigits(e.target.value);
                                field.onChange(value);
                                errorState !== null && setErrorState(null);
                            }}
                            {...((errors.guard_name || errorState !== null) && {
                                error: true,
                                helperText: errors?.guard_name?.message || errorState?.message[0]
                            })}
                        />
                    )}
                />
                <Button fullWidth variant='contained' type='submit'>
                    {status == "edit" ? "ویرایش" : "افزودن"}
                </Button>
            </form>
        </Box>
    )
}

export default RoleModal