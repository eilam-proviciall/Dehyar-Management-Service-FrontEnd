"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import axios from "axios";
import { GetHumanResourcesForCfo } from '@/Services/humanResources';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import contractType from "@data/contractType.json";

function HistoryTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                header: 'نوع قرار داد',
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
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link href={`/dehyari/form?mode=edit&id=${row.original.id}`}>
                                    ویرایش
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                ),
            },
        ],
        [anchorEl, selectedRow]
    );

    const table = useMaterialReactTable({
        columns,
        data,
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
        <MaterialReactTable
            table={table}
        />
    );
}

export default HistoryTable;
