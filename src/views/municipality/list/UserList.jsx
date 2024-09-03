// MUI Imports
"use client";
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CreateMunicipalityUserSidebar from "../create/CreateMunicipalityUserSidebar"
const UserList = ({ userData }) => {
    const [calendarApi, setCalendarApi] = useState(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [sidebarDetails, setSidebarDetails] = useState({
        status: 'add', defaultValues: {}
    });
    const [loading, setLoading] = useState(true);
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
    const calendarStore = useSelector(state => state.calendarReducer)

    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
    const dispatch = useDispatch()
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserListCards
                    loading={loading}
                    setLoading={setLoading}
                />
            </Grid>
            <Grid item xs={12}>
                <UserListTable
                    tableData={userData}
                    dispatch={dispatch}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                    addEventSidebarOpen={addEventSidebarOpen}
                    setSidebarDetails={setSidebarDetails}
                    loading={loading}
                    setLoading={setLoading}
                />
                <CreateMunicipalityUserSidebar
                    dispatch={dispatch}
                    calendarApi={calendarApi}
                    calendarStore={calendarStore}
                    addEventSidebarOpen={addEventSidebarOpen}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                    sidebarDetails={sidebarDetails}
                    setSidebarDetails={setSidebarDetails}
                    setLoading={setLoading}
                />
            </Grid>
        </Grid>
    )
}

export default UserList
