// MUI Imports
"use client";
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateMunicipalityUserSidebar from "../create/CreateMunicipalityUserSidebar"
import api from '@/utils/axiosInstance';
const UserList = ({ userData }) => {
    const [calendarApi, setCalendarApi] = useState(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
    const calendarStore = useSelector(state => state.calendarReducer)

    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
    const dispatch = useDispatch()

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserListCards />
            </Grid>
            <Grid item xs={12}>
                <UserListTable
                    tableData={userData}
                    dispatch={dispatch}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
                <CreateMunicipalityUserSidebar
                    dispatch={dispatch}
                    calendarApi={calendarApi}
                    calendarStore={calendarStore}
                    addEventSidebarOpen={addEventSidebarOpen}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />

            </Grid>
        </Grid>
    )
}

export default UserList
