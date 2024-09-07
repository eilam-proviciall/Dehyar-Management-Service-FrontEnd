import React, { useState, useEffect } from 'react';
import { Backdrop, Box, Button, Modal, Step, StepLabel, Stepper, Typography, IconButton } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import StepOneFields from './StepOneFields';
import StepTwoFields from './StepTwoFields';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { HumanContract } from "@/Services/humanResources";
import { toast } from "react-toastify";
import HumanContractDTO from "@utils/HumanContractDTO";

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
    contractExecute: {
        required: 'تاریخ اجرا الزامی است',
    },
};

const steps = ['ساختار تشکیلاتی', 'اطلاعات قرارداد'];

const HistoryTableModal = ({ open, handleClose, refreshData, mode, editId }) => {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('param');
    useEffect(() => {
        if (mode === 'edit' && editId) {
            console.log('edit')
            console.log(editId)
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${HumanContract()}/show/${editId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    });
                    console.log(response.data)
                    const mappedData = {
                        contractStart: response.data.contract_start,
                        contractType: response.data.contract_type,
                        contractEnd: response.data.contract_end,
                        contractExecute: response.data.execute_start,
                        appointmentDate: response.data.appointment_date,
                        descriptionContract: response.data.description_contract,
                        titleContract: response.data.title_contract,
                        jobTitle: response.data.job_type_id,
                        currentJob: response.data.main_work,
                    };

                    methods.reset(mappedData);
                } catch (error) {
                    toast.error('خطا در دریافت اطلاعات');
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [editId, mode]);

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

    const handleSubmit = async (formData) => {
        setLoading(true);
        const dto = HumanContractDTO.fromForm(formData, param); // تبدیل داده‌ها به فرمت مناسب
        try {
            let response;
            if (mode === 'edit') {
                // در حالت ویرایش، ارسال درخواست PUT برای به‌روزرسانی داده‌ها
                response = await axios.put(`${HumanContract()}/update/${editId}`, dto, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                toast.success("قرارداد با موفقیت ویرایش شد");
            } else {
                response = await axios.post(HumanContract(), dto, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                toast.success("قرارداد با موفقیت ثبت شد");
            }
            methods.reset();
            handleClose();
            refreshData();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    toast.error(error.response.data.errors[key][0], { position: 'top-center' });
                });
            } else {
                toast.error("خطا در ثبت اطلاعات", { position: 'top-center' });
            }
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            aria-labelledby="stepper-modal-title"
            aria-describedby="stepper-modal-description"
            open={open}
            onClose={null} // غیرفعال کردن بستن مودال با کلیک خارج از آن
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

                <Typography variant="h5" sx={{ justifyContent: "center", textAlign: "center", marginBottom: "20px" }}>
                    {mode === 'edit' ? 'ویرایش قرارداد' : 'ثبت اطلاعات حکم کارگزینی'}
                </Typography>

                <Stepper activeStep={activeStep} sx={{ width: "50%", margin: '0 auto', paddingBottom: '16px' }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)} style={{ marginTop: 8 }}>
                        {activeStep === 0 && <StepOneFields validation={validationSchemas} />}
                        {activeStep === 1 && <StepTwoFields validation={validationSchemas} />}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 7 }}>
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
                                disabled={loading}
                            >
                                {loading ? 'در حال ارسال...' : activeStep === steps.length - 1 ? (mode === 'edit' ? 'ویرایش' : 'اتمام') : 'بعدی'}
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
