"use client"
import React, {useState} from 'react';
import {OrgChartComponent} from "@views/dehyari/chart/OrgChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TotalVisits from "@views/pages/widget-examples/statistics/TotalVisits";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import StatusBar from "@views/dehyari/chart/StatusBar";
import useMediaQuery from "@mui/material/useMediaQuery";

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
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
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
            "name": "خانم رهنما",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
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
            "name": "آقای دهقانی",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
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
            "name": "برنامه نویس جدید",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
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
            "name": "برنامه نویس جدید",
            "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
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

    function onNodeClick(nodeId) {
        // console.log('d3', d3.event);
        alert('clicked ' + nodeId);
    }

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
                                sm: "110vh",
                                md: '90vh',
                                lg: '50vh',
                                xl:"60vh"
                            }
                        }} >
                            <CardContent>
                                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px',color: 'black' }}>
                                    ساختار تشکیلاتی دهیاری
                                </Typography>
                                <div >
                                    <OrgChartComponent
                                        setClick={(click) => (addNodeChildFunc = click)}
                                        onNodeClick={onNodeClick}
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
        </div>
    );
}

export default Chart;