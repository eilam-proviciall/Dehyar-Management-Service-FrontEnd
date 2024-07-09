import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";
import JobTitleSelect from './JobTitleSelect';
import CoveredVillagesSelect from './CoveredVillagesSelect';
import InvoiceDetails from './InvoiceDetails';
import validationSchemas from "@views/dehyari/form/validationSchemas";
import contractType from "@data/contractType.json";

const StepJobDetails = ({ invoiceData, validation }) => {
    const { control, setValue, register, watch, formState: { errors } } = useFormContext();
    const selectedJobTitleLabel = watch('jobTitleLabel');
    const selectedContractTypeLabel = watch('contractTypeLabel');

    return (
        <>
            <InvoiceDetails
                invoiceData={invoiceData}
                jobTitleLabel={selectedJobTitleLabel}
                contractTypeLabel={selectedContractTypeLabel}
            />
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='ساختار تشکیلات' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JobTitleSelect control={control} validation={validation} errors={errors} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>نوع قرارداد</InputLabel>
                        <Controller
                            name="contractType"
                            control={control}
                            defaultValue=""
                            rules={validationSchemas.contract.contractType}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="نوع قرارداد"
                                    error={!!errors.contractType}
                                >
                                    {Object.entries(contractType).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.contractType && <Typography color="error">{errors.contractType.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>وضعیت استخدام</InputLabel>
                        <Select
                            {...register('employmentStatus', validation.employmentStatus)}
                            label="وضعیت استخدام"
                            value={watch('employmentStatus')}
                            error={!!errors.employmentStatus}
                        >
                            <MenuItem value="1">آزمون</MenuItem>
                            <MenuItem value="2">بدون آزمون</MenuItem>
                        </Select>
                        {errors.employmentStatus && <Typography color="error">{errors.employmentStatus.message}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <CoveredVillagesSelect
                        control={control}
                        validation={validation}
                        errors={errors}
                        selectedJobTitle={watch('jobTitle')}
                        setValue={setValue}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default StepJobDetails;
