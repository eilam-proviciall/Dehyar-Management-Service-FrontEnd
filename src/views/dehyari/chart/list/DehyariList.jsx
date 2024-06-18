import React, { useMemo, useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import Box from "@mui/material/Box";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import DehyariDialog from "@views/dehyari/chart/list/DehyariDialog";
import Chip from "@mui/material/Chip";
import { Divider } from '@mui/material';
import axios from "axios";
import { humanResources } from "@/Services/humanResources";
import jobTitles from '@data/jobTitles.json';

function DehyariList(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(humanResources(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const tableData = useMemo(() => data, [data]);
    const {
        dispatch,
        handleAddEventSidebarToggle
    } = props;
    const buttonProps = {
        variant: 'contained',
        children: 'ثبت اطلاعات پرسنلی'
    };

    const [expandedRows, setExpandedRows] = useState({});

    const handleExpandClick = (rowId) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };

    const getChipColor = (role) => {
        switch (role) {
            case 'ناقض':
                return 'primary';
            case 'پایان کار':
                return 'warning';
            default:
                return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'job_type_id',
                header: 'پست سازمانی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{jobTitles[cell.getValue()]}</div>,
            },
            {
                accessorKey: 'full_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'nid',
                header: 'کدملی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'contractType',
                header: 'نوع قرار داد',
                size: 150,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    const color = getChipColor(role);
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <Chip label={role} color={color} />
                        </div>
                    );
                },
            },
            // {
            //     accessorKey: 'operation',
            //     header: 'عملیات',
            //     size: 150,
            //     Cell: ({ cell }) => {
            //         const role = cell.getValue();
            //         const color = getChipColor(role);
            //         return (
            //             <div style={{ textAlign: 'right' }}>
            //                 <Chip label={role} color={color} />
            //             </div>
            //         );
            //     },
            // },
        ],
        [expandedRows]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableCellActions: true,
        enableClickToCopy: 'context-menu',
        enableEditing: true,
        editDisplayMode: 'cell',
        renderCellActionMenuItems: ({ closeMenu, table, internalMenuItems }) => [
            ...internalMenuItems,
            <Divider key="divider" ma />,
        ],
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={DehyariDialog} />
            </Box>
        ),
    });

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}

export default DehyariList;
