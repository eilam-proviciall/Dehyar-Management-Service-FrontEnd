// MUI Imports
"use client";
import Grid from '@mui/material/Grid'

// Component Imports
import { useState } from "react";
import ProvincialExpertCards from "@views/dehyari/provincial-expert/list/ProvincialExpertCards";

const ProvincialExpertList = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ProvincialExpertCards
                    loading={loading}
                    setLoading={setLoading}
                />
            </Grid>
            <Grid item xs={12}>
                {/*<UserListTable*/}
                {/*    tableData={userData}*/}
                {/*    dispatch={dispatch}*/}
                {/*    handleAddEventSidebarToggle={handleAddEventSidebarToggle}*/}
                {/*    addEventSidebarOpen={addEventSidebarOpen}*/}
                {/*    setSidebarDetails={setSidebarDetails}*/}
                {/*    loading={loading}*/}
                {/*    setLoading={setLoading}*/}
                {/*/>*/}
                {/*<CreateMunicipalityUserSidebar*/}
                {/*    dispatch={dispatch}*/}
                {/*    calendarApi={calendarApi}*/}
                {/*    calendarStore={calendarStore}*/}
                {/*    addEventSidebarOpen={addEventSidebarOpen}*/}
                {/*    handleAddEventSidebarToggle={handleAddEventSidebarToggle}*/}
                {/*    sidebarDetails={sidebarDetails}*/}
                {/*    setSidebarDetails={setSidebarDetails}*/}
                {/*    setLoading={setLoading}*/}
                {/*/>*/}
            </Grid>
        </Grid>
    )
}

export default ProvincialExpertList;
