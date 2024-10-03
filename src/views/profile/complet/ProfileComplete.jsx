import React, { useState } from 'react';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import ProfilePictureForm from './ProfilePictureForm';
import StepperWrapper from '@core/styles/stepper';
import StepperCustomDot from '@components/stepper-dot';
import MuiStepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useAuth } from '@/contexts/AuthContext';
import { user } from "@/Services/Auth/AuthService";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Step, StepLabel } from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import api from '@/utils/axiosInstance';

const steps = [
    // { title: 'اطلاعات شخصی', subtitle: 'Enter your personal details' },
    // { title: 'عکس پروفایل', subtitle: 'Upload your profile picture' },
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
    position: "relative",
}));

const ProfileComplete = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { formData } = useFormContext();
    const { user: authUser, logout } = useAuth();

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = async () => {
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                toast.error('No token found');
                return;
            }
            await api.put(`${user()}/${authUser.id}`, formData, {
                requiresAuth: true
            });

            toast.success("بروزرسانی اطلاعات با موفقیت انجام شد", {
                position: "top-center"
            });
            logout();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else if (error.response && error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: "top-center"
                });
            } else {
                toast.error("خطای ناشناخته", {
                    position: "top-center"
                });
            }
        }
    };

    const renderStepContent = step => {
        switch (step) {
            // case 0:
            //     return <PersonalForm onNext={handleNext} />;
            // case 1:
            //     return <ProfilePictureForm onNext={handleNext} onBack={handleBack} />;
            case 0:
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
