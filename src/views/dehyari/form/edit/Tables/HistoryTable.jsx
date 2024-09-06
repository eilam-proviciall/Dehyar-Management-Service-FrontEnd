"use client";
import React, { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import { Box, Button, Modal, Backdrop, Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import axios from "axios";
import { GetHumanResourcesForCfo } from '@/Services/humanResources';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import contractType from "@data/contractType.json";
import HistoryTableModal from "@views/dehyari/form/edit/Tables/HistoryModal/HistoryTableModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 40,
    p: 4,
};

function HistoryTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(false); // State برای مدیریت باز و بسته شدن Modal

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = () => setOpen(true); // باز کردن Modal
    const handleCloseModal = () => setOpen(false); // بستن Modal

    useEffect(() => {
        setLoading(true);
        axios.get(GetHumanResourcesForCfo(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
        }).then((response) => {
            setData(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'village',
                header: 'دهیاری',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue().approved_name}</div>,
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
                accessorKey: 'contract_type',
                header: 'نوع قرارداد',
                size: 150,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <Chip label={contractType[role]} color="primary" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <IconButton
                            aria-label="more"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, row)}
                            style={{ paddingLeft: 0 }}
                        >
                            <MoreVertIcon style={{ textAlign: "center", justifyContent: 'center', alignItems: 'center' }} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>
                                <Link href={`/dehyari/form?mode=edit&id=${row.original.id}`}>
                                    ویرایش
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                ),
            },
        ],
        [anchorEl]
    );

    const table = useMaterialReactTable({
        columns,
        data,
        renderTopToolbarCustomActions: () => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    افزودن کاربر
                </Button>
            </Box>
        ),
        initialState: { density: 'compact' },  // تنظیم تراکم به صورت پیش‌فرض روی compact
        state: {
            isLoading: loading, // نشان دادن لودینگ پیش‌فرض
            showProgressBars: loading, // نمایش Progress Bars در هنگام بارگذاری
        },
        muiSkeletonProps: {
            animation: 'wave', // تنظیم انیمیشن Skeletons
            height: 28, // ارتفاع Skeletons
        },
        muiLinearProgressProps: {
            color: 'primary', // رنگ Progress Bars
        },
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: false,
            variant: 'outlined',
            sx: {
                button: {
                    borderRadius: '50%', // تبدیل دکمه‌ها به دایره‌ای
                },
            },
        },
        paginationDisplayMode: 'pages',
    });

    return (
        <div>
            <MaterialReactTable table={table} />

            <HistoryTableModal open={open} handleClose={handleCloseModal} />
        </div>
    );
}

export default HistoryTable;
