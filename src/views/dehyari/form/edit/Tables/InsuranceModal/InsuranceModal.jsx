import React, { useState, useEffect } from 'react';
import {
    Backdrop,
    Box,
    Button,
    Modal,
    Grid,
    TextField,
    Typography,
    IconButton,
    FormControl,
    InputLabel, Select, MenuItem
} from '@mui/material';
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
    width: '40%',
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
    day: {
        required: 'تعداد ماه الزامی است',
        min: { value: 1, message: 'حداقل ۱ ماه' },
    },
    insuranceWorkshop: {
        required: 'انتخاب کارگاه الزامی است',
    },
};

const InsuranceModal = ({ open, handleClose, refreshData, mode = 'create', editId = null }) => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);

    // اگر در حالت ویرایش هستیم، اطلاعات رکورد را دریافت می‌کنیم
    useEffect(() => {
        if (mode === 'edit' && editId) {
            setLoading(true);
            axios.get(`${InsuranceHistory()}/show/${editId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    methods.reset({
                        start_date: response.data.data.start_date,
                        end_date: response.data.data.end_date,
                        month: response.data.data.month,
                        days: response.data.data.days,
                        dehyari_title: response.data.data.dehyari_title,
                        insurance_workshop: response.data.data.insurance_workshop, // اطمینان از استفاده از نام صحیح فیلد
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error('خطا در دریافت اطلاعات');
                    setLoading(false);
                });
        }
    }, [mode, editId, methods]);

    const handleSubmit = async (formData) => {
        formData.human_resource_nid = new URLSearchParams(window.location.search).get('param')
        setLoading(true);
        try {
            const isValid = await methods.trigger();
            if (!isValid) {
                setLoading(false);
                return;
            }
            if (mode === 'create') {
                console.log(formData)
                // حالت ایجاد
                const response = await axios.post(InsuranceHistory(), formData, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 201) {
                    toast.success('سابقه بیمه با موفقیت ثبت شد');
                    methods.reset();
                    handleClose();
                    refreshData();
                }
            } else if (mode === 'edit' && editId) {
                // حالت ویرایش
                const response = await axios.put(`${InsuranceHistory()}/${editId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 200) {
                    toast.success('سابقه بیمه با موفقیت ویرایش شد');
                    methods.reset();
                    handleClose();
                    refreshData();
                }
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
            setLoading(false);
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
                    {mode === 'create' ? 'ثبت سابقه بیمه' : 'ویرایش سابقه بیمه'}
                </Typography>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <Grid container spacing={2}>
                            {/* تاریخ شروع */}
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="days"
                                    control={methods.control}
                                    defaultValue=""
                                    rules={validationSchemas.days}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="تعداد روز"
                                            fullWidth
                                            size="small"
                                            error={!!methods.formState.errors.days}
                                            helperText={methods.formState.errors.days?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="dehyari_title"
                                    control={methods.control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="عنوان محل کار"
                                            fullWidth
                                            size="small"
                                            error={!!methods.formState.errors.dehyari_title}
                                            helperText={methods.formState.errors.dehyari_title?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* کارگاه بیمه */}
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>کارگاه بیمه</InputLabel>
                                    <Controller
                                        name="insurance_workshop"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <Select {...field} label="کارگاه بیمه" size="small">
                                                <MenuItem value="1">دهیاری</MenuItem>
                                                <MenuItem value="2">سایر کارگاه‌ها</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
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
