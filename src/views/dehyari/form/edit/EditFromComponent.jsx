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

function EditFromComponent() {
    const [defaultValue, setDefaultValue] = useState({});
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('param');

    const methods = useForm({
        defaultValues: defaultValue,
    });

    useEffect(() => {
        if (param) {
            axios.get(`${humanResources()}/findByIdOrNid/${param}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                }
            })
                .then((response) => {
                    const dto = new EditHumanResourceFormDTO(response.data);
                    setDefaultValue(dto);
                    // استفاده از reset برای بروزرسانی مقادیر فرم
                    methods.reset(dto);
                })
                .catch((error) => {
                    console.error('Error fetching human resource data:', error);
                });
        }
    }, [param]);

    const [showTable, setShowTable] = useState(false); // State for switching between form and table

    const onSubmit = data => {
        console.log('Form Data:', data);
    };

    const handleSwitch = () => {
        setShowTable(!showTable); // Toggle between form and table
    };

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
                            <EditProfilePictureUpload />
                        </Grid>
                        <Grid item xs={12}>
                            <EditButtonGroup onSubmit={methods.handleSubmit(onSubmit)} onSwitch={handleSwitch} />
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
        </Grid>
    );
}

export default EditFromComponent;
