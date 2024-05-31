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

// Vars
const steps = [
    {
        title: 'مشخصات کاربری',
        // subtitle: 'Enter your account details'
    },
    {
        title: 'اطلاعات شناسنامه ای',
        subtitle: 'Setup Information'
    },
    {
        title: 'اطلاعات قرارداد',
        subtitle: 'Add Social Links'
    }
]

const StepperForm = () => {
    // States
    const [activeStep, setActiveStep] = useState(0)
    const [childrens, setChildrens] = useState(1)

    const [formData, setFormData] = useState({
        username: '',
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
        github: ''
    })

    const handleClickShowPassword = () => setFormData(show => ({...show, isPasswordShown: !show.isPasswordShown}))

    const handleClickShowConfirmPassword = () =>
        setFormData(show => ({...show, isConfirmPasswordShown: !show.isConfirmPasswordShown}))

    const handleReset = () => {
        setActiveStep(0)
        setFormData({
            username: '',
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
            github: ''
        })
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)

        if (activeStep === steps.length - 1) {
            toast.success('Form Submitted')
        }
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const renderStepContent = activeStep => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='پست سازمانی'
                                placeholder='کارشناس امور اداری'
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type='text'
                                label='کدملی'
                                placeholder='کد ملی'
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type='text'
                                label='دهیاری های تحت پوشش'
                                placeholder='دهیاری های تحت پوشش'
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </Grid>


                    </>
                )
            case 1:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='نام و نام خانوادگی'
                                placeholder='نام و نام خانوادگی'
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='نام پدر'
                                placeholder='نام پدر'
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='تاریخ تولد'
                                placeholder='تاریخ تولد'
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='شماره شناسنامه'
                                placeholder='شماره شناسنامه'
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    label='جنسیت'
                                    value={formData.country}
                                    onChange={e => setFormData({...formData, country: e.target.value})}
                                >
                                    <MenuItem value='UK'>مرد</MenuItem>
                                    <MenuItem value='USA'>زن</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    label='وضعیت تاهل'
                                    value={formData.country}
                                    onChange={e => setFormData({...formData, country: e.target.value})}
                                >
                                    <MenuItem value='UK'>مرد</MenuItem>
                                    <MenuItem value='USA'>زن</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='محل تولد'
                                placeholder='محل تولد'
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='محل صدور شناسنامه'
                                placeholder='محل تولد'
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>وضعیت ایثار گری</InputLabel>
                                <Select
                                    multiple
                                    label='وضعیت ایثار گری'
                                    value={formData.language}
                                    onChange={e => setFormData({...formData, language: e.target.value})}
                                >
                                    <MenuItem value='English'>جانباز</MenuItem>
                                    <MenuItem value='French'>رزمنده</MenuItem>
                                    <MenuItem value='French'>آزاده</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>نظام وظیفه</InputLabel>
                                <Select
                                    multiple
                                    label='نظام وظیفه'
                                    value={formData.language}
                                    onChange={e => setFormData({...formData, language: e.target.value})}
                                >
                                    <MenuItem value='English'>دیپلم</MenuItem>
                                    <MenuItem value='French'>سیکل</MenuItem>
                                    <MenuItem value='French'>کارشناسی ارشد</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card>
                                <CardContent>
                                    <Repeater count={childrens}>
                                        {i => {
                                            const Tag = i === 0 ? Box : Collapse
                                            return (
                                                <Tag key={i}
                                                     className='repeater-wrapper' {...(i !== 0 ? {in: true} : {})}>

                                                    <Grid container>
                                                        <Grid item lg={12} md={5} xs={12}
                                                              sx={{px: 4, my: {lg: 0, xs: 4}}} pt={3}>
                                                            <Typography variant='subtitle2' className='col-title'
                                                                        sx={{
                                                                            mb: {md: 2, xs: 0},
                                                                            color: 'text.primary'
                                                                        }}>
                                                                ثبت وضعیت
                                                            </Typography>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={4}>
                                                                    <Select fullWidth size='small'
                                                                            defaultValue='رمه گردان'>
                                                                        <MenuItem value='رمه گردان'>رمه گردان</MenuItem>
                                                                        <MenuItem value='کوچرو'>کوچرو</MenuItem>
                                                                        <MenuItem value='نیم کوچر'>نیم کوچر</MenuItem>
                                                                    </Select>
                                                                </Grid>

                                                                <Grid item xs={4}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size='small'
                                                                        label='توضیحات'
                                                                        variant='outlined'
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Tag>
                                            )
                                        }}
                                    </Repeater>
                                    <Grid item xs={12} sx={{px: 0}} pt={5}>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            startIcon={<Icon icon='mdi:plus' fontSize="20"/>}
                                            onClick={() => setChildrens(childrens + 1)}
                                        >
                                            افزودن
                                        </Button>
                                    </Grid>

                                </CardContent>
                            </Card>

                        </Grid>
                    </>
                )
            case 2:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='نوع قرار داد'
                                placeholder='نوع قرار داد'
                                value={formData.facebook}
                                onChange={e => setFormData({...formData, facebook: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>وضعیت استخدام</InputLabel>
                                <Select
                                    multiple
                                    label='وضعیت استخدام'
                                    value={formData.language}
                                    onChange={e => setFormData({...formData, language: e.target.value})}
                                >
                                    <MenuItem value='English'>آزمون</MenuItem>
                                    <MenuItem value='French'>بدون ازمون</MenuItem>
                                    <MenuItem value='French'>دهیاری</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='تاریخ شروع قرار داد'
                                placeholder='https://www.instagram.com/johndoe'
                                value={formData.instagram}
                                onChange={e => setFormData({...formData, instagram: e.target.value})}
                            />
                        </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='تاریخ پایان قرار داد'
                            placeholder='https://www.instagram.com/johndoe'
                            value={formData.instagram}
                            onChange={e => setFormData({...formData, instagram: e.target.value})}
                        />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='موضوع قرارداد'
                            placeholder='https://www.instagram.com/johndoe'
                            value={formData.instagram}
                            onChange={e => setFormData({...formData, instagram: e.target.value})}
                        />
                    </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='شرح قرار داد'
                                placeholder='شرح قرار داد'
                                value={formData.github}
                                onChange={e => setFormData({...formData, github: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='تاریخ اجرا'
                                placeholder='تاریخ اجرا'
                                value={formData.github}
                                onChange={e => setFormData({...formData, github: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='تاریخ صدور'
                                placeholder='تاریخ اجرا'
                                value={formData.github}
                                onChange={e => setFormData({...formData, github: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='شماره قرارداد'
                                placeholder='شماره قرارداد'
                                value={formData.github}
                                onChange={e => setFormData({...formData, github: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='شماره حکم'
                                placeholder='تاریخ حکم'
                                value={formData.github}
                                onChange={e => setFormData({...formData, github: e.target.value})}
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
                    {steps.map(label => {
                        return (
                            <Step key={label.title}>
                                <StepLabel StepIconComponent={StepperCustomDot}>
                                    <div className='step-label'>
                                        <div>
                                            <Typography className='step-title'>{label.title}</Typography>
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </StepperWrapper>
            <Card className='mt-4'>
                <CardContent>
                    {activeStep === steps.length ? (
                        <>
                            <Typography className='mlb-2 mli-1' color='text.primary'>
                                All steps are completed!
                            </Typography>
                            <div className='flex justify-end mt-4'>
                                <Button variant='contained' onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <form onSubmit={e => e.preventDefault()}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography className='font-medium' color='text.primary'>
                                            {steps[activeStep].title}
                                        </Typography>
                                        <Typography variant='body2'>{steps[activeStep].subtitle}</Typography>
                                    </Grid>
                                    {renderStepContent(activeStep)}
                                    <Grid item xs={12} className='flex justify-between'>
                                        <Button
                                            variant='outlined'
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            color='secondary'
                                            startIcon={
                                                <DirectionalIcon ltrIconClass='ri-arrow-left-line'
                                                                 rtlIconClass='ri-arrow-right-line'/>
                                            }
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant='contained'
                                            onClick={handleNext}
                                            endIcon={
                                                activeStep === steps.length - 1 ? (
                                                    <i className='ri-check-line'/>
                                                ) : (
                                                    <DirectionalIcon ltrIconClass='ri-arrow-right-line'
                                                                     rtlIconClass='ri-arrow-left-line'/>
                                                )
                                            }
                                        >
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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
