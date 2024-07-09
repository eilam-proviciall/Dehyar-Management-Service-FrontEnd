import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function StatusBar({ onVillageSelect }) {
    const [villages, setVillages] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState('');

    useEffect(() => {
        axios.get(getCfoCoveredVillage(), {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                setVillages(response.data);
                if (response.data.length > 0) {
                    const defaultVillage = response.data[0].id;
                    setSelectedVillage(defaultVillage);
                    onVillageSelect(defaultVillage);
                }
            })
            .catch(error => {
                console.error('Error fetching villages:', error);
            });
    }, []);

    const handleVillageChange = (event) => {
        const villageId = event.target.value;
        setSelectedVillage(villageId);
        onVillageSelect(villageId);
    };

    return (
        <div>
            <Box item xs={12} sm={6} mb={4} lg={3}>
                <Card>
                    <CardContent>
                        <div className='flex items-center justify-between gap-3'>
                            <Typography className='font-medium' color='text.primary'>
                                انتخاب روستا:
                            </Typography>
                            <Select
                                value={selectedVillage}
                                onChange={handleVillageChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select Village' }}
                                sx={{ width: '150px' }}
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
                                <Typography>{4}</Typography>
                            </div>
                            <Chip size='small' variant='tonal' color="primary" label={`1402/03/08`} />
                        </div>
                        <div>
                            <div className='flex items-center justify-between mbe-2'>
                            </div>
                            <LinearProgress
                                color='primary'
                                variant='determinate'
                                value={Math.round(80)}
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
                                <Typography>{4}</Typography>
                            </div>
                            <Chip size='small' variant='tonal' color="primary" label={`11/2`} />
                        </div>
                        <div>
                            <div className='flex items-center justify-between mbe-2'>
                            </div>
                            <LinearProgress
                                color='primary'
                                variant='determinate'
                                value={Math.round(80)}
                                className='bs-2'
                            />
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <Box item xs={12} sm={6} lg={3}>
                <FamillyStatus />
            </Box>
        </div>
    );
}

export default StatusBar;
