"use client";
import React, { useState } from 'react';
import { Grid, Card } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import EditButtonGroup from './EditButtonGroup';
import EditFormContent from './EditFormContent';
import EditHumanResourceFormDTO from "@utils/EditHumanResourceFormDTO";
import EditProfilePictureUpload from "@views/dehyari/form/edit/EditProfilePictureUpload";
import validationSchemas from "@views/dehyari/form/validationSchemas";
import EditTableComponent from "@views/dehyari/form/edit/Tables/EditTableComponent";
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion and AnimatePresence

const sampleData = {
    fullName: 'علی رضایی',
    fatherName: 'محمد رضایی',
    nationalCode: '1234567890',
    birthDate: 628021800, // timestamp
    phoneNumbers: ['09123456789', '09391234567'],
    personalId: '987654321',
    gender: 'male',
    maritalStatus: 'single',
    birthPlace: 'تهران',
    issuancePlace: 'تهران',
    veteranStatus: 'none',
    militaryService: 'done',
    educations: [
        { degree: 'کارشناسی', fieldOfStudy: 'مهندسی کامپیوتر', graduationDate: 1514764800 }
    ],
    insurances: [
        { workplace: 'شرکت XYZ', insurancePeriod: '12', employmentStartDate: 1609459200, employmentEndDate: 1640995200 }
    ],
    profilePicture: ''
};

function EditFromComponent() {
    // تبدیل JSON به یک نمونه از DTO
    const dto = new EditHumanResourceFormDTO(sampleData);
    console.log(dto);
    const methods = useForm({
        defaultValues: dto,
    });

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
                            {/* Animation for switching between form and table */}
                            {showTable ? (
                                <motion.div
                                    key="table"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <EditTableComponent />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
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