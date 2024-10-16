'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {user} from "@/Services/Auth/AuthService";
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {toast} from 'react-toastify';
import api from '@/utils/axiosInstance';
import {getMissions} from '@/Services/Mission';
import {MissionDTO} from '@/utils/MissionDTO';
import CustomIconButton from "@core/components/mui/IconButton";


const MissionTable = ({handleToggle, setMode}) => {
    const [mission, setMission] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const open = Boolean(anchorEl);

    const fetchMission = async () => {
        console.log("Refresh");
        setLoading(true);
        await api.get(`${getMissions()}`, {requiresAuth: true})
            .then((response) => {
                const updatedMissions = response.data.data.map(missionDTO => new MissionDTO(missionDTO));
                setMission(updatedMissions);
                console.log("Updated Mission => ", updatedMissions);
                // console.log("Response => ", response.data);
                setLoading(false);
            });
        console.log("Mission => ", mission);
    }

    useEffect(() => {
        fetchMission();
    }, []);

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
        api.delete(`${user()}/${row.original.id}`, {requiresAuth: true})
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
                accessorKey: 'request_type',
                header: 'نوع درخواست',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'mission_type',
                header: 'نوع ماموریت',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'accommodation',
                header: 'محل اقامت',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'transportation',
                header: 'وسیله نقلیه',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({row}) => (
                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%'}}>
                        <CustomIconButton
                            color={"error"}
                            onClick={() => {
                                handleDeleteTimeOff(row);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-delete-bin-7-line'/>
                        </CustomIconButton>
                        <CustomIconButton
                            color={"primary"}
                            onClick={() => {
                                handleEditTimeOff(row);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-edit-box-line'/>
                        </CustomIconButton>
                    </div>
                ),
            },
        ],
        [anchorEl, selectedRow]
    );

    const table = useMaterialReactTable({
        columns,
        data: mission,
        renderTopToolbarCustomActions: ({table}) => (
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
                    startIcon={<i className='ri-add-line'/>}
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
        muiTableBodyCellProps: {
            className: 'bg-backgroundPaper',
            sx: {
                padding: '2px 8px',
                lineHeight: '1',
            },
        }
    });

    return (
        <MaterialReactTable table={table}/>
    );
}

export default MissionTable;
