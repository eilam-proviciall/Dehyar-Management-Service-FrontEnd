"use client"
import React, { useState } from 'react';
import { OrgChartComponent } from "@views/dehyari/chart/OrgChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import StatusBar from "@views/dehyari/chart/StatusBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import DehyariList from "@views/dehyari/chart/list/DehyariList";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

function Chart(props) {
    const [data, setData] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState('');
    let addNodeChildFunc = null;
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    function addNode() {
        const node = {
            nodeId: 'new Node',
            parentNodeId: 'O-6066',
        };

        addNodeChildFunc(node);
    }

    const handleVillageSelect = (villageId) => {
        setSelectedVillage(villageId.toString());
    };

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy', position: "left" },
        { icon: <SaveIcon />, name: 'Save', position: "right" },
        { icon: <PrintIcon />, name: 'Print', position: "top" },
        { icon: <ShareIcon />, name: 'Share', position: "bottom" },
    ];

    return (
        <div>
            <div>
                <Box display="flex" sx={{ flexDirection: { xs: 'column', md: 'row' } }}
                     justifyContent="center" alignItems="stretch">
                    <Box width={{ xs: '100%', md: '70%' }}>
                        <Card sx={{
                            backgroundColor: '#fff',
                            flexGrow: 1,
                            height: {
                                xs: "90vh",
                                sm: "60vh",
                                md: '62vh',
                                lg: '38vw',
                                xl: "60vh"
                            }
                        }} >
                            <CardContent>
                                <div>
                                    <OrgChartComponent
                                        setClick={(click) => (addNodeChildFunc = click)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={{ xs: '100%', md: '30%' }} pt={{ sm: 5, md: 0 }} ml={{ md: 4 }}>
                        <StatusBar onVillageSelect={handleVillageSelect} />
                    </Box>
                </Box>
            </div>
            <Box mt={5}>
                <DehyariList selectedVillage={selectedVillage} />
            </Box>
        </div>
    );
}

export default Chart;
