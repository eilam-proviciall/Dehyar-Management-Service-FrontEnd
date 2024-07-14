import React from 'react';
import { Grid, Typography, TextField, InputAdornment } from '@mui/material';
import Logo from "@core/svg/Logo";

const InvoiceDetails = ({ invoiceData, jobTitleLabel, contractTypeLabel }) => {
    const executionDate = getCurrentJalaliDate(); // دریافت تاریخ روز شمسی

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

// تابع‌های تبدیل تاریخ
function gregorianToJalali(gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = (365 * gy) + ((parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400))) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;
    jy += parseInt((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    var jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}

function getCurrentJalaliDate() {
    const gregorianDate = new Date();
    const gy = gregorianDate.getFullYear();
    const gm = gregorianDate.getMonth() + 1; // Months are 0-based in JS
    const gd = gregorianDate.getDate();
    const [jy, jm, jd] = gregorianToJalali(gy, gm, gd);
    return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
}
