import React from 'react';
import { Grid, Typography, TextField, InputAdornment } from '@mui/material';
import Logo from "@core/svg/Logo";

const InvoiceDetails = ({ invoiceData, jobTitleLabel, contractTypeLabel }) => {
    const executionDate = "1403/04/04"; // نمونه تاریخ اجرا

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className='p-6 bg-actionHover rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <Grid item xs={6}>
                            <div className='flex justify-start items-center'>
                                <Logo />
                                <Typography sx={{ marginLeft: "20px", justifyContent: "center", textAlign: "center" }} variant='h6'>
                                    قرارداد مدت معین و حکم حقوقی - {jobTitleLabel} - {contractTypeLabel}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-4'>
                                    <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>تاریخ اجرا</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        value={invoiceData[0].id}
                                        InputProps={{
                                            disabled: true,
                                            startAdornment: <InputAdornment position='start'>{executionDate}</InputAdornment>
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default InvoiceDetails;
