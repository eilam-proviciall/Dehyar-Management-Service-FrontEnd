'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {selectedEvent} from "@/redux-store/slices/calendar";
import Chip from "@mui/material/Chip";
import axios from "axios";
import {user} from "@/Services/Auth/AuthService";
import roles from "@data/roles.json"
import {Cell} from "recharts";

const UserListTable = props => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const data = axios.get(`${user()}?order_by=geo_region`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setUsers(response.data.data[0])
        })
    }, []);
    const tableData = useMemo(() => users, [users]); // Memoize table data
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
    const getChipColor = (role) => {
        switch (role) {
            case 'مسئول امور مالی':
                return 'success';
            case 'بخشدار':
                return 'primary';
            case 'ناظر فنی':
                return 'warning';
            default:
                return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({row}) => {
                    const {first_name, last_name} = row.original;
                    return <div style={{textAlign: 'right'}}>{`${first_name} ${last_name}`}</div>;
                },
            },
            {
                accessorKey: 'nid',
                header: 'کدملی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },

            {
                accessorKey: 'covered_villages',
                header: 'دهیاری‌ها',
                size: 100,
                Cell: ({cell, row}) => {
                    const dehyaries = cell.getValue();
                    const rowId = row.id;
                    const isExpanded = !!expandedRows[rowId];

                    return (
                        <div style={{textAlign: 'right'}}>
                            {dehyaries.length === 0 ? '-' : `${dehyaries.length} روستا`}
                        </div>
                    );
                }
            },
            {
                accessorKey: 'work_group',
                header: 'نقش',
                size: 150,
                Cell: ({cell}) => {
                    const role = cell.getValue();
                    return (
                        <div style={{textAlign: 'right'}}>
                            <Chip label={roles[role]} color="primary"/>
                        </div>
                    );
                },
            },
        ],
        [expandedRows]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
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
                    startIcon={<i className='ri-add-line'/>}
                >
                    افزودن کاربر
                </Button>
            </Box>
        ),
        muiTableBodyRowProps: () => ({
            style: {height: '10px'} // تنظیم ارتفاع هر سطر با استفاده از استایل‌های inline
        }),
    });

    return (
        <MaterialReactTable table={table}/>
    );
}

export default UserListTable;
