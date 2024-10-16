'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { selectedEvent } from "@/redux-store/slices/calendar";
import Chip from "@mui/material/Chip";
import { user } from "@/Services/Auth/AuthService";
import roles from "@data/roles.json"
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import api from '@/utils/axiosInstance';
import StateCell from './cells/StateCell';
import CityCell from './cells/CityCell';
import RegionCell from './cells/RegionCell';


const UserListTable = ({ dispatch, handleAddEventSidebarToggle, addEventSidebarOpen, setSidebarDetails, loading, setLoading }) => {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const open = Boolean(anchorEl);

    const fetchUsers = async () => {
        setLoading(true);
        await api.get(`${user()}?page${page + 1}&per_page${perPage}`, { requiresAuth: true })
            .then((response) => {
                setUsers(response.data.data)
                console.log(response.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        loading ? fetchUsers() : null;
    }, [loading]);

    // Handlers
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUserLogin = (row) => {
        toast.warning("این قابلیت به زودی افزوده میشود!",
            {
                position: "top-center",
                duration: 3000
            }
        );
    }

    const handleEditUser = (row) => {
        console.log("User : ", row);
        setSidebarDetails({ status: 'edit', defaultValues: row.original });
        setAnchorEl(null);
        handleAddEventSidebarToggle();
    }

    const handleChangePassword = (row) => {
        console.log(row);
        toast.warning("این قابلیت به زودی افزوده میشود!",
            {
                position: "top-center",
                duration: 3000
            }
        );
    }

    const handleDeleteUser = (row) => {
        api.delete(`${user()}/${row.original.id}`, { requiresAuth: true })
            .then(() => {
                toast.success("کاربر با موفقیت حذف شد", {
                    position: "top-center"
                });
                setLoading(true);
            }).catch((error) => error)
        // toast.warning("این قابلیت به زودی افزوده میشود!",
        //     {
        //         position: "top-center",
        //         duration: 3000
        //     }
        // );
    }

    const handleSidebarToggleSidebar = () => {
        dispatch(selectedEvent(null));
        setSidebarDetails({ status: 'add', defaultValues: {} })
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
                return 'primary';
            case 'بخشدار':
                return 'success';
            case 'ناظر فنی':
                return 'warning';
            default:
                return 'default';
        }
    };

    const tableData = useMemo(() => users, [users]); // فقط زمانی که users تغییر کند

    const columns = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({ row }) => {
                    const { first_name, last_name } = row.original;
                    return <div style={{ textAlign: 'right' }}>{`${first_name} ${last_name}`}</div>;
                },
            },
            {
                accessorKey: 'nid',
                header: 'کدملی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'geo_state',
                header: 'استان',
                size: 150,
                Cell: ({ cell }) => <div></div>
            },
            {
                accessorKey: 'geo_city',
                header: 'شهرستان',
                size: 150,
                Cell: ({ cell }) => <div></div>
            },
            {
                accessorKey: 'geo_region',
                header: 'بخش',
                size: 150,
                Cell: ({ cell }) => <div></div>
            },
            {
                accessorKey: 'work_group',
                header: 'نقش',
                size: 150,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <Chip sx={{ height: 27.5 }} label={roles[role]} color={getChipColor(roles[role])} />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'covered_villages',
                header: 'تعداد دهیاری‌ها',
                size: 150,
                Cell: ({ cell, row }) => {
                    const dehyaries = cell.getValue();
                    const rowId = row.id;
                    return (
                        <div style={{ textAlign: 'right' }}>
                            {dehyaries.length === 0 ? '-' : `${dehyaries.length} روستا`}
                        </div>
                    );
                }
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
                            handleUserLogin(selectedRow)
                        }}>
                            ورود به پنل کاربر
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleEditUser(selectedRow)
                        }}>
                            ویرایش اطلاعات
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleChangePassword(selectedRow)
                        }}>
                            تغییر رمز
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleDeleteUser(selectedRow);
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
        initialState: {
            density: 'compact',
            pagination: {
                pageIndex: page,
                pageSize: perPage,
            }
        },  // تنظیم تراکم به صورت پیش‌فرض روی compact
        rowCount: users.length,
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
        muiTableBodyCellProps: {
            className: 'bg-backgroundPaper',
            sx: {
                padding: '0px 8px',
                lineHeight: '1',
            },
        }
    });

    return (
        <MaterialReactTable table={table} />
    );
}

export default UserListTable;
