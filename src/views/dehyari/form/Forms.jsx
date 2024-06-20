'use client'

import {FormProvider, useForm} from 'react-hook-form'
import {Button, Card, CardContent, Grid} from '@mui/material'
import StepJobDetails from './StepJobDetails'
import StepPersonalDetails from './StepPersonalDetails'
import StepEducation from './StepEducation'
import StepInsurance from './StepInsurance'
import StepChildren from './StepChildren'
import StepContract from './StepContract'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SaveIcon from '@mui/icons-material/Save'
import validationSchemas from './validationSchemas'
import axios from "axios";
import {humanResources} from "@/Services/humanResources";

const Forms = ({invoiceData}) => {
    const methods = useForm({
        defaultValues: {
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
            educations: [{degree: '', fieldOfStudy: '', graduationDate: ''}],
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
        }
    })

    const onSubmit = data => {
        data = methods.getValues()
        const formattedData = {
            job_type_id: data.jobTitle,
            nid: data.nationalCode,
            covered_villages: 13141011117,
            full_name: data.fullName,
            father_name: data.fatherName,
            personal_id: data.personalId,
            gender: data.gender,
            married_status: data.maritalStatus,
            birth_place: 1311,
            issue_place: 1311,
            eisargari_status: data.veteranStatus,
            nezam_vazife: data.militaryService,
            contract_type: data.contractType,
            employment_status: data.employmentStatus,
            contract_start: 345345345,
            contract_end: 345345,
            execute_start: 345435, // Assuming execute_start is the same as contractStart
            description_contract: data.descriptionContract,
            title_contract: data.titleContract,
            // educations: data.educations,
            // insurances: data.insurances,
            children: data.children.map(child => ({
                nid: child.nationalCode,
                full_name: child.fullName,
                birth_date: 345345345,
                death_date: 345345345,
                gender: child.gender,
                married_date: 345345345,
                end_academic_deferment: 345345345
            }))
        };

        console.log("formattedData")
        axios.post(humanResources(),
            formattedData
            , {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            }).then((res) => console.log(res))
    }

    return (
        <>
            <Grid container spacing={6}>
                <FormProvider {...methods}>
                    <Grid item xs={12} md={9}>
                        <Card>
                            <CardContent className='sm:!p-12'>
                                <Grid container spacing={6}>
                                    <StepJobDetails invoiceData={invoiceData}
                                                    validation={validationSchemas.jobDetails}/>
                                    <StepPersonalDetails validation={validationSchemas.personalDetails}/>
                                    <StepEducation validation={validationSchemas.education}/>
                                    <StepInsurance validation={validationSchemas.insurance}/>
                                    <StepChildren validation={validationSchemas.children}/>
                                    <StepContract validation={validationSchemas.contract}/>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent className='flex flex-col gap-4'>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon/>}
                                            onClick={methods.handleSubmit(onSubmit)}
                                            style={{
                                                backgroundColor: '#1976d2', // رنگ آبی جذاب
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                                padding: '10px 20px',
                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                                marginTop: '20px',
                                            }}
                                        >
                                            ذخیره
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            startIcon={<PictureAsPdfIcon/>}
                                        >
                                            حکم کارگزینی
                                        </Button>
                                        <Button
                                            fullWidth
                                            color='secondary'
                                            variant='outlined'
                                            className='capitalize'
                                        >
                                            اطلاعات پرسنلی
                                        </Button>
                                        <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                                            پروفایل
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
        </>
    )
}

export default Forms
