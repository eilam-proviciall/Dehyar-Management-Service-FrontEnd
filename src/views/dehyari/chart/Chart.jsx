"use client"
import React, {useState} from 'react';
import {OrgChartComponent} from "@views/dehyari/chart/OrgChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import StatusBar from "@views/dehyari/chart/StatusBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import DehyariList from "@views/dehyari/chart/list/DehyariList";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

function Chart(props) {
    const [data, setData] = useState([
        {
            "name": "احسان نوریان زاده",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CTO office",
            "tags": "Ceo,tag1,manager,cto",
            "isLoggedUser": "false",
            "positionName": "صاحب محصول",
            "id": "O-6066",
            "parentId": "",
            "size": "",
            "_pagingStep": 2000,
            "_directSubordinatesPaging": 4,
            "_directSubordinates": 4,
            "_totalSubordinates": 1515
        },
        {
            "name": "محمدرسول اصغری",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "توسعه دهنده",
            "id": "O-6067",
            "parentId": "O-6066",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 9,
            "_directSubordinates": 9,
            "_totalSubordinates": 812
        },
        {
            "name": "علی مرادی",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "پشتیبان تیم توسعه",
            "id": "O-6068",
            "parentId": "O-6066",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 3,
            "_directSubordinates": 3,
            "_totalSubordinates": 413
        },
        {
            "name": "زهرا رهنما",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "توسعه دهنده سمت سرور",
            "id": "O-6069",
            "parentId": "O-6067",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 3,
            "_directSubordinates": 3,
            "_totalSubordinates": 142
        },
        {
            "name": "محمد دهقانی",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "توسعه دهنده سمت سرور",
            "id": "O-6069",
            "parentId": "O-6067",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 3,
            "_directSubordinates": 3,
            "_totalSubordinates": 142
        },
        {
            "name": "لقمان اوند",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "CTO ",
            "id": "O-6070",
            "parentId": "O-6068",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 3,
            "_directSubordinates": 3,
            "_totalSubordinates": 144
        },
        {
            "name": "محسن موحد",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
            "area": "Corporate",
            "profileUrl": "http://example.com/employee/profile",
            "office": "CEO office",
            "tags": "Ceo,tag1, tag2",
            "isLoggedUser": "false",
            "positionName": "CTO ",
            "id": "O-6070",
            "parentId": "O-6068",
            "size": "",
            "_pagingStep": 2000,
            "_pagingButton": false,
            "_directSubordinatesPaging": 3,
            "_directSubordinates": 3,
            "_totalSubordinates": 144
        },


    ]);
    let addNodeChildFunc = null;
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    function addNode() {
        const node = {
            nodeId: 'new Node',
            parentNodeId: 'O-6066',
        };

        addNodeChildFunc(node);
    }


    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' , position:"left" },
        { icon: <SaveIcon />, name: 'Save' , position:"right"},
        { icon: <PrintIcon />, name: 'Print' , position:"top"},
        { icon: <ShareIcon />, name: 'Share', position:"bottom" },
    ];
    return (
        <div>
            <div>
                <Box display="flex" sx={{ flexDirection: { xs: 'column', md: 'row' } }}
                     justifyContent="center" alignItems="stretch">
                    <Box width={{xs: '100%', md: '70%'}}>
                        <Card  sx={{
                            backgroundColor: '#fff',
                            flexGrow: 1,
                            height: {
                                xs: "90vh",
                                sm: "60vh",
                                md: '62vh',
                                lg: '38vw',
                                xl:"65vh"
                            }
                        }} >

                            <CardContent>
                                <div>
                                    <Box sx={{ height: 50, transform: 'translateZ(0px)', flexGrow: 1 }}>
                                        <SpeedDial
                                            ariaLabel="SpeedDial openIcon example"
                                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                                            direction="left"

                                        >
                                            {actions.map((action) => (
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={() => changeLayout(action.position)}
                                                />
                                            ))}
                                        </SpeedDial>
                                    </Box>
                                </div>
                                <div >
                                    <OrgChartComponent
                                        setClick={(click) => (addNodeChildFunc = click)}
                                        data={data}
                                    />
                                </div>
                            </CardContent>

                        </Card>

                    </Box>
                    <Box width={{ xs: '100%', md: '30%' }}  pt={{sm:5 ,md: 0}} ml={{md:4}}>
                           <StatusBar />
                    </Box>
                </Box>
            </div>
            <Box mt={5}>
                <DehyariList />
            </Box>
        </div>
    );
}

export default Chart;