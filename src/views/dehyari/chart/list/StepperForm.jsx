// StepperForm.jsx
'use client'

// React Imports
import React, {useState} from 'react'

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
import {toast} from 'react-toastify'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import ChildrenStep from "@views/dehyari/chart/list/ChildrenStep"
import EducationStep from "@views/dehyari/chart/list/EducationStep"
import InsuranceStep from "@views/dehyari/chart/list/InsuranceStep"
import {useFetchCities} from "@/hooks/useFetchCities"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {minLength, object, string} from 'valibot'
import {Controller, useForm} from "react-hook-form"
import {valibotResolver} from "@hookform/resolvers/valibot"

// Vars
const steps = [
    {title: 'مشخصات کاربری'},
    {title: 'مشخصات شخصی'},
    {title: 'سوابق تحصیلی'},
    {title: 'سوابق بیمه ای'},
    {title: 'اطلاعات فرزندان'},
    {title: 'اطلاعات قرارداد'},
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
    birthPlace: null,
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
    educations: [{degree: '', fieldOfStudy: '', graduationDate: ''}],
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
    const [formData, setFormData] = useState(defaultFormData)
    const {cities, isLoading, error} = useFetchCities()

    const handleInputChange = (value, name) => {
        setFormData({...formData, [name]: value})
    }

    const handleArrayChange = (index, value, name, arrayName) => {
        const updatedArray = [...formData[arrayName]]
        updatedArray[index][name] = value
        setFormData({...formData, [arrayName]: updatedArray})
    }

    const handleReset = () => {
        setActiveStep(0)
        setFormData(defaultFormData)
    }


    const handleNext = () => {
        handleSubmit(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (activeStep === steps.length - 1) {
                toast.success('Form Submitted');
            }
        })();
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const userSchema = object({
        nationalCode: string([minLength(1, 'این فیلد الزامی است')]),
    })

    const {control, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: valibotResolver(userSchema),
        defaultValues: defaultFormData
    })

    const renderStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>نوع قرارداد </InputLabel>
                                <Select
                                    label="نوع قرارداد "
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                >
                                    <MenuItem value="1">دهیار</MenuItem>
                                    <MenuItem value="2">کارشناس امور حقوقی و قراردادها - مشترک</MenuItem>
                                    <MenuItem value="3">مسئول امور مالی</MenuItem>
                                    <MenuItem value="4">مسئول فنی عمرانی و خدمات روستا</MenuItem>
                                    <MenuItem value="5">کارگر خدماتی</MenuItem>
                                    <MenuItem value="6">راننده</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="nationalCode"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="text"
                                        label="کدملی"
                                        placeholder="کد ملی"
                                        name="nationalCode"
                                        value={formData.nationalCode}
                                        onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                        error={!!errors.nationalCode}
                                        helperText={errors.nationalCode ? errors.nationalCode.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>دهیاری های تحت پوشش</InputLabel>
                                <Select
                                    label="دهیاری های تحت پوشش"
                                    name="coveredVillages"
                                    value={formData.coveredVillages}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                >
                                    <MenuItem value="1">چم جنگل</MenuItem>
                                    <MenuItem value="2">چم شیر</MenuItem>
                                    <MenuItem value="3">سرکان</MenuItem>
                                    <MenuItem value="4">سیاه سیاه</MenuItem>
                                    <MenuItem value="5">15 خرداد</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                )
            case 1:
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
                                onChange={(event, newValue) => handleInputChange(newValue, "birthPlace")}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        size="small"
                                        label="محل تولد"
                                        name="birthPlace"
                                        placeholder="محل تولد"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={cities}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                value={formData.issuancePlace || null}
                                onChange={(event, newValue) => handleInputChange(newValue, "issuancePlace")}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        size="small"
                                        label="محل صدور شناسنامه"
                                        name="issuancePlace"
                                        placeholder="محل صدور"
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
                )
            case 2:
                return <EducationStep formData={formData} handleEducationChange={handleArrayChange}
                                      setFormData={setFormData}/>
            case 3:
                return <InsuranceStep formData={formData} handleInsuranceChange={handleArrayChange}
                                      setFormData={setFormData} cities={cities}/>
            case 4:
                return <ChildrenStep formData={formData} handleChildChange={handleArrayChange}
                                     setFormData={setFormData}/>
            case 5:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>نوع قرارداد</InputLabel>
                                <Select
                                    label="نوع قرارداد"
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                >
                                    <MenuItem value="1">تمام وقت</MenuItem>
                                    <MenuItem value="2">تمام وقت مشترک</MenuItem>
                                    <MenuItem value="3">پاره وقت - ۱۷روز کارکرد</MenuItem>
                                    <MenuItem value="4">۱۹ روز کارکرد</MenuItem>
                                    <MenuItem value="5">۲۱ روز کارکرد</MenuItem>
                                    <MenuItem value="6">۲۴ روز کارکرد</MenuItem>
                                    <MenuItem value="7">۲۷ روز کارکرد</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>وضعیت استخدام</InputLabel>
                                <Select
                                    label="وضعیت استخدام"
                                    name="employmentStatus"
                                    value={formData.employmentStatus}
                                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                                >
                                    <MenuItem value="1">آزمون</MenuItem>
                                    <MenuItem value="2">بدون آزمون</MenuItem>
                                    <MenuItem value="3">دهیاری</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{width: '120%'}}>
                                <DatePicker
                                    scrollSensitive={true}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    onChange={(e) => handleInputChange(e.unix, "contractStart")}
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="شروع قرارداد"
                                            name="contractStart"
                                            placeholder="شروع قرارداد"
                                            value={formData.contractStart}
                                        />
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                style={{width: "100%"}}
                                scrollSensitive={true}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={(e) => handleInputChange(e.unix, "contractEnd")}
                                render={
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="پایان قرارداد"
                                        name="contractEnd"
                                        placeholder="پایان قرارداد"
                                        value={formData.contractEnd}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="شرح قرارداد"
                                placeholder="شرح قرارداد"
                                name="contractDescription"
                                value={formData.contractDescription}
                                onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="عنوان قرارداد"
                                placeholder="عنوان قرارداد"
                                name="contractTitle"
                                value={formData.contractTitle}
                                onChange={(e) => handleInputChange(e.target.value, e.target.name)}
                            />
                        </Grid>
                    </>
                )
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
                                            onClick={handleNext}
                                            endIcon={
                                                activeStep === steps.length - 1 ? (
                                                    <i className="ri-check-line"/>
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
