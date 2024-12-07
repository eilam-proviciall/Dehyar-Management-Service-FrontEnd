import React from 'react';
import Box from "@mui/material/Box";
import UserInfoItem from '../edit/Tables/UserInfoItem';
import TextField from "@mui/material/TextField";
import { convertUnixToJalali } from "@/utils/dateConverter";
import { DownloadHumanResourcePdf } from "@/Services/humanResources";
import HumanResourceDTO from "@/utils/humanResourceDTO";
import MyDocument from "@components/MyDocument";
import { pdf } from "@react-pdf/renderer";
import { toast } from 'react-toastify';
import api from "@/utils/axiosInstance";
import Chip from "@mui/material/Chip";
import ArticleIcon from '@mui/icons-material/Article';

const ReviewDecree = ({ details, rejectApprovalLevel, description, error, handleDescriptionChange, renderRejectOptions }) => {
    const handleDownloadPdf = async () => {
        try {
            const response = await api.get(`${DownloadHumanResourcePdf()}?human_resource_id=${details.human_resource_id}&human_contract_id=${details.human_contract_id}`, { requiresAuth: true });
            const humanResourceData = response.data;
            const data = new HumanResourceDTO(humanResourceData);
            const doc = <MyDocument data={data} />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            toast.success('محاسبه موفق بود');
        } catch (error) {
            toast.error('خطا در نمایش حکم کارگزینی');
            return error;
        }
    };

    return (
        <Box className={'flex flex-col gap-3'}>
            <UserInfoItem icon="ri-government-line" label="پست سازمانی" value={details ? details.job_type : 'نامشخص'} />
            <UserInfoItem icon="ri-community-line" label="دهیاری" value={details ? details.village.approved_name : "نامشخص"} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <UserInfoItem
                    icon="ri-file-line"
                    label="نوع قرارداد"
                    value={details ? `${details.contract_type} روز کارکرد` : 'نامشخص'}
                />
                {details && (
                    <Chip
                        icon={<ArticleIcon />}
                        label="حکم کارگزینی"
                        color="primary"
                        onClick={handleDownloadPdf}
                        sx={{ cursor: 'pointer' }}
                    />
                )}
            </Box>
            <UserInfoItem icon="ri-calendar-line" label="تاریخ شروع قرارداد" value={details ? convertUnixToJalali(details.contract_start) : 'نامشخص'} />
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