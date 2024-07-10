"use client"
// Forms.js
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonGroup from './ButtonGroup';
import FormContent from './FormContent';
import { GetHumanResource, humanResources } from '@/Services/humanResources';
import { dtoToEmployee, salaryToDTO } from '@/utils/SalaryDTO';
import MyDocument from '@components/MyDocument';
import { pdf } from '@react-pdf/renderer';
import { getSalary } from '@/Services/Salary';
import ProfilePictureUpload from "@views/dehyari/form/StepsForm/ProfilePictureUpload";

const Forms = ({ invoiceData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const methods = useForm({
        defaultValues: {
            jobTitle: '',
            coveredVillages: {},
            fullName: '',
            villageEmployer: '',
            fatherName: '',
            nationalCode: '',
            birthDate: '',
            phoneNumbers: {},
            personalId: '',
            gender: '',
            maritalStatus: '',
            birthPlace: '',
            issuancePlace: '',
            veteranStatus: '',
            militaryService: '',
            educations: [{ degree: '', fieldOfStudy: '', graduationDate: '' }],
            insurances: [{ workplace: '', insurancePeriod: '', insuranceType: '', employmentStartDate: '', employmentEndDate: '' }],
            children: [{ nationalCode: '', fullName: '', gender: '', birthDate: '', marriageDate: '', endOfStudyExemption: '', deathDate: '' }],
            contractType: '',
            employmentStatus: '',
            contractStart: '',
            contractEnd: '',
            execute_start: '',
            descriptionContract: '',
            titleContract: '',
            profilePicture: ''
        }
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');

        if (mode === 'edit' && id) {
            setLoading(true);
            axios.get(GetHumanResource(id), {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    methods.reset(dtoToEmployee(response.data));
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [methods]);

    const onSubmit = data => {
        const formattedData = salaryToDTO(data);
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');
        console.log(formattedData)
        //     const request = mode === 'create'
        //     ? axios.post(humanResources(), formattedData, { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } })
        //     : axios.put(`${humanResources()}/human-resources/${id}`, formattedData, { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } });
        //
        // request.then((res) => handleResponse(res.data)).catch(handleError);
    };

    const handleResponse = (data) => {
        const { human_resource, children, educations, insurances } = data;
        if (human_resource) {
            toast.success("Human resource با موفقیت به‌روزرسانی شد", { position: "top-center" });
            window.location.href = '/dehyari';
        } else {
            toast.error("خطا در به‌روزرسانی Human resource", { position: "top-center" });
        }

        children.forEach((status, index) => {
            if (status) {
                toast.success(`Child ${index + 1} با موفقیت به‌روزرسانی شد`, { position: "top-center" });
            } else {
                toast.error(`خطا در به‌روزرسانی Child ${index + 1}`, { position: "top-center" });
            }
        });

        educations.forEach((status, index) => {
            if (status) {
                toast.success(`Education ${index + 1} با موفقیت به‌روزرسانی شد`, { position: "top-center" });
            } else {
                toast.error(`خطا در به‌روزرسانی Education ${index + 1}`, { position: "top-center" });
            }
        });

        insurances.forEach((status, index) => {
            if (status) {
                toast.success(`Insurance ${index + 1} با موفقیت به‌روزرسانی شد`, { position: "top-center" });
            } else {
                toast.error(`خطا در به‌روزرسانی Insurance ${index + 1}`, { position: "top-center" });
            }
        });
    };

    const handleError = (error) => {
        if (error.response && error.response.data.errors) {
            Object.keys(error.response.data.errors).forEach((key) => {
                error.response.data.errors[key].forEach((message) => {
                    toast.error(message);
                });
            });
        } else if (error.response && error.response.data.message) {
            toast.error(error.response.data.message, { position: "top-center" });
        } else {
            toast.error("خطای ناشناخته", { position: "top-center" });
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error.message}</Alert>;

    return (
        <Grid container spacing={6}>
            <FormProvider {...methods}>
                <Grid item xs={12} md={9}>
                    <FormContent invoiceData={invoiceData} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <ProfilePictureUpload />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup onSubmit={methods.handleSubmit(onSubmit)} />
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
        </Grid>
    );
}

export default Forms;
