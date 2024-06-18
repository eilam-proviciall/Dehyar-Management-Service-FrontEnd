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
    Typography,
    FormHelperText
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

//Data
import jobTitles from '@data/jobTitles.json';

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
    contractType: '',
    employmentStatus: '',
    contractStart: '',
    contractEnd: '',
    descriptionContract: '',
    titleContract: ''
}

const StepperForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const { cities, isLoading, error } = useFetchCities()
    const [formData, setFormData] = useState(defaultFormData)

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

    const { control, handleSubmit, setValue, formState: { errors }, trigger } = useForm({
        resolver: valibotResolver(activeStep === 0 ? userSchemaStep1 : userSchemaStep2),
        defaultValues: formData
    });

    const handleReset = () => {
        setActiveStep(0)
        setFormData(defaultFormData)
    }

    const handleNext = async () => {
        // const isStepValid = await handleSubmit(onSubmit)();
        // if (isStepValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        setValue(name, value);
        trigger(name); // Trigger validation on change
    };

    const handleSubmitForm = () => {
        // Send formData to API
        fetch('/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                toast.success('Form submitted successfully!');
                handleReset();
            })
            .catch(error => {
                toast.error('Form submission failed!');
            });
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <form key={0} onSubmit={handleSubmit(handleNext)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.jobTitle}>
                                    <InputLabel>پست سازمانی</InputLabel>
                                    <Controller
                                        name="jobTitle"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="پست سازمانی"
                                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                                value={formData.jobTitle}
                                            >
                                                {Object.entries(jobTitles).map(([value, label]) => (
                                                    <MenuItem key={value} value={value}>{label}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    {errors.jobTitle && <FormHelperText>{errors.jobTitle.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="nationalCode"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            type="text"
                                            label="کدملی"
                                            placeholder="کد ملی"
                                            error={!!errors.nationalCode}
                                            helperText={errors.nationalCode ? errors.nationalCode.message : ''}
                                            onChange={(e) => handleInputChange('nationalCode', e.target.value)}
                                            value={formData.nationalCode}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.coveredVillages}>
                                    <InputLabel>دهیاری های تحت پوشش</InputLabel>
                                    <Controller
                                        name="coveredVillages"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="دهیاری های تحت پوشش"
                                                onChange={(e) => handleInputChange('coveredVillages', e.target.value)}
                                                value={formData.coveredVillages}
                                            >
                                                <MenuItem value="1">چم جنگل</MenuItem>
                                                <MenuItem value="2">چم شیر</MenuItem>
                                                <MenuItem value="3">سرکان</MenuItem>
                                                <MenuItem value="4">سیاه سیاه</MenuItem>
                                                <MenuItem value="5">15 خرداد</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.coveredVillages && <FormHelperText>{errors.coveredVillages.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className='flex justify-between'>
                                <Button
                                    variant='outlined'
                                    disabled
                                    color='secondary'
                                    startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
                                >
                                    مرحله قبل
                                </Button>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    endIcon={<DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />}
                                >
                                    مرحله بعد
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 1:
                return (
                    <form key={1} onSubmit={handleSubmit(handleNext)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="نام و نام خانوادگی"
                                            placeholder="نام و نام خانوادگی"
                                            error={!!errors.fullName}
                                            helperText={errors.fullName ? errors.fullName.message : ''}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            value={formData.fullName}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="fatherName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="نام پدر"
                                            placeholder="نام پدر"
                                            error={!!errors.fatherName}
                                            helperText={errors.fatherName ? errors.fatherName.message : ''}
                                            onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                            value={formData.fatherName}
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
                                    onChange={(date) => handleInputChange('birthDate', date.unix())}
                                    value={formData.birthDate}
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ تولد"
                                            name="birthDate"
                                            placeholder="تاریخ تولد"
                                            error={!!errors.birthDate}
                                            helperText={errors.birthDate ? errors.birthDate.message : ''}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="personalId"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="شماره شناسنامه"
                                            placeholder="شماره شناسنامه"
                                            error={!!errors.personalId}
                                            helperText={errors.personalId ? errors.personalId.message : ''}
                                            onChange={(e) => handleInputChange('personalId', e.target.value)}
                                            value={formData.personalId}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.gender}>
                                    <InputLabel>جنسیت</InputLabel>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="جنسیت"
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                value={formData.gender}
                                            >
                                                <MenuItem value="1">مرد</MenuItem>
                                                <MenuItem value="0">زن</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.maritalStatus}>
                                    <InputLabel>وضعیت تاهل</InputLabel>
                                    <Controller
                                        name="maritalStatus"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="وضعیت تاهل"
                                                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                                                value={formData.maritalStatus}
                                            >
                                                <MenuItem value="0">مجرد</MenuItem>
                                                <MenuItem value="1">متاهل</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.maritalStatus && <FormHelperText>{errors.maritalStatus.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="birthPlace"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="محل تولد"
                                            placeholder="محل تولد"
                                            error={!!errors.birthPlace}
                                            helperText={errors.birthPlace ? errors.birthPlace.message : ''}
                                            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                            value={formData.birthPlace}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="issuancePlace"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="محل صدور شناسنامه"
                                            placeholder="محل صدور"
                                            error={!!errors.issuancePlace}
                                            helperText={errors.issuancePlace ? errors.issuancePlace.message : ''}
                                            onChange={(e) => handleInputChange('issuancePlace', e.target.value)}
                                            value={formData.issuancePlace}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.veteranStatus}>
                                    <InputLabel>وضعیت ایثارگری</InputLabel>
                                    <Controller
                                        name="veteranStatus"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="وضعیت ایثارگری"
                                                onChange={(e) => handleInputChange('veteranStatus', e.target.value)}
                                                value={formData.veteranStatus}
                                            >
                                                <MenuItem value="1">شهید</MenuItem>
                                                <MenuItem value="2">جانباز</MenuItem>
                                                <MenuItem value="3">رزمنده</MenuItem>
                                                <MenuItem value="4">آزاده</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.veteranStatus && <FormHelperText>{errors.veteranStatus.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small" error={!!errors.militaryService}>
                                    <InputLabel>نظام وظیفه</InputLabel>
                                    <Controller
                                        name="militaryService"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="نظام وظیفه"
                                                onChange={(e) => handleInputChange('militaryService', e.target.value)}
                                                value={formData.militaryService}
                                            >
                                                <MenuItem value="0">معاف</MenuItem>
                                                <MenuItem value="1">انجام شده</MenuItem>
                                                <MenuItem value="2">در حال انجام</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.militaryService && <FormHelperText>{errors.militaryService.message}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className='flex justify-between'>
                                <Button
                                    variant='outlined'
                                    onClick={handleBack}
                                    color='secondary'
                                    startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
                                >
                                    مرحله قبل
                                </Button>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    endIcon={<DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />}
                                >
                                    مرحله بعد
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 2:
                return (
                    <EducationStep
                        formData={formData}
                        handleEducationChange={(value, name) => handleInputChange(name, value)}
                        setFormData={setFormData}
                    />
                );
            case 3:
                return (
                    <InsuranceStep
                        formData={formData}
                        handleInsuranceChange={(value, name) => handleInputChange(name, value)}
                        setFormData={setFormData}
                        cities={cities}
                    />
                );
            case 4:
                return (
                    <ChildrenStep
                        formData={formData}
                        handleChildChange={(value, name) => handleInputChange(name, value)}
                        setFormData={setFormData}
                    />
                );
            case 5:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>نوع قرارداد قرارداد</InputLabel>
                                <Select
                                    label="نوع قرارداد قرارداد"
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={(e) => handleInputChange('contractType', e.target.value)}
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
                                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                                >
                                    <MenuItem value="1">آزمون</MenuItem>
                                    <MenuItem value="2">بدون آزمون</MenuItem>
                                    <MenuItem value="3">دهیاری</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ width: '120%' }}>
                                <DatePicker
                                    scrollSensitive={true}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    onChange={(date) => handleInputChange('contractStart', date.unix())}
                                    value={formData.contractStart}
                                    render={
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="شروع قرارداد"
                                            name="contractStart"
                                            placeholder="شروع قرارداد"
                                        />
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                style={{width:"100%"}}
                                scrollSensitive={true}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={(date) => handleInputChange('contractEnd', date.unix())}
                                value={formData.contractEnd}
                                render={
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="پایان قرارداد"
                                        name="contractEnd"
                                        placeholder="پایان قرارداد"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                style={{width:"100%"}}
                                scrollSensitive={true}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                onChange={(date) => handleInputChange('executionDate', date.unix())}
                                value={formData.executionDate}
                                render={
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="تاریخ اجرا"
                                        name="executionDate"
                                        placeholder="تاریخ اجرا"
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
                                name="descriptionContract"
                                value={formData.descriptionContract}
                                onChange={(e) => handleInputChange('descriptionContract', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="عنوان قرارداد"
                                placeholder="عنوان قرارداد"
                                name="titleContract"
                                value={formData.titleContract}
                                onChange={(e) => handleInputChange('titleContract', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} className='flex justify-between'>
                            <Button
                                variant='outlined'
                                onClick={handleBack}
                                color='secondary'
                                startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
                            >
                                مرحله قبل
                            </Button>
                            <Button variant='contained' type='submit' endIcon={<i className='ri-check-line' />}>
                                تایید نهایی
                            </Button>
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
                                <Button variant="contained" onClick={handleSubmitForm} color="primary">
                                    Submit
                                </Button>
                            </div>
                        </>
                    ) : (
                        renderStepContent(activeStep)
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default StepperForm
