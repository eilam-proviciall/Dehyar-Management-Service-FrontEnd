    import React, { useState } from 'react';
    import { Backdrop, Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import { useForm, Controller, FormProvider } from 'react-hook-form';
    import axios from 'axios';
    import { toast } from 'react-toastify';

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
        human_resource_nid: {
            required: 'کد ملی الزامی است',
        },
    };

    const InsuranceModal = ({ open, handleClose, refreshData }) => {
        const methods = useForm();
        const [loading, setLoading] = useState(false);

        const handleSubmit = async (formData) => {
            setLoading(true);
            try {
                const response = await axios.post('/api/insurance-history', formData, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                toast.success('سابقه بیمه با موفقیت ثبت شد');
                methods.reset();
                handleClose();
                refreshData(); // بروز رسانی جدول پس از افزودن موفق
            } catch (error) {
                toast.error('خطا در ثبت اطلاعات');
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <Modal
                open={open}
                onClose={handleClose}
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
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Controller
                                    name="start_date"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.start_date}
                                    render={({ field }) => (
                                        <TextField {...field} label="تاریخ شروع" fullWidth error={!!methods.formState.errors.start_date} helperText={methods.formState.errors.start_date?.message} />
                                    )}
                                />
                                <Controller
                                    name="end_date"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.end_date}
                                    render={({ field }) => (
                                        <TextField {...field} label="تاریخ پایان" fullWidth error={!!methods.formState.errors.end_date} helperText={methods.formState.errors.end_date?.message} />
                                    )}
                                />
                                <Controller
                                    name="month"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.month}
                                    render={({ field }) => (
                                        <TextField {...field} label="تعداد ماه" fullWidth error={!!methods.formState.errors.month} helperText={methods.formState.errors.month?.message} />
                                    )}
                                />
                                <Controller
                                    name="human_resource_nid"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.human_resource_nid}
                                    render={({ field }) => (
                                        <TextField {...field} label="کد ملی" fullWidth error={!!methods.formState.errors.human_resource_nid} helperText={methods.formState.errors.human_resource_nid?.message} />
                                    )}
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                                    {loading ? 'در حال ارسال...' : 'ثبت'}
                                </Button>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Modal>
        );
    };

    export default InsuranceModal;
