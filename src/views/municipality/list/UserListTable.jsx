'use client';
import React, { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { db } from "@/fake-db/apps/user-list";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { selectedEvent } from "@/redux-store/slices/calendar";

const UserListTable = props => {
    const tableData = useMemo(() => db, []); // Memoize table data
    const {
        dispatch,
        handleAddEventSidebarToggle
    } = props;

    const handleSidebarToggleSidebar = () => {
        dispatch(selectedEvent(null));
        handleAddEventSidebarToggle();
    }

    const [expandedRows, setExpandedRows] = useState({});

    const handleExpandClick = (rowId) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'nationalId',
                header: 'کدملی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },

            {
                accessorKey: 'dehyaries',
                header: 'دهیاری‌ها',
                size: 200,
                Cell: ({ cell, row }) => {
                    const dehyaries = cell.getValue();
                    const rowId = row.id;
                    const isExpanded = !!expandedRows[rowId];

                    if (Array.isArray(dehyaries) && dehyaries.length <= 2) {
                        return <div style={{ textAlign: 'right' }}>{dehyaries.join(', ')}</div>;
                    }

                    return (
                        <div style={{ textAlign: 'right' }}>
                            {isExpanded ? dehyaries.join(', ') : `${dehyaries.slice(0, 2).join(', ')}...`}
                            <Button onClick={() => handleExpandClick(rowId)} size="small">
                                {isExpanded ? 'کمتر' : 'بیشتر'}
                            </Button>
                        </div>
                    );
                }
            },
            {
                accessorKey: 'role',
                header: 'نقش',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
        ],
        [expandedRows]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        renderTopToolbarCustomActions: ({ table }) => (
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
                    افزودن کاربر
                </Button>
            </Box>
        ),
    });

    return (
        <MaterialReactTable table={table} />
    );
}

export default UserListTable;
