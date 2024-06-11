    // StepperForm.jsx
    'use client'

    // React Imports
    import React, {useState} from 'react'

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
    import ChildrenStep from "@views/dehyari/chart/list/ChildrenStep";
    import EducationStep from "@views/dehyari/chart/list/EducationStep";
    import InsuranceStep from "@views/dehyari/chart/list/InsuranceStep";
    import {useFetchCities} from "@/hooks/useFetchCities";
    import Autocomplete from "@mui/material/Autocomplete";
    import persian from "react-date-object/calendars/persian";
    import persian_fa from "react-date-object/locales/persian_fa";
    import DatePicker from "react-multi-date-picker";

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
            fullName: '',
            fatherName: '',
            personalId:"",
            militaryService: '',
            veteranStatus: '',
            maritalStatus: '',
            birthPlace: null,
            issuancePlace: '',
            country: '',
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
            ],
            educations: [
                {
                    degree: '',
                    fieldOfStudy: '',
                    graduationDate: ''
                }
            ],
            insurances: [
                {
                    workplace: '',
                    insurancePeriod: '',
                    insuranceType: '',
                    employmentDate: ''
                }
            ]
        });

        const handleInputChange = (value,name) => {
            setFormData({
                ...formData,
                [name]: value
            });
            console.log(formData)
        };
        const { cities, isLoading, error } = useFetchCities();
        // console.log(cities)
        const handleChildChange = (index, value,name) => {
            console.log(name, value);

            const updatedChildren = [...formData.children];
            updatedChildren[index][name] = value;
            setFormData({
                ...formData,
                children: updatedChildren
            });
            console.log(formData.children)

        };

        const handleEducationChange = (index, value,name) => {
            const updatedEducations = [...formData.educations];
            updatedEducations[index][name] = value;
            setFormData({
                ...formData,
                educations: updatedEducations
            });
            console.log(formData.educations)
        };

        const handleInsuranceChange = (index, value,name) => {
            const updatedInsurances = [...formData.insurances];
            updatedInsurances[index][name] = value;
            setFormData({
                ...formData,
                insurances: updatedInsurances
            });
            console.log(formData.insurances)
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
                ],
                educations: [
                    {
                        degree: '',
                        fieldOfStudy: '',
                        graduationDate: ''
                    }
                ],
                insurances: [
                    {
                        workplace: '',
                        insurancePeriod: '',
                        insuranceType: '',
                        employmentDate: ''
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
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                        <EducationStep
                            formData={formData}
                            handleEducationChange={handleEducationChange}
                            setFormData={setFormData}
                        />
                    );
                case 3:
                    return (
                        <InsuranceStep
                            formData={formData}
                            handleInsuranceChange={handleInsuranceChange}
                            setFormData={setFormData}
                            cities={cities}
                        />
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
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="نام پدر"
                                    placeholder="نام پدر"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <DatePicker
                                    scrollSensitive={true}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    onChange={(e) => handleInputChange(e.unix, "birthDate")}
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ تولد"
                                            name="birthDate"
                                            placeholder="تاریخ تولد"
                                            value={formData.birthDate}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="شماره شناسنامه"
                                    name="personalId"
                                    placeholder="شماره شناسنامه"
                                    value={formData.personalId}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>جنسیت</InputLabel>
                                    <Select
                                        label="جنسیت"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                    >
                                        <MenuItem value="1">مرد</MenuItem>
                                        <MenuItem value="0">زن</MenuItem>
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
                                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                    >
                                        <MenuItem value="0">مجرد</MenuItem>
                                        <MenuItem value="1">متاهل</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => `${option.approved_name}`}
                                    value={formData.birthPlace || null}
                                    onChange={(event, newValue) => {
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            birthPlace: newValue ? newValue : ''
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            label="محل تولد"
                                            name="birthPlace"
                                            placeholder="محل تولد"
                                            value={formData.birthPlace}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={cities}
                                    getOptionLabel={(option) => `${option.approved_name}`}
                                    value={formData.issuancePlace || null}
                                    onChange={(event, newValue) => {
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            issuancePlace: newValue ? newValue : ''
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            label="محل صدور شناسنامه"
                                            name="issuancePlace"
                                            placeholder="محل صدور"
                                            value={formData.issuancePlace}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>وضعیت ایثار گری</InputLabel>
                                    <Select
                                        label="وضعیت ایثار گری"
                                        name="veteranStatus"
                                        value={formData.veteranStatus}
                                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                    >
                                        <MenuItem value="1">شهید</MenuItem>
                                        <MenuItem value="2">جانباز</MenuItem>
                                        <MenuItem value="3">رزمنده</MenuItem>
                                        <MenuItem value="4">آزاده</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>نظام وظیفه</InputLabel>
                                    <Select
                                        label="نظام وظیفه"
                                        name="militaryService"
                                        value={formData.militaryService}
                                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                    >
                                        <MenuItem value="0">معاف</MenuItem>
                                        <MenuItem value="1">انجام شده</MenuItem>
                                        <MenuItem value="2">در حال انجام</MenuItem>
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

    export default StepperForm;

