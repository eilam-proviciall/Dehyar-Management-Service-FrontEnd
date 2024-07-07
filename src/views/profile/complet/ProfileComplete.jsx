"use client"
// src/pages/ProfileComplete.js
import React, { useState } from 'react';
import { FormProvider, useFormContext } from '@contexts/ProfileComplete/FormContext';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import { Card, CardContent, Divider, Typography, Button } from '@mui/material';
import StepperWrapper from '@core/styles/stepper';
import StepperCustomDot from '@components/stepper-dot';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';

const steps = [
    { title: 'اطلاعات شخصی', subtitle: 'Enter your personal details' },
    { title: 'تغییر رمز عبور', subtitle: 'Setup your new password' }
];

const Stepper = styled(MuiStepper)(({ theme }) => ({
    justifyContent: 'center',
    '& .MuiStep-root': {
        '&:first-of-type': { paddingInlineStart: 0 },
        '&:last-of-type': { paddingInlineEnd: 0 },
        [theme.breakpoints.down('md')]: { paddingInline: 0 }
    }
}));

const ContentWrapper = styled('div')(({ theme }) => ({
    // maxWidth: '600px',
    // margin: '0 auto',
    position:"relative",
}));

const ProfileComplete = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { formData } = useFormContext();

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {
        // Here you can send formData to the API
        console.log('Form2 Data:', formData);
    };

    const renderStepContent = step => {
        switch (step) {
            case 0:
                return <PersonalForm onNext={handleNext} />;
            case 1:
                return <PasswordForm onBack={handleBack} onNext={handleSubmit} />;
            default:
                return <Typography color='text.primary'>Unknown stepIndex</Typography>;
        }
    };

    return (
            <Card>
                <CardContent>
                    <StepperWrapper>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepLabel StepIconComponent={StepperCustomDot}>
                                        <div className='step-label'>
                                            <Typography className='step-number'>{`0${index + 1}`}</Typography>
                                            <div>
                                                <Typography className='step-title'>{label.title}</Typography>
                                            </div>
                                        </div>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </StepperWrapper>
                </CardContent>
                <Divider />
                <CardContent>
                    <ContentWrapper>
                        {activeStep === steps.length ? (
                            <>
                                <Typography className='mlb-2 mli-1' color='text.primary'>
                                    همه مراحل تکمیل شده‌اند!
                                </Typography>
                                <div className='flex justify-end mt-4'>
                                    <Button variant='contained' onClick={handleReset}>
                                        بازنشانی
                                    </Button>
                                </div>
                            </>
                        ) : (
                            renderStepContent(activeStep)
                        )}
                    </ContentWrapper>
                </CardContent>
            </Card>
    );
};

export default ProfileComplete;
