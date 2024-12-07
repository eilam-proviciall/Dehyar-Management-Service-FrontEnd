import React from 'react';
import Box from "@mui/material/Box";
import UserInfoItem from '../edit/Tables/UserInfoItem';
import TextField from "@mui/material/TextField";
import { convertUnixToJalali } from "@/utils/dateConverter";

const ReviewDecree = ({ details, rejectApprovalLevel, description, error, handleDescriptionChange, renderRejectOptions }) => {
    return (
        <Box className={'flex flex-col gap-3'}>
            <UserInfoItem icon="ri-government-line" label="پست سازمانی" value={details ? details.job_type : 'نامشخص'} />
            <UserInfoItem icon="ri-community-line" label="دهیاری" value={details ? details.village.approved_name : "نامشخص"} />
            <UserInfoItem icon="ri-file-line" label="نوع قرارداد" value={details ? `${details.contract_type} روز کارکرد` : 'نامشخص'} />
            <UserInfoItem icon="ri-calendar-line" label="تاریخ شروع قرارداد" value={details ? convertUnixToJalali(details.contract_end) : 'نامشخص'} />
            <UserInfoItem icon="ri-calendar-line" label="تاریخ اجرای قرارداد" value={details ? convertUnixToJalali(details.contract_end) : 'نامشخص'} />
            <UserInfoItem icon="ri-wallet-2-line" label="مبلغ حکم کارگزینی" value="-" />

            {rejectApprovalLevel > 0 && (
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="توضیحات"
                    placeholder="لطفا دلیل رد درخواست را وارد کنید"
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    error={!!error}
                    helperText={error || 'در صورت رد درخواست، وارد کردن توضیحات الزامی است'}
                    required
                    sx={{ mt: 2, direction: 'rtl' }}
                />
            )}
            {renderRejectOptions()}
        </Box>
    );
};

export default ReviewDecree;