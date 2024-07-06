"use client"
// src/pages/ProfileComplete.js
import React, { useState } from 'react';
import { FormProvider } from '@contexts/ProfileComplete/FormContext';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import { Card, CardContent, Divider, Typography, Button } from '@mui/material';
import StepperWrapper from '@core/styles/stepper';
import StepperCustomDot from '@components/stepper-dot';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styled from '@mui/material/styles/styled';

const steps = [
    { title: 'اطلاعات شخصی', subtitle: 'Enter your personal details' },
    { title: 'تعغیر رمز عبور', subtitle: 'Setup your new password' }
];

const Stepper = styled(MuiStepper)(({ theme }) => ({
    justifyContent: 'center',
    '& .MuiStep-root': {
        '&:first-of-type': { paddingInlineStart: 0 },
        '&:last-of-type': { paddingInlineEnd: 0 },
        [theme.breakpoints.down('md')]: { paddingInline: 0 }
    },
    maxWidth: "600px",
    margin: '0 auto'
}));


const ProfileComplete = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = step => {
        switch (step) {
            case 0:
                return <PersonalForm onNext={handleNext} />;
            case 1:
                return <PasswordForm onBack={handleBack} onNext={handleReset} />;
            default:
                return <Typography color='text.primary'>Unknown stepIndex</Typography>;
        }
    };

    return (
        <FormProvider>
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
                    {activeStep === steps.length ? (
                        <>
                            <Typography className='mlb-2 mli-1' color='text.primary'>
                                {/*All steps are completed!*/}
                            </Typography>
                            <div className='flex justify-end mt-4'>
                                <Button variant='contained' onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </>
                    ) : (
                        renderStepContent(activeStep)
                    )}
                </CardContent>
            </Card>
        </FormProvider>
    );
};

export default ProfileComplete;
