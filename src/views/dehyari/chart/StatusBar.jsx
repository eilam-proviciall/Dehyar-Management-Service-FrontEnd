import React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import TotalVisits from "@views/pages/widget-examples/statistics/TotalVisits";
import FamillyStatus from "@views/dehyari/chart/FamillyStatus";

function StatusBar(props) {
    return (
        <div>
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
                                   باید از خودمون دربیاریم:
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
                <FamillyStatus/>
            </Box>
        </div>
    );
}

export default StatusBar;