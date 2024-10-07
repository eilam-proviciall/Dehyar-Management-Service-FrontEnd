import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const GradingTable = ({ handleOpenModal, users, setUsers, setData, setMode, methods }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddGrading = () => {
        setMode('add');
        handleOpenModal()
    }

    const handleEditGrading = (row) => {
        setMode('edit');
        // methods.setValue(row.original.nid);
        Object.entries(row.original).forEach(([key, value]) => {
            methods.setValue(key, value);
        });
        console.log("Methods =>", methods);
        setData(row.original);
        handleOpenModal()
    }

    const handleDeleteGrading = (row) => {
        const newData = users.filter((user) => {
            return user.id !== row.original.id
        });
        setUsers(newData);
        setAnchorEl(null);
    }

    const tableData = useMemo(() => users, [users]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'شناسه',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'hierarchical_code',
                header: 'کد سلسله مراتبی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'village_code',
                header: 'کد روستا',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({ row }) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
                        <MenuItem onClick={() => {
                            handleEditGrading(selectedRow)
                        }}>
                            ویرایش اطلاعات
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleDeleteGrading(selectedRow);
                        }}>
                            حذف
                        </MenuItem>
                    </Menu>
                </div>
            },
        ],
        [anchorEl, selectedRow]
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
                    startIcon={<i className='ri-add-line' />}
                    onClick={handleAddGrading}
                >
                    افزودن درجه بندی
                </Button>
            </Box>
        ),
        initialState: {
            density: 'compact',
            pagination: {
                pageIndex: page,
                pageSize: perPage,
            }
        },  // تنظیم تراکم به صورت پیش‌فرض روی compact
        muiSkeletonProps: {
            animation: 'wave', // تنظیم انیمیشن Skeletons
            height: 28, // ارتفاع Skeletons
        },
        muiLinearProgressProps: {
            color: 'primary', // رنگ Progress Bars
        },
        muiCircularProgressProps: {
            color: 'secondary', // رنگ Circular Progress (در صورت استفاده)
        },
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            showRowsPerPage: true,
            variant: 'outlined',
            sx: {
                button: {
                    borderRadius: '50%', // تبدیل دکمه‌ها به دایره‌ای
                },
            },
        },
        paginationDisplayMode: 'pages',
        muiTableBodyRowProps: () => ({
            style: { height: '10px' } // تنظیم ارتفاع هر سطر با استفاده از استایل‌های inline
        }),
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default GradingTable