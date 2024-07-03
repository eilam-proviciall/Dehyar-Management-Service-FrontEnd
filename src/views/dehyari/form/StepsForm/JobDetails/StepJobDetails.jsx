import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";
import JobTitleSelect from './JobTitleSelect';
import CoveredVillagesSelect from './CoveredVillagesSelect';
import InvoiceDetails from './InvoiceDetails';

const StepJobDetails = ({ invoiceData, validation }) => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
    const selectedJobTitle = watch('jobTitle');

    return (
        <>
            <InvoiceDetails invoiceData={invoiceData} />
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='ساختار تشکیلات' />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <JobTitleSelect control={control} validation={validation} errors={errors} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CoveredVillagesSelect
                        control={control}
                        validation={validation}
                        errors={errors}
                        selectedJobTitle={selectedJobTitle}
                        setValue={setValue}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name='nationalCode'
                        control={control}
                        defaultValue=""
                        rules={validation.nationalCode}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="کد ملی"
                                placeholder="کد ملی"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                value={field.value || ''}
                                error={!!errors.nationalCode}
                                helperText={errors.nationalCode && errors.nationalCode.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default StepJobDetails;
