import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import FamillyStatus from "@views/dehyari/chart/FamillyStatus";
import { getCfoCoveredVillage } from "@/Services/DataService";
import api from '@/utils/axiosInstance';

function StatusBar({ onVillageSelect }) {
    const [villages, setVillages] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState('');
    const [villageInfo, setVillageInfo] = useState({ grade: '', gradeDate: '', coverCount: 0, population: {} });

    useEffect(() => {
        api.get(getCfoCoveredVillage(), { requiresAuth: true })
            .then(response => {
                const villageData = response.data;
                setVillages(villageData);
                if (villageData.length > 0) {
                    const defaultVillage = villageData[0].village.hierarchy_code;
                    setSelectedVillage(defaultVillage);
                    setVillageInfo({
                        grade: villageData[0].village.villageInformation?.grade || '',
                        gradeDate: villageData[0].village.villageInformation?.grade_date || '',
                        coverCount: villageData[0].cover_count || 0,
                        population: villageData[0].village.villageInformation?.latest_population || {}
                    });
                    onVillageSelect(defaultVillage);
                }
            })
            .catch(error => error);
    }, []);

    const handleVillageChange = (event) => {
        const villageId = event.target.value;
        setSelectedVillage(villageId);
        const selectedVillageData = villages.find(village => village.village.hierarchy_code === villageId);
        if (selectedVillageData) {
            setVillageInfo({
                grade: selectedVillageData.village.villageInformation?.grade || '',
                gradeDate: selectedVillageData.village.villageInformation?.grade_date || '',
                coverCount: selectedVillageData.cover_count || 0,
                population: selectedVillageData?.latest_population || {}
            });
        }
        onVillageSelect(villageId);
    };

    const getProgressValue = (value, max) => {
        if (!value) return 0;
        return (value / max) * 100;
    };

    return (
        <div>
            <Box item xs={12} sm={6} mb={4} lg={3}>
                <Card>
                    <CardContent>
                        <div className='flex items-center justify-between gap-3'>
                            {/*<Typography className='font-medium' color='text.primary'>*/}
                            {/*    انتخاب روستا:*/}
                            {/*</Typography>*/}
                            <Select
                                value={selectedVillage}
                                label="شبکه اجتماعی"

                                onChange={handleVillageChange}
                                displayEmpty
                                // inputProps={{ 'aria-label': 'Select Village' }}
                                sx={{ width: '350px' }}
                            >
                                <MenuItem value="" disabled>
                                    انتخاب کنید
                                </MenuItem>
                                {villages.map(village => (
                                    <MenuItem key={village.id} value={village.village.hierarchy_code}>
                                        {village.village.approved_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <Box item xs={12} sm={6} mb={4} lg={3}>
                <Card >
                    <CardContent>
                        <div className='flex items-center justify-between gap-3'>
                            <div className='flex gap-1'>
                                <Typography className='font-medium' color='text.primary'>
                                    درجه دهیاری :
                                </Typography>
                                <Typography>{villageInfo.grade || 'نامشخص'}</Typography>
                            </div>
                            {villageInfo.gradeDate && (
                                <Chip size='small' variant='tonal' color="primary" label={villageInfo.gradeDate} />
                            )}
                        </div>
                        <div>
                            <LinearProgress
                                color='primary'
                                variant='determinate'
                                value={getProgressValue(villageInfo.grade, 6)}
                                className='bs-2'
                            />
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <Box item xs={12} sm={6} mb={4} lg={3}>
                <Card>
                    <CardContent>
                        <div className='flex items-center justify-between gap-3'>
                            <div className='flex gap-1'>
                                <Typography className='font-medium' color='text.primary'>
                                    پست سازمانی:
                                </Typography>
                                <Typography>{villageInfo.coverCount}</Typography>
                            </div>
                            {villageInfo.coverCount > 0 && (
                                <Chip size='small' variant='tonal' color="primary" label={villageInfo.coverCount} />
                            )}
                        </div>
                        <div>
                            <LinearProgress
                                color='primary'
                                variant='determinate'
                                value={getProgressValue(villageInfo.coverCount, 11)}
                                className='bs-2'
                            />
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <Box item xs={12} sm={6} lg={3}>
                <FamillyStatus population={villageInfo.population} />
            </Box>
        </div>
    );
}

export default StatusBar;
