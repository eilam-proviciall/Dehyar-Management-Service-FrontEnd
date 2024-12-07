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
import DateObject from "react-date-object";
import { InsuranceHistory } from "@/Services/humanResources";

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

// تابع تبدیل تاریخ شمسی به timestamp
const convertPersianDateToTimestamp = (persianDate) => {
    if (!persianDate) return null;
    const [year, month, day] = persianDate.split('/');
    const date = new DateObject({
        calendar: persian,
        date: `${year}/${month}/${day}`,
        format: "YYYY/MM/DD"
    });
    return date.toUnix() * 1000; // تبدیل به میلی‌ثانیه
};

const InsuranceModal = ({ open, handleClose, refreshData, mode = 'create', editId = null }) => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);
    const [existingRecords, setExistingRecords] = useState([]);

    // دریافت تمام سوابق بیمه برای بررسی تداخل
    useEffect(() => {
        if (mode === 'edit' && editId) {
            setLoading(true);
            axios.get(`${InsuranceHistory()}/show/${editId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            }).then((response) => {
                methods.reset({
                    start_date: response.data.data.start_date,
                    end_date: response.data.data.end_date,
                    month: response.data.data.month,
                    days: response.data.data.days,
                    dehyari_title: response.data.data.dehyari_title,
                    insurance_workshop: response.data.data.insurance_workshop,
                });
                setLoading(false);
            }).catch((error) => {
                toast.error('خطا در دریافت اطلاعات');
                setLoading(false);
            });
        } else if (mode === 'create') {
            methods.reset({
                start_date: null,
                end_date: null,
                month: null,
                days: null,
                dehyari_title: null,
                insurance_workshop: null,
            });
        }
        const fetchExistingRecords = async () => {
            try {
                const humanResourceId = new URLSearchParams(window.location.search).get('param');
                const response = await axios.get(`${InsuranceHistory()}/${humanResourceId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                setExistingRecords(response.data.filter(record => record.id !== editId));
            } catch (error) {
                console.error('Error fetching existing records:', error);
            }
        };

        if (open) {
            fetchExistingRecords();
        }
    }, [open, mode, editId]);

    // تابع بررسی تداخل تاریخ‌ها
    const checkDateOverlap = (newStartDate, newEndDate) => {
        if (!newStartDate || !newEndDate || existingRecords.length === 0) {
            return { hasOverlap: false };
        }

        // تبدیل تاریخ‌های جدید به timestamp
        const newStartTimestamp = newStartDate * 1000;
        const newEndTimestamp = newEndDate * 1000;

        // مرتب کردن رکوردها بر اساس تاریخ شروع
        const sortedRecords = [...existingRecords].sort((a, b) => {
            const aTime = convertPersianDateToTimestamp(a.start_date);
            const bTime = convertPersianDateToTimestamp(b.start_date);
            return aTime - bTime;
        });

        for (const record of sortedRecords) {
            const existingStartTimestamp = convertPersianDateToTimestamp(record.start_date);
            const existingEndTimestamp = convertPersianDateToTimestamp(record.end_date);

            // حالت‌های تداخل
            const case1 = newStartTimestamp >= existingStartTimestamp && newStartTimestamp <= existingEndTimestamp;
            const case2 = newEndTimestamp >= existingStartTimestamp && newEndTimestamp <= existingEndTimestamp;
            const case3 = newStartTimestamp <= existingStartTimestamp && newEndTimestamp >= existingEndTimestamp;

            if (case1 || case2 || case3) {
                return {
                    hasOverlap: true,
                    message: `این بازه زمانی با سابقه بیمه ${record.dehyari_title} تداخل دارد`
                };
            }
        }

        // اگر رکورد قبلی وجود دارد، تاریخ جدید باید بعد از آخرین تاریخ پایان باشد
        if (sortedRecords.length > 0) {
            const lastRecord = sortedRecords[sortedRecords.length - 1];
            const lastEndTimestamp = convertPersianDateToTimestamp(lastRecord.end_date);

            if (newStartTimestamp < lastEndTimestamp) {
                return {
                    hasOverlap: true,
                    message: 'تاریخ شروع باید بعد از تاریخ پایان آخرین سابقه بیمه باشد'
                };
            }
        }

        return { hasOverlap: false };
    };

    const handleSubmit = async (formData) => {
        formData.human_resource_nid = new URLSearchParams(window.location.search).get('param');
        setLoading(true);

        try {
            const isValid = await methods.trigger();
            if (!isValid) {
                setLoading(false);
                return;
            }

            // بررسی تداخل تاریخ‌ها
            const { hasOverlap, message } = checkDateOverlap(formData.start_date, formData.end_date);
            if (hasOverlap) {
                toast.error(message);
                setLoading(false);
                return;
            }

            if (mode === 'create') {
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
                    toast.error(error.response.data.errors[key][0]);
                });
            } else {
                toast.error('خطا در ثبت اطلاعات');
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

                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}
                            sx={{ marginTop: 3 }}>
                            {loading ? 'در حال ارسال...' : 'ثبت'}
                        </Button>
                    </form>
                </FormProvider>
            </Box>
        </Modal>
    );
};

export default InsuranceModal;
