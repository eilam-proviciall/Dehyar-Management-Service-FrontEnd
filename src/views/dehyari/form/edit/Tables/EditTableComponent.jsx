"use client";
import React, { useState, useEffect } from 'react';
import { Box, Badge, Tab, Tabs, CircularProgress } from '@mui/material';
import InsuranceTable from "@views/dehyari/form/edit/Tables/InsuranceTable";
import HistoryTable from "@views/dehyari/form/edit/Tables/HistoryTable";
import axios from 'axios'; // برای لود کردن داده‌ها
import {GetHumanResourcesForCfo, HumanContract, InsuranceHistory} from '@/Services/humanResources';
import { styled } from '@mui/material/styles';

// استایل برای Badge برای قرارگیری بهتر
// استایل برای Badge برای قرارگیری بهتر
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -35, // تنظیم دقیق‌تر مکان افقی
        top: 1, // مکان بالای Badge تنظیم شد تا روی متن قرار نگیرد
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


function EditTableComponent(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [insuranceData, setInsuranceData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('param');
    useEffect(() => {
        // Load both data sets in parallel
        const fetchInsuranceData = axios.get(`${InsuranceHistory()}/${param}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
            params: { type: 'insurance' }, // فرض کنید نوع داده برای بیمه مشخص شده
        });
        const fetchHistoryData = axios.get(`${HumanContract()}/${param}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
            params: { type: 'history' }, // فرض کنید نوع داده برای تاریخچه مشخص شده
        });

        // Fetch data for both tables
        Promise.all([fetchInsuranceData, fetchHistoryData])
            .then(([insuranceRes, historyRes]) => {
                setInsuranceData(insuranceRes.data);
                setHistoryData(historyRes.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        centered
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '& .MuiTab-root': {
                                minWidth: '150px', // عرض هر تب را به صورت حداقل مشخص کنید
                                fontWeight: 'bold', // ضخیم‌تر کردن فونت
                            },
                            '& .MuiTabs-indicator': {
                                height: '4px', // ضخامت خط زیرین
                                borderRadius: '4px', // گوشه‌های گرد برای خط زیرین
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '19px',padding:"8px" }}>
                                    <span>سوابق قرارداد</span>
                                    <Badge color="primary" badgeContent={historyData.length} showZero />
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '19px',padding :"8px" }}>
                                    <span>سوابق بیمه</span>
                                    <Badge color="primary" badgeContent={insuranceData.length} showZero />
                                </Box>
                            }
                        />


                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <HistoryTable data={historyData} />} {/* Pass data to tables */}
                        {tabIndex === 1 && <InsuranceTable data={insuranceData} />} {/* Pass data to tables */}
                    </Box>
                </>
            )}
        </Box>
    );
}

export default EditTableComponent;
