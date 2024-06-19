'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import { initialFormData } from './AddCustomerDrawer'
import Logo from '@components/layout/shared/Logo'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { FormControl } from "@mui/material"
import jobTitles from "@data/jobTitles.json"
import EducationStep from "@views/dehyari/chart/list/EducationStep";
import InsuranceStep from "@views/dehyari/chart/list/InsuranceStep";
import ChildrenStep from "@views/dehyari/chart/list/ChildrenStep";
import {useFetchCities} from "@/hooks/useFetchCities";

// Custom Components


const Forms = ({ invoiceData }) => {
    // States
    const [formData, setFormData] = useState({
        jobTitle: '',
        nationalCode: '',
        coveredVillages: '',
        fullName: '',
        fatherName: '',
        personalId: '',
        gender: '',
        maritalStatus: '',
        birthPlace: '',
        issuancePlace: '',
        veteranStatus: '',
        militaryService: '',
        educations: [{
            degree: '',
            fieldOfStudy: '',
            graduationDate: ''
        }],
        insurances: [{
            workplace: '',
            insurancePeriod: '',
            insuranceType: '',
            employmentStartDate: '',
            employmentEndDate: ''
        }],
        children: [{
            nationalCode: '',
            fullName: '',
            gender: '',
            birthDate: '',
            marriageDate: '',
            endOfStudyExemption: '',
            deathDate: ''
        }],
        contractType: '',
        employmentStatus: '',
        contractStart: '',
        contractEnd: '',
        descriptionContract: '',
        titleContract: ''
    });

    // Hooks
    const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const { cities, isLoading, error } = useFetchCities()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEducationChange = (index, value, field) => {
        const updatedEducations = formData.educations.map((education, i) =>
            i === index ? { ...education, [field]: value } : education
        );
        setFormData({ ...formData, educations: updatedEducations });
    };

    const handleInsuranceChange = (index, value, field) => {
        const updatedInsurances = formData.insurances.map((insurance, i) =>
            i === index ? { ...insurance, [field]: value } : insurance
        );
        setFormData({ ...formData, insurances: updatedInsurances });
    };

    const handleChildChange = (index, value, field) => {
        const updatedChildren = formData.children.map((child, i) =>
            i === index ? { ...child, [field]: value } : child
        );
        setFormData({ ...formData, children: updatedChildren });
    };

    return (
        <>
            <Card>
                <CardContent className='sm:!p-12'>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className='p-6 bg-actionHover rounded-xl'>
                                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex items-center'>
                                            <Logo component />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[95px]'>
                                                شماره قرارداد:
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                value={invoiceData[0].id}
                                                InputProps={{
                                                    disabled: true,
                                                    startAdornment: <InputAdornment position='start'>#</InputAdornment>
                                                }}
                                            />
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[95px]' color='text.primary'>
                                                یه شماره دیگه:
                                            </Typography>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        {/* مرحله 1 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>پست سازمانی</InputLabel>
                                    <Select
                                        label="پست سازمانی"
                                        value={formData.jobTitle}
                                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                    >
                                        {Object.entries(jobTitles).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>پست سازمانی</InputLabel>
                                    <Select
                                        label="پست سازمانی"
                                        value={formData.coveredVillages}
                                        onChange={(e) => handleInputChange('coveredVillages', e.target.value)}
                                    >
                                        <MenuItem value="1">چم جنگل</MenuItem>
                                        <MenuItem value="2">چم شیر</MenuItem>
                                        <MenuItem value="3">سرکان</MenuItem>
                                        <MenuItem value="4">سیاه سیاه</MenuItem>
                                        <MenuItem value="5">15 خرداد</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="نام و نام خانوادگی"
                                    placeholder="نام و نام خانوادگی"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="نام پدر"
                                    placeholder="نام پدر"
                                    value={formData.fatherName}
                                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    label="کدملی"
                                    placeholder="کد ملی"
                                    value={formData.nationalCode}
                                    onChange={(e) => handleInputChange('nationalCode', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="شماره شناسنامه"
                                    placeholder="شماره شناسنامه"
                                    value={formData.personalId}
                                    onChange={(e) => handleInputChange('personalId', e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        {/* مرحله 2 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="محل تولد"
                                    placeholder="محل تولد"
                                    value={formData.birthPlace}
                                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="محل صدور شناسنامه"
                                    placeholder="محل صدور"
                                    value={formData.issuancePlace}
                                    onChange={(e) => handleInputChange('issuancePlace', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>جنسیت</InputLabel>
                                    <Select
                                        label="جنسیت"
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                    >
                                        <MenuItem value="1">مرد</MenuItem>
                                        <MenuItem value="0">زن</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>وضعیت تاهل</InputLabel>
                                    <Select
                                        label="وضعیت تاهل"
                                        value={formData.maritalStatus}
                                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                                    >
                                        <MenuItem value="0">مجرد</MenuItem>
                                        <MenuItem value="1">متاهل</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>وضعیت ایثارگری</InputLabel>
                                    <Select
                                        label="وضعیت ایثارگری"
                                        value={formData.veteranStatus}
                                        onChange={(e) => handleInputChange('veteranStatus', e.target.value)}
                                    >
                                        <MenuItem value="1">شهید</MenuItem>
                                        <MenuItem value="2">جانباز</MenuItem>
                                        <MenuItem value="3">رزمنده</MenuItem>
                                        <MenuItem value="4">آزاده</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>نظام وظیفه</InputLabel>
                                    <Select
                                        label="نظام وظیفه"
                                        value={formData.militaryService}
                                        onChange={(e) => handleInputChange('militaryService', e.target.value)}
                                    >
                                        <MenuItem value="0">معاف</MenuItem>
                                        <MenuItem value="1">انجام شده</MenuItem>
                                        <MenuItem value="2">در حال انجام</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* مرحله 3 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12}>
                                <EducationStep
                                    formData={formData}
                                    handleEducationChange={handleEducationChange}
                                    setFormData={setFormData}
                                />
                            </Grid>
                        </Grid>

                        {/* مرحله 4 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12}>
                                <InsuranceStep
                                    formData={formData}
                                    handleInsuranceChange={handleInsuranceChange}
                                    setFormData={setFormData}
                                    cities={cities}
                                />
                            </Grid>
                        </Grid>

                        {/* مرحله 5 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12}>
                                <ChildrenStep
                                    formData={formData}
                                    handleChildChange={handleChildChange}
                                    setFormData={setFormData}
                                />
                            </Grid>
                        </Grid>

                        {/* مرحله 6 */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="شرح قرارداد"
                                    placeholder="شرح قرارداد"
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
                                    value={formData.titleContract}
                                    onChange={(e) => handleInputChange('titleContract', e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>نوع قرارداد قرارداد</InputLabel>
                                    <Select
                                        label="نوع قرارداد قرارداد"
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
                                        value={formData.employmentStatus}
                                        onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                                    >
                                        <MenuItem value="1">آزمون</MenuItem>
                                        <MenuItem value="2">بدون آزمون</MenuItem>
                                        <MenuItem value="3">دهیاری</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default Forms
