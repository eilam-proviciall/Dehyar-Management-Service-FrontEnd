import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Box,
    IconButton,
    Stack,
    Divider
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import api from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import { getHistoryWorkflow } from '@/Services/Salary';

function HistoryWorkflowPopup({ open, onClose, salaryId, employeeInfo }) {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (salaryId && open) {
            fetchHistory(salaryId);
        }
    }, [salaryId, open]);

    const fetchHistory = async (salaryId) => {
        setLoading(true);
        try {
            const response = await api.get(getHistoryWorkflow(salaryId), { requiresAuth: true });
            console.log("Response => ", response);
            
            const mockData = [
                {
                    id: 1,
                    status: 'ثبت درخواست',
                    date: '1402/10/01',
                    time: '10:30',
                    user: 'علی محمدی',
                    position: 'کارشناس امور اداری',
                    description: 'درخواست حقوق ثبت شد'
                },
                {
                    id: 2,
                    status: 'تایید کارشناس',
                    date: '1402/10/02',
                    time: '14:15',
                    user: 'رضا احمدی',
                    position: 'مدیر امور اداری',
                    description: 'درخواست توسط کارشناس بررسی و تایید شد'
                },
                {
                    id: 3,
                    status: 'تایید نهایی',
                    date: '1402/10/03',
                    time: '09:45',
                    user: 'محمد حسینی',
                    position: 'معاون اداری',
                    description: 'درخواست تایید نهایی شد'
                }
            ];

            setHistoryData(mockData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching workflow history:', error);
            setLoading(false);
            toast.error('خطا در بارگذاری تاریخچه');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { minHeight: '60vh' }
            }}
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">تاریخچه گردش کار</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent className='flex justify-between items-center'>
                {loading ? (
                    <Typography variant="body1">در حال بارگذاری...</Typography>
                ) : (
                    <>
                        <Box mb={3}>
                            <Typography variant="h6" gutterBottom>
                                اطلاعات کارمند
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                نام و نام خانوادگی: {employeeInfo?.fullName || 'نامشخص'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                سمت: {employeeInfo?.position || 'نامشخص'}
                            </Typography>
                        </Box>
                        <Timeline>
                            {historyData.map((item) => (
                                <TimelineItem key={item.id}>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Box mb={2}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle1">
                                                    {item.status}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.date} - {item.time}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {item.user} - {item.position}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default HistoryWorkflowPopup;