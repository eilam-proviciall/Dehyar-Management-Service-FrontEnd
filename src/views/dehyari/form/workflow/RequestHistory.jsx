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
import moment from 'moment-jalaali';

const RequestHistory = ({ details }) => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        if (details) {
            const fetchData = async () => {
                try {
                    const response = await api.get(getHistoryWorkflow(details.salary_id), { requiresAuth: true });
                    // Sort data from newest to oldest
                    const sortedData = response.data.sort((firstDate, lastDate) => moment(lastDate.started_at).valueOf() - moment(firstDate.started_at).valueOf());
                    setHistoryData(sortedData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [details]);

    const formatDate = (date) => {
        const now = moment();
        const itemDate = moment(date);
        const diffDays = now.diff(itemDate, 'days');

        if (diffDays > 7) {
            return moment(date).format('jYYYY/jMM/jDD');
        }
        return moment(date).fromNow();
    };


    return (
        <Box className={'flex flex-col gap-3'}>

            {/* تاریخچه درخواست */}
            <Box>
                <Timeline position='right' sx={{
                    '& .MuiTimelineItem-root': {
                        '&:before': {
                            mr: '-1.5rem',
                            flex: 0
                        }
                    }
                }}>
                    {historyData.map((item) => (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color={`${item.state === 'approved' && 'success' || item.state.startsWith('rejected') && 'error' || 'primary'}`} />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Box mb={2} sx={{ minWidth: '225px' }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'nowrap', gap: 1 }}>
                                        <Typography variant="subtitle2">
                                            {translateContractState(item.state)}
                                        </Typography>
                                        <Typography variant="caption" color="text.inherit" sx={{ whiteSpace: 'nowrap', ml: 1, fontSize: '0.65rem' }}>
                                            {formatDate(item.started_at)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.full_name} - {roles[item.work_group]}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography> */}
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