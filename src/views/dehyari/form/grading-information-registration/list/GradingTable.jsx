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
import { getDivisonInformation } from '@/Services/Grading';
import { GradingInformationDTO } from '@/utils/GradingInformationDTO';


const GradingTable = ({ handleToggle, setMode }) => {
    const [grading, setGrading] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const open = Boolean(anchorEl);

    const fetchGrading = async () => {
        console.log("Refresh");
        setLoading(true);
        await api.get(`${getDivisonInformation()}`, { requiresAuth: true })
            .then((response) => {
                setGrading(response.data.data)
                console.log(response.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchGrading() || null;
    }, []);

    // Handlers
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditGrading = (row) => {
        console.log("User : ", row);
        setAnchorEl(null);
        handleAddEventSidebarToggle();
    }

    const handleDeleteGrading = (row) => {
        api.delete(`${getDivisonInformation()}/${row.original.id}`, { requiresAuth: true })
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
                accessorKey: 'organization',
                header: 'سازمان',
                size: 150,
                Cell: ({ row }) => {
                    const grading = row.original;
                    const gradingDTO = new GradingInformationDTO(grading)
                    return <div style={{ textAlign: 'right' }}>{`${gradingDTO}`}</div>;
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
        data: grading,
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
        rowCount: grading.length,
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

export default GradingTable;
