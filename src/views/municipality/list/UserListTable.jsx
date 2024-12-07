import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { selectedEvent } from "@/redux-store/slices/calendar";
import Chip from "@mui/material/Chip";
import { user } from "@/Services/Auth/AuthService";
import roles from "@data/roles.json";
import { toast } from 'react-toastify';
import api from '@/utils/axiosInstance';
import CustomIconButton from "@core/components/mui/IconButton";
import { getGeoDetails } from "@/Services/CountryDivision";
import useCustomTable from '@/hooks/useCustomTable';
import GeoService from '@/Services/GeoService';


const UserListTable = ({
    dispatch,
    handleAddEventSidebarToggle,
    addEventSidebarOpen,
    setSidebarDetails,
    loading,
    setLoading
}) => {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get(`${user()}?page=${page + 1}&per_page=${perPage}`, { requiresAuth: true });
            const responseData = response.data.data;
            const usersData = responseData.data;
            setTotalRows(responseData.total);
            const usersWithGeo = await GeoService.translateGeoData(usersData);
            setUsers(usersWithGeo);
        } catch (error) {
            console.error("Error fetching users or geo details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, perPage]);

    useEffect(() => {
        if (loading) {
            fetchUsers();
        }
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
        toast.warning("این قابلیت به زودی افزوده میشود!");
    };

    const handleEditUser = (row) => {
        setSidebarDetails({ status: 'edit', defaultValues: row.original });
        setAnchorEl(null);
        handleAddEventSidebarToggle();
    };

    const handleChangePassword = (row) => {
        toast.warning("این قابلیت به زودی افزوده میشود!");
    };

    const handleDeleteUser = (row) => {
        api.delete(`${user()}/${row.original.id}`, { requiresAuth: true })
            .then(() => {
                toast.success("کاربر با موفقیت حذف شد");
                setLoading(true);
            }).catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    const handleSidebarToggleSidebar = () => {
        dispatch(selectedEvent(null));
        setSidebarDetails({ status: 'add', defaultValues: {} });
        handleAddEventSidebarToggle();
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
            case 'مسئول امور مالی':
                return 'primary';
            case 'بخشدار':
                return 'success';
            case 'ناظر فنی':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    const tableData = useMemo(() => users, [users]);

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
                accessorKey: 'geo_state_name',
                header: 'استان',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue() || "-"}</div>,
            },
            {
                accessorKey: 'geo_city_name',
                header: 'شهرستان',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue() || "-"}</div>,
            },
            {
                accessorKey: 'geo_region_name',
                header: 'بخش',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue() || "-"}</div>,
            },
            {
                accessorKey: 'work_group',
                header: 'نقش',
                size: 150,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <Chip sx={{
                                height: 27.5, backgroundColor: `var(--mui-palette-${getChipColor(roles[role])}-lightOpacity)`,
                                color: `var(--mui-palette-${getChipColor(roles[role])}-main)`,
                                textShadow: '0px 0.5px 0.5px rgba(0, 0, 0, 0.1)'
                            }} label={roles[role]} color={getChipColor(roles[role])} />
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
                            {!dehyaries ? '-' : `${dehyaries.length || 0} روستا`}
                        </div>
                    );
                }
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                        <CustomIconButton
                            color={"error"}
                            onClick={() => {
                                handleDeleteUser(row);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-delete-bin-7-line' />
                        </CustomIconButton>
                        <CustomIconButton
                            color={"primary"}
                            onClick={() => {
                                handleEditUser(row);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-edit-box-line' />
                        </CustomIconButton>
                        <CustomIconButton
                            color={"warning"}
                            onClick={() => {
                                toast.warning('این قابلیت هنوز افزوده نشده است');
                            }}
                            className={"rounded-full"}
                        >
                            < i class="ri-key-2-line" />
                        </CustomIconButton>
                        <CustomIconButton
                            color={"success"}
                            onClick={() => {
                                toast.warning('این قابلیت هنوز افزوده نشده است');
                            }}
                            className={"rounded-full"}
                        >
                            < i class="ri-login-circle-line" />
                        </CustomIconButton>
                    </div>
                )
            },
        ],
        [anchorEl, selectedRow]
    );

    const table = useCustomTable(columns, tableData, {
        isLoading: loading,
        enablePagination: true,
        manualPagination: true,
        rowCount: totalRows,
        onPaginationChange: updater => {
            if (typeof updater === 'function') {
                const newState = updater({ pageIndex: page, pageSize: perPage });
                setPage(newState.pageIndex);
                setPerPage(newState.pageSize);
            } else {
                setPage(updater.pageIndex);
                setPerPage(updater.pageSize);
            }
        },
        state: {
            pagination: {
                pageIndex: page,
                pageSize: perPage,
            },
        },

        // تنظیمات اختصاصی این جدول
        renderTopToolbarCustomActions: () => (
            <Button
                variant="contained"
                onClick={handleSidebarToggleSidebar}
                startIcon={<i className="ri-add-line" />}
            >
                افزودن کاربر جدید
            </Button>
        ),
    });

    return (
        <MaterialReactTable
            table={table}
        />
    );
}

export default UserListTable;