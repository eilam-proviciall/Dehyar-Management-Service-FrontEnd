import React, { useState } from 'react';
import { Backdrop, Box, Button, Modal, Grid, TextField, Typography, IconButton, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {InsuranceHistory} from "@/Services/humanResources";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const validationSchemas = {
    start_date: {
        required: 'تاریخ شروع الزامی است',
    },
    end_date: {
        required: 'تاریخ پایان الزامی است',
    },
    month: {
        required: 'تعداد ماه الزامی است',
        min: { value: 1, message: 'حداقل ۱ ماه' },
    },
};

const InsuranceModal = ({ open, handleClose, refreshData ,nid}) => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            // اعتبارسنجی سمت کلاینت
            const isValid = await methods.trigger();
            if (!isValid) {
                setLoading(false);
                return;
            }
             formData.human_resource_nid = nid
            // ارسال درخواست به سرور
            const response = await axios.post(InsuranceHistory(), formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            });

            // چک کردن موفقیت پاسخ از سرور
            if (response.status === 201) {
                toast.success('سابقه بیمه با موفقیت ثبت شد');
                methods.reset(); // ریست کردن فرم بعد از پاسخ موفق
                handleClose(); // بستن مودال
                refreshData(); // بروز رسانی جدول
            } else {
                throw new Error('خطا در ثبت اطلاعات');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    toast.error(error.response.data.errors[key][0], { position: 'top-center' });
                });
            } else {
                toast.error('خطا در ثبت اطلاعات', { position: 'top-center' });
            }
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false); // مخفی کردن لودر
        }
    };


    return (
        <Modal
            open={open}
            onClose={null} // بسته نشدن مودال با کلیک بیرون از آن
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
        >
            <Box sx={modalStyle}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    ثبت سابقه بیمه
                </Typography>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <Grid container spacing={2}>
                            {/* تاریخ شروع */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="start_date"
                                        control={methods.control}
                                        defaultValue={null}
                                        rules={validationSchemas.start_date}
                                        render={({ field }) => (
                                            <DatePicker
                                                value={field.value ? new Date(field.value * 1000) : null}
                                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                                calendar={persian}
                                                locale={persian_fa}
                                                calendarPosition="bottom-right"
                                                render={
                                                    <TextField
                                                        fullWidth
                                                        label="تاریخ شروع"
                                                        size="small"
                                                        error={!!methods.formState.errors.start_date}
                                                        helperText={methods.formState.errors.start_date?.message}
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {/* تاریخ پایان */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="end_date"
                                        control={methods.control}
                                        defaultValue={null}
                                        rules={validationSchemas.end_date}
                                        render={({ field }) => (
                                            <DatePicker
                                                value={field.value ? new Date(field.value * 1000) : null}
                                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                                calendar={persian}
                                                locale={persian_fa}
                                                calendarPosition="bottom-right"
                                                render={
                                                    <TextField
                                                        fullWidth
                                                        label="تاریخ پایان"
                                                        size="small"
                                                        error={!!methods.formState.errors.end_date}
                                                        helperText={methods.formState.errors.end_date?.message}
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {/* تعداد ماه */}
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="month"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.month}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="تعداد ماه"
                                            fullWidth
                                            size="small"
                                            error={!!methods.formState.errors.month}
                                            helperText={methods.formState.errors.month?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ marginTop: 3 }}>
                            {loading ? 'در حال ارسال...' : 'ثبت'}
                        </Button>
                    </form>
                </FormProvider>
            </Box>
        </Modal>
    );
};

export default InsuranceModal;
