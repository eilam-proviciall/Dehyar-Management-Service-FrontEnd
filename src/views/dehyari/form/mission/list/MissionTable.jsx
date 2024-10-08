'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { user } from "@/Services/Auth/AuthService";
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import api from '@/utils/axiosInstance';


const MissionTable = ({ handleToggle, setMode }) => {
    const [mission, setMission] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const open = Boolean(anchorEl);

    const fetchMission = async () => {
        console.log("Refresh");

        // setLoading(true);
        // await api.get(`${user()}?page${page + 1}&per_page${perPage}`, { requiresAuth: true })
        //     .then((response) => {
        //         setMission(response.data.data)
        //         console.log(response.data);
        //         setLoading(false);
        //     })
    }

    useEffect(() => {
        loading ? fetchMission() : null;
    }, [loading]);

    // Handlers
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditTimeOff = (row) => {
        console.log("User : ", row);
        setAnchorEl(null);
        handleAddEventSidebarToggle();
    }

    const handleDeleteTimeOff = (row) => {
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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'type',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({ row }) => {
                    const { first_name, last_name } = row.original;
                    return <div style={{ textAlign: 'right' }}>{`${first_name} ${last_name}`}</div>;
                },
            },
            {
                accessorKey: 'start_date',
                header: 'کدملی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'duration',
                header: 'استان',
                size: 150,
                Cell: ({ cell }) => <div></div>
            },
            {
                accessorKey: 'attachment_file',
                header: 'شهرستان',
                size: 150,
                Cell: ({ cell }) => <div></div>
            },
            {
                accessorKey: 'user_id',
                header: 'بخش',
                size: 150,
                Cell: ({ cell }) => <div></div>
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
                            handleEditTimeOff(selectedRow)
                        }}>
                            ویرایش اطلاعات
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleDeleteTimeOff(selectedRow);
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
        data: mission,
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
                    onClick={handleToggle}
                    startIcon={<i className='ri-add-line' />}
                >
                    افزودن ماموریت
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
        rowCount: mission.length,
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
    });

    return (
        <MaterialReactTable table={table} />
    );
}

export default MissionTable;
