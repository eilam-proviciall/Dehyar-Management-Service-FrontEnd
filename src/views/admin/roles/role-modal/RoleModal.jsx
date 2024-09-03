import { getRoles } from '@/Services/Admin';
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
    guardName: string([minLength(1, 'این فیلد الزامی است'),])
})

const RoleModal = ({ data, allData, onRefresh, onClose }) => {

    // States
    const [errorState, setErrorState] = useState(null);
    const rowId = data.id;
    const status = data.status;
    const name = data.name;
    const guardName = data.guardName;

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            name: status == "edit" ? name : "",
            guardName: status == "edit" ? guardName : "",
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
        if (status == "add") {
            const exists = allData.some(item => item.name == data.name);
            if (exists) {
                return toast.error("نام لاتین انتخابی شما تکراری است!", {
                    position: "top-center",
                    duration: 3000
                });
            } else {
                try {
                    await axios.post(
                        getRoles(),
                        {
                            name: data.name,
                            guard_name: data.guardName,
                        },
                        {
                            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`, }
                        }
                    );
                    toast.success('نقش جدید با موفقیت افزوده شد', {
                        position: "top-center",
                        duration: 3000
                    });
                    onClose();
                    return onRefresh();
                }
                catch {
                    return toast.error('خطایی رخ داده', {
                        position: "top-center",
                        duration: 3000
                    });
                }
            }
        }
        try {
            await axios.put(
                `${getRoles()}/${rowId}`,
                {
                    name: data.name,
                    guard_name: data.guardName,
                },
                {
                    params: {
                        roleId: data.id
                    },
                    headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`, }
                },
            );
            toast.success('نقش مورد نظر شما ویرایش شد', {
                position: "top-center",
                duration: 3000
            });
            onClose();
            return onRefresh();
        }
        catch {
            toast.error('خطایی رخ داده', {
                position: "top-center",
                duration: 3000
            });
        }
    }

    return (
        <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {`${status == "edit" ? "ویرایش" : "افزودن"} نقش`}
            </Typography>
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
                    name='guardName'
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
                            {...((errors.guardName || errorState !== null) && {
                                error: true,
                                helperText: errors?.guardName?.message || errorState?.message[0]
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