'use client';
import React, {useMemo, useState} from 'react';
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {db} from "@/fake-db/apps/user-list";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {selectedEvent} from "@/redux-store/slices/calendar";

const UserListTable = props => {
    const tableData = db
    // Props
    const {
        mdAbove,
        leftSidebarOpen,
        calendarStore,
        calendarsColor,
        calendarApi,
        dispatch,
        handleLeftSidebarToggle,
        handleAddEventSidebarToggle
    } = props
    const handleSidebarToggleSidebar = () => {
        dispatch(selectedEvent(null))
        handleAddEventSidebarToggle()
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName', //access nested data with dot notation
                header: 'First Name',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'country', //normal accessorKey
                header: 'Address',
                size: 200,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'role',
                header: 'role',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,

            },

        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data: tableData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderTopToolbarCustomActions: ({table}) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleSidebarToggleSidebar}
                    startIcon={<i className='ri-add-line' />}
                >
                    Add Event
                </Button>
            </Box>
        ),

    });
    return (
        <>
            <MaterialReactTable table={table}/>
        </>
    );
}

export default UserListTable;