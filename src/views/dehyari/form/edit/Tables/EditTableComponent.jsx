"use client"
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import InsuranceTable from "@views/dehyari/form/edit/Tables/InsuranceTable";
import HistoryTable from "@views/dehyari/form/edit/Tables/HistoryTable";

function EditTableComponent(props) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="سوابق بیمه" />
                <Tab label="سوابق" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
                {tabIndex === 0 && <InsuranceTable />}
                {tabIndex === 1 && <HistoryTable />}
            </Box>
        </Box>
    );
}

export default EditTableComponent;