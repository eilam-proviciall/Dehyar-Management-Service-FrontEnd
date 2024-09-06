import React, {useState} from 'react';
import {Backdrop, Box, Button, Modal, Step, StepLabel, Stepper, Typography} from '@mui/material';
import {FormProvider, useForm} from 'react-hook-form';
import StepOneFields from './StepOneFields';
import StepTwoFields from './StepTwoFields';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%', // تنظیم اندازه مدال برای نمایش مناسب
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};
const validationSchemas = {
    jobTitle: {
        required: 'پست سازمانی الزامی است',
    },
    contractStart: {
        required: 'تاریخ شروع قرارداد الزامی است',
    },
    contractEnd: {
        required: 'تاریخ پایان قرارداد الزامی است',
    },
    currentJob: {
        required: 'شغل فعلی الزامی است',
    },
    titleContract: {
        required: 'عنوان قرارداد الزامی است',
    },
    descriptionContract: {
        required: 'شرح قرارداد الزامی است',
    },
    appointmentDate: {
        required: 'تاریخ انتصاب الزامی است',
    },
    coveredVillages: {
        required: 'انتخاب دهیاری‌های تحت پوشش الزامی است',
    },
};

const steps = ['ساختار تشکیلاتی', 'اطلاعات قرارداد'];

const HistoryTableModal = ({open, handleClose}) => {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();

    const handleNext = async () => {
        const isValid = await methods.trigger();
        if (isValid) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        methods.reset();
    };

    const handleSubmit = async (data) => {
        const isValid = await methods.trigger();
        if (isValid) {
            console.log('Submitted Data:', data);
            handleClose();
        }

    };

    return (
        <Modal
            aria-labelledby="stepper-modal-title"
            aria-describedby="stepper-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
            }}
        >
            <Box sx={modalStyle}>
                <Typography variant="h6">فرم دو مرحله‌ای</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        {activeStep === 0 && <StepOneFields validation={validationSchemas}/>}
                        {activeStep === 1 && <StepTwoFields validation={validationSchemas}/>}

                        <Box sx={{display: 'flex', justifyContent: 'space-between', pt: 2}}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                بازگشت
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? methods.handleSubmit(handleSubmit) : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'اتمام' : 'بعدی'}
                            </Button>
                        </Box>
                    </form>
                </FormProvider>

                {activeStep === steps.length && (
                    <Button onClick={handleReset}>شروع مجدد</Button>
                )}
            </Box>
        </Modal>
    );
};

export default HistoryTableModal;
