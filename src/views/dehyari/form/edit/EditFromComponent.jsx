"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Card } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import EditButtonGroup from './EditButtonGroup';
import EditFormContent from './EditFormContent';
import EditProfilePictureUpload from "@views/dehyari/form/edit/EditProfilePictureUpload";
import validationSchemas from "@views/dehyari/form/validationSchemas";
import EditTableComponent from "@views/dehyari/form/edit/Tables/EditTableComponent";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { humanResources } from "@/Services/humanResources";
import EditHumanResourceFormDTO from "@utils/EditHumanResourceFormDTO";
import {toast} from "react-toastify";
import { useRouter } from 'next/navigation';

function EditFromComponent() {
    const [defaultValue, setDefaultValue] = useState(null); // حالت اولیه خالی
    const [loading, setLoading] = useState(true); // حالت بارگذاری
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('param');
    const router = useRouter();

    const methods = useForm({
        defaultValues: defaultValue || {}, // در ابتدا خالی
    });

    useEffect(() => {
        if (defaultValue) {
            methods.reset(defaultValue);
            setLoading(false);
        }
    }, [defaultValue, methods]);

    useEffect(() => {
        const token = window.localStorage.getItem('token'); // دریافت توکن

        if (!token) {
            // اگر توکن موجود نبود، به صفحه لاگین هدایت کن
            router.push('/login');
            return;
        }

        if (param) {
            axios.get(`${humanResources()}/findByIdOrNid/${param}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // ارسال توکن در هدر
                }
            })
                .then((response) => {
                    const dto = new EditHumanResourceFormDTO(response.data);
                    setDefaultValue(dto); // مقداردهی defaultValue
                    methods.reset(dto); // ریست کردن فرم با داده‌ها
                    setLoading(false); // پایان بارگذاری
                })
                .catch((error) => {
                    console.error('Error fetching human resource data:', error);
                    if (error.response && error.response.status === 401) {
                        // اگر توکن نامعتبر بود، کاربر را به صفحه لاگین هدایت کن
                        router.push('/login');
                    }
                    setLoading(false); // در صورت خطا هم بارگذاری پایان یابد
                });
        } else {
            setLoading(false); // در صورت نبود پارامتر، بارگذاری متوقف شود
        }
    }, [param, router, methods]);

    const [showTable, setShowTable] = useState(false); // حالت بین فرم و جدول

    const onSubmit = async (formData) => {
        const apiData = EditHumanResourceFormDTO.fromForm(formData);
        try {
            const response = await axios.put(`${humanResources()}/update/${formData.id}`, apiData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`, // ارسال توکن
                }
            });
            toast.success('اطلاعات با موفقیت ذخیره شد');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    toast.error(error.response.data.errors[key][0], { position: 'top-center' });
                });
            } else {
                toast.error('خطا در ذخیره اطلاعات', { position: 'top-center' });
            }
            console.error('Error updating human resource:', error);
        }
    };

    const handleSwitch = () => {
        setShowTable(!showTable); // تغییر بین فرم و جدول
    };

    // نمایش اسپینر بارگذاری در صورت عدم بارگذاری کامل داده‌ها
    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <Grid container spacing={6}>
            <FormProvider {...methods}>
                <Grid item xs={12} md={9}>
                    <Card>
                        <AnimatePresence mode="wait">
                            {showTable ? (
                                <motion.div
                                    key="table"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <EditTableComponent />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <EditFormContent validationSchemas={validationSchemas} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <EditProfilePictureUpload defaultProfilePicture={defaultValue?.profilePicture} />
                        </Grid>
                        <Grid item xs={12}>
                            <EditButtonGroup
                                onSubmit={methods.handleSubmit(onSubmit)}
                                onSwitch={handleSwitch}
                                showTable={showTable}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
        </Grid>
    );
}

export default EditFromComponent;
