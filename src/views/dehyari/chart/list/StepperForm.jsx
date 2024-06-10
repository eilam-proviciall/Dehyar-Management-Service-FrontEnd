// StepperForm.jsx
'use client'

// React Imports
import {useState} from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Third-party Imports
import {toast} from 'react-toastify'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import Repeater from "../../../../@core/components/Repeater";
import Box from "@mui/material/Box";
import {Collapse, Icon} from "@mui/material";
import ChildrenStep from "@views/dehyari/chart/list/ChildrenStep";
import EducationStep from "@views/dehyari/chart/list/EducationStep";
import InsuranceStep from "@views/dehyari/chart/list/InsuranceStep";

// Vars
const steps = [
    {
        title: 'مشخصات کاربری',
    },
    {
        title: 'اطلاعات فرزندان',
    },
    {
        title: 'سوابق تحصیلی',
    },
    {
        title: 'سوابق بیمه ای',
    },
    {
        title: 'اطلاعات قرارداد',
    }
]

const StepperForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        jobTitle: '',
        nationalCode: '',
        coveredVillages: '',
        email: '',
        password: '',
        isPasswordShown: false,
        confirmPassword: '',
        isConfirmPasswordShown: false,
        firstName: '',
        lastName: '',
        country: '',
        language: [],
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        children: [
            {
                nationalCode: '',
                fullName: '',
                gender: '',
                birthDate: '',
                marriageDate: '',
                endOfStudyExemption: '',
                deathDate: ''
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChildChange = (index, e) => {
        const { name, value } = e.target;
        console.log({ name, value })
        const updatedChildren = [...formData.children];
        updatedChildren[index][name] = value;
        setFormData({
            ...formData,
            children: updatedChildren
        });
    };

    const handleClickShowPassword = () =>
        setFormData((prev) => ({ ...prev, isPasswordShown: !prev.isPasswordShown }));

    const handleClickShowConfirmPassword = () =>
        setFormData((prev) => ({ ...prev, isConfirmPasswordShown: !prev.isConfirmPasswordShown }));

    const handleReset = () => {
        setActiveStep(0);
        setFormData({
            jobTitle: '',
            nationalCode: '',
            coveredVillages: '',
            email: '',
            password: '',
            isPasswordShown: false,
            confirmPassword: '',
            isConfirmPasswordShown: false,
            firstName: '',
            lastName: '',
            country: '',
            language: [],
            twitter: '',
            facebook: '',
            instagram: '',
            github: '',
            children: [
                {
                    nationalCode: '',
                    fullName: '',
                    gender: '',
                    birthDate: '',
                    marriageDate: '',
                    endOfStudyExemption: '',
                    deathDate: ''
                }
            ]
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            toast.success('Form Submitted');
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="پست سازمانی"
                                placeholder="کارشناس امور اداری"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                type="text"
                                label="کدملی"
                                placeholder="کد ملی"
                                name="nationalCode"
                                value={formData.nationalCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                type="text"
                                label="دهیاری های تحت پوشش"
                                placeholder="دهیاری های تحت پوشش"
                                name="coveredVillages"
                                value={formData.coveredVillages}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <ChildrenStep
                        formData={formData}
                        handleChildChange={handleChildChange}
                        setFormData={setFormData}
                    />
                );
            case 2:
                return (
                    <>
                        <EducationStep />
                    </>
                );
            case 3:
                return (
                    <>
                        <InsuranceStep />
                    </>
                );
            case 4:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="نام و نام خانوادگی"
                                placeholder="نام و نام خانوادگی"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="نام پدر"
                                placeholder="نام پدر"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="تاریخ تولد"
                                name="birthDate"
                                placeholder="تاریخ تولد"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="شماره شناسنامه"
                                name="idNumber"
                                placeholder="شماره شناسنامه"
                                value={formData.idNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>جنسیت</InputLabel>
                                <Select
                                    label="جنسیت"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="male">مرد</MenuItem>
                                    <MenuItem value="female">زن</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>وضعیت تاهل</InputLabel>
                                <Select
                                    label="وضعیت تاهل"
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="single">مجرد</MenuItem>
                                    <MenuItem value="married">متاهل</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="محل تولد"
                                name="birthPlace"
                                placeholder="محل تولد"
                                value={formData.birthPlace}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="محل صدور شناسنامه"
                                name="issuancePlace"
                                placeholder="محل صدور"
                                value={formData.issuancePlace}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>وضعیت ایثار گری</InputLabel>
                                <Select
                                    multiple
                                    label="وضعیت ایثار گری"
                                    name="veteranStatus"
                                    value={formData.veteranStatus}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="martyr">شهید</MenuItem>
                                    <MenuItem value="injured">جانباز</MenuItem>
                                    <MenuItem value="warrior">رزمنده</MenuItem>
                                    <MenuItem value="free">آزاده</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>نظام وظیفه</InputLabel>
                                <Select
                                    multiple
                                    label="نظام وظیفه"
                                    name="militaryService"
                                    value={formData.militaryService}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="exempted">معاف</MenuItem>
                                    <MenuItem value="completed">انجام شده</MenuItem>
                                    <MenuItem value="ongoing">در حال انجام</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <>
            <StepperWrapper>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        return (
                            <Step key={label.title}>
                                <StepLabel StepIconComponent={StepperCustomDot}>
                                    <div className="step-label">
                                        <div>
                                            <Typography className="step-title">{label.title}</Typography>
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </StepperWrapper>
            <Card className="mt-4">
                <CardContent>
                    {activeStep === steps.length ? (
                        <>
                            <Typography className="mlb-2 mli-1" color="text.primary">
                                All steps are completed!
                            </Typography>
                            <div className="flex justify-end mt-4">
                                <Button variant="contained" onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography className="font-medium" color="text.primary">
                                            {steps[activeStep].title}
                                        </Typography>
                                    </Grid>
                                    {renderStepContent(activeStep)}
                                    <Grid item xs={12} className="flex justify-between">
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            color="secondary"
                                            startIcon={
                                                <DirectionalIcon
                                                    ltrIconClass="ri-arrow-left-line"
                                                    rtlIconClass="ri-arrow-right-line"
                                                />
                                            }
                                        >
                                            مرحله قبل
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            endIcon={
                                                activeStep === steps.length - 1 ? (
                                                    <i className="ri-check-line" />
                                                ) : (
                                                    <DirectionalIcon
                                                        ltrIconClass="ri-arrow-right-line"
                                                        rtlIconClass="ri-arrow-left-line"
                                                    />
                                                )
                                            }
                                        >
                                            {activeStep === steps.length - 1 ? 'تایید نهایی' : 'مرحله بعد'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default StepperForm
