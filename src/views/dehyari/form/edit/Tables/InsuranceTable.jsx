import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsuranceModal from "@views/dehyari/form/edit/Tables/InsuranceModal/InsuranceModal";
import {InsuranceHistory} from "@/Services/humanResources";

function InsuranceTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false); // برای مدیریت مودال
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('param');
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const fetchInsuranceHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${InsuranceHistory()}/${param}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsuranceHistory(); // دریافت داده‌ها هنگام لود شدن کامپوننت
    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: 'start_date',
            header: 'تاریخ شروع',
            size: 150,
            Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
        },
        {
            accessorKey: 'end_date',
            header: 'تاریخ پایان',
            size: 150,
            Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
        },
        {
            accessorKey: 'month',
            header: 'سابقه به ماه',
            size: 150,
            Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
        },
        {
            accessorKey: 'actions',
            header: 'عملیات',
            size: 150,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={(event) => handleClick(event, row)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}>
                            ویرایش
                        </MenuItem>
                    </Menu>
                </div>
            ),
        },
    ], [anchorEl]);

    const table = useMaterialReactTable({
        columns,
        data,
        renderTopToolbarCustomActions: () => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                    افزودن سابقه بیمه
                </Button>
            </Box>
        ),
        state: { isLoading: loading },
    });

    return (
        <>
            <MaterialReactTable table={table} />
            <InsuranceModal open={openModal} handleClose={() => setOpenModal(false)} refreshData={fetchInsuranceHistory} nid={param}/>
        </>
    );
}

export default InsuranceTable;
