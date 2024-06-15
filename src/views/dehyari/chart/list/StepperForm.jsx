'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@mui/material'

// Third-party Imports
import { toast } from 'react-toastify'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import ChildrenStep from "@views/dehyari/chart/list/ChildrenStep"
import EducationStep from "@views/dehyari/chart/list/EducationStep"
import InsuranceStep from "@views/dehyari/chart/list/InsuranceStep"
import { useFetchCities } from "@/hooks/useFetchCities"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { minLength, object, string } from 'valibot'
import { Controller, useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"

// Vars
const steps = [
    { title: 'مشخصات کاربری' },
    { title: 'مشخصات شخصی' },
    { title: 'سوابق تحصیلی' },
    { title: 'سوابق بیمه ای' },
    { title: 'اطلاعات فرزندان' },
    { title: 'اطلاعات قرارداد' },
]

const defaultFormData = {
    jobTitle: '',
    nationalCode: '',
    coveredVillages: '',
    fullName: '',
    fatherName: '',
    personalId: "",
    militaryService: '',
    veteranStatus: '',
    maritalStatus: '',
    birthPlace: '',
    issuancePlace: '',
    country: '',
    children: [{
        nationalCode: '',
        fullName: '',
        gender: '',
        birthDate: '',
        marriageDate: '',
        endOfStudyExemption: '',
        deathDate: ''
    }],
    educations: [{ degree: '', fieldOfStudy: '', graduationDate: '' }],
    insurances: [{
        workplace: '',
        insurancePeriod: '',
        insuranceType: '',
        employmentStartDate: '',
        employmentEndtDate: ''
    }],
}

const StepperForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const { cities, isLoading, error } = useFetchCities()

    const userSchemaStep1 = object({
        jobTitle: string([minLength(1, 'این فیلد الزامی است')]),
        nationalCode: string([minLength(1, 'این فیلد الزامی است')]),
        coveredVillages: string([minLength(1, 'این فیلد الزامی است')]),
    });

    const userSchemaStep2 = object({
        fullName: string([minLength(1, 'این فیلد الزامی است')]),
        fatherName: string([minLength(1, 'این فیلد الزامی است')]),
        personalId: string([minLength(1, 'این فیلد الزامی است')]),
        gender: string([minLength(1, 'این فیلد الزامی است')]),
        maritalStatus: string([minLength(1, 'این فیلد الزامی است')]),
        birthPlace: string([minLength(1, 'این فیلد الزامی است')]),
        issuancePlace: string([minLength(1, 'این فیلد الزامی است')]),
        veteranStatus: string([minLength(1, 'این فیلد الزامی است')]),
        militaryService: string([minLength(1, 'این فیلد الزامی است')]),
    });

    const { control: controlStep1, handleSubmit: handleSubmitStep1, formState: { errors: errorsStep1 } } = useForm({
        resolver: valibotResolver(userSchemaStep1),
        defaultValues: defaultFormData
    });

    const { control: controlStep2, handleSubmit: handleSubmitStep2, formState: { errors: errorsStep2 } } = useForm({
        resolver: valibotResolver(userSchemaStep2),
        defaultValues: defaultFormData
    });

    const handleReset = () => {
        setActiveStep(0)
        setFormData(defaultFormData)
    }

    const handleNextStep1 = () => {
        handleSubmitStep1(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })();
    }

    const handleNextStep2 = () => {
        handleSubmitStep2(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })();
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const renderStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>نوع قرارداد </InputLabel>
                                    <Controller
                                        name="jobTitle"
                                        control={controlStep1}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="نوع قرارداد"
                                                error={!!errorsStep1.jobTitle}
                                            >
                                                <MenuItem value="1">دهیار</MenuItem>
                                                <MenuItem value="2">کارشناس امور حقوقی و قراردادها - مشترک</MenuItem>
                                                <MenuItem value="3">مسئول امور مالی</MenuItem>
                                                <MenuItem value="4">مسئول فنی عمرانی و خدمات روستا</MenuItem>
                                                <MenuItem value="5">کارگر خدماتی</MenuItem>
                                                <MenuItem value="6">راننده</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep1.jobTitle && <Typography color="error">{errorsStep1.jobTitle.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="nationalCode"
                                    control={controlStep1}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            type="text"
                                            label="کدملی"
                                            placeholder="کد ملی"
                                            error={!!errorsStep1.nationalCode}
                                            helperText={errorsStep1.nationalCode ? errorsStep1.nationalCode.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>دهیاری های تحت پوشش</InputLabel>
                                    <Controller
                                        name="coveredVillages"
                                        control={controlStep1}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="دهیاری های تحت پوشش"
                                                error={!!errorsStep1.coveredVillages}
                                            >
                                                <MenuItem value="1">چم جنگل</MenuItem>
                                                <MenuItem value="2">چم شیر</MenuItem>
                                                <MenuItem value="3">سرکان</MenuItem>
                                                <MenuItem value="4">سیاه سیاه</MenuItem>
                                                <MenuItem value="5">15 خرداد</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep1.coveredVillages && <Typography color="error">{errorsStep1.coveredVillages.message}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </>
                )
            case 1:
                return (
                    <>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="fullName"
                                    control={controlStep2}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="نام و نام خانوادگی"
                                            placeholder="نام و نام خانوادگی"
                                            error={!!errorsStep2.fullName}
                                            helperText={errorsStep2.fullName ? errorsStep2.fullName.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="fatherName"
                                    control={controlStep2}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="نام پدر"
                                            placeholder="نام پدر"
                                            error={!!errorsStep2.fatherName}
                                            helperText={errorsStep2.fatherName ? errorsStep2.fatherName.message : ''}
                                        />
                                    )}
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
                                            error={!!errorsStep2.birthDate}
                                            helperText={errorsStep2.birthDate ? errorsStep2.birthDate.message : ''}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="personalId"
                                    control={controlStep2}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="شماره شناسنامه"
                                            placeholder="شماره شناسنامه"
                                            error={!!errorsStep2.personalId}
                                            helperText={errorsStep2.personalId ? errorsStep2.personalId.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>جنسیت</InputLabel>
                                    <Controller
                                        name="gender"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="جنسیت"
                                                error={!!errorsStep2.gender}
                                            >
                                                <MenuItem value="1">مرد</MenuItem>
                                                <MenuItem value="0">زن</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep2.gender && <Typography color="error">{errorsStep2.gender.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>وضعیت تاهل</InputLabel>
                                    <Controller
                                        name="maritalStatus"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="وضعیت تاهل"
                                                error={!!errorsStep2.maritalStatus}
                                            >
                                                <MenuItem value="0">مجرد</MenuItem>
                                                <MenuItem value="1">متاهل</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep2.maritalStatus && <Typography color="error">{errorsStep2.maritalStatus.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="birthPlace"
                                    control={controlStep2}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="محل تولد"
                                            placeholder="محل تولد"
                                            error={!!errorsStep2.birthPlace}
                                            helperText={errorsStep2.birthPlace ? errorsStep2.birthPlace.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="issuancePlace"
                                    control={controlStep2}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="محل صدور شناسنامه"
                                            placeholder="محل صدور"
                                            error={!!errorsStep2.issuancePlace}
                                            helperText={errorsStep2.issuancePlace ? errorsStep2.issuancePlace.message : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>وضعیت ایثارگری</InputLabel>
                                    <Controller
                                        name="veteranStatus"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="وضعیت ایثارگری"
                                                error={!!errorsStep2.veteranStatus}
                                            >
                                                <MenuItem value="1">شهید</MenuItem>
                                                <MenuItem value="2">جانباز</MenuItem>
                                                <MenuItem value="3">رزمنده</MenuItem>
                                                <MenuItem value="4">آزاده</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep2.veteranStatus && <Typography color="error">{errorsStep2.veteranStatus.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>نظام وظیفه</InputLabel>
                                    <Controller
                                        name="militaryService"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="نظام وظیفه"
                                                error={!!errorsStep2.militaryService}
                                            >
                                                <MenuItem value="0">معاف</MenuItem>
                                                <MenuItem value="1">انجام شده</MenuItem>
                                                <MenuItem value="2">در حال انجام</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errorsStep2.militaryService && <Typography color="error">{errorsStep2.militaryService.message}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </>
                )
            // سایر مراحل
            default:
                return 'Unknown step'
        }
    }

    return (
        <>
            <StepperWrapper>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label.title}>
                            <StepLabel StepIconComponent={StepperCustomDot}>
                                <div className="step-label">
                                    <Typography className="step-title">{label.title}</Typography>
                                </div>
                            </StepLabel>
                        </Step>
                    ))}
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
                                            onClick={activeStep === 0 ? handleNextStep1 : handleNextStep2}
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
    )
}

export default StepperForm
