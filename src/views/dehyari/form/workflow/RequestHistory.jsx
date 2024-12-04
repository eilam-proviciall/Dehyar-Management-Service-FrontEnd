import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import UserInfoItem from '../edit/Tables/UserInfoItem';
import { convertUnixToJalali } from "@/utils/dateConverter";
import api from '@/utils/axiosInstance';
import { getHistoryWorkflow } from '@/Services/Salary';
import { translateContractState } from '@/utils/contractStateTranslator';
import roles from "@data/roles.json";

const RequestHistory = ({ details }) => {
    const [historyData, setHistoryData] = useState([
        // {
        //     id: 1,
        //     status: 'ثبت درخواست',
        //     date: '1402/10/01',
        //     time: '10:30',
        //     user: 'علی محمدی',
        //     position: 'کارشناس امور اداری',
        //     description: 'درخواست حقوق ثبت شد'
        // },
        // {
        //     id: 2,
        //     status: 'تایید کارشناس',
        //     date: '1402/10/02',
        //     time: '14:15',
        //     user: 'رضا احمدی',
        //     position: 'مدیر امور اداری',
        //     description: 'درخواست توسط کارشناس بررسی و تایید شد'
        // },
        // {
        //     id: 3,
        //     status: 'تایید نهایی',
        //     date: '1402/10/03',
        //     time: '09:45',
        //     user: 'محمد حسینی',
        //     position: 'معاون اداری',
        //     description: 'درخواست تایید نهایی شد'
        // }
    ]);

    useEffect(() => {
        if (details) {
            const fetchData = async () => {
                try {
                    const response = await api.get(getHistoryWorkflow(details.salary_id), { requiresAuth: true });
                    console.log("Response => ", response);
                    setHistoryData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [details]);

    return (
        <Box className={'flex flex-col gap-3'}>
            {/* اطلاعات کارمند */}
            <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                    اطلاعات کارمند
                </Typography>
                <UserInfoItem icon="ri-user-line" label="نام و نام خانوادگی" value={details ? `${details.first_name} ${details.last_name}` : "نامشخص"} />
                <UserInfoItem icon="ri-government-line" label="پست سازمانی" value={details ? details.job_type : 'نامشخص'} />
                <UserInfoItem icon="ri-community-line" label="دهیاری" value={details ? details.village.approved_name : "نامشخص"} />
            </Box>

            {/* تاریخچه درخواست */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    تاریخچه درخواست
                </Typography>
                <Timeline>
                    {historyData.map((item) => (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color={`${item.state === 'approved' && 'success' || item.state === 'rejected' && 'error' || 'primary'}`} />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Box mb={2}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1">
                                            {item.full_name} - {roles[item.work_group]}
                                        </Typography>
                                        {/* <Typography variant="caption" color="text.secondary">
                                            {item.date} - {item.time}
                                        </Typography> */}
                                    </Box>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {translateContractState(item.state)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </Box>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Box>
        </Box>
    );
};

export default RequestHistory;