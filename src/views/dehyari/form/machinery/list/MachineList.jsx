import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Dialog, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import api from '@/utils/axiosInstance';
import { getMachineBasicInformation, getMachineInformation } from '@/Services/Machine';
import Loading from '@/@core/components/loading/Loading';
import ViewMachineInformation from './ViewMachineInformation';


const MachineList = ({ handleOpenModal, setData, setMode, methods, loading, setLoading }) => {
    const [machines, setMachines] = useState([]);
    const [basicInformations, setBasicInformations] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);
    const [openViewMachine, setOpenViewMachine] = useState(false); // حالت برای کنترل نمایش ViewMachineInformation
    const [selectedMachine, setSelectedMachine] = useState(null); // برای ذخیره اطلاعات ماشین انتخاب شده


    console.log("Loading => ", loading);


    const fetchMachine = async () => {
        setLoading(true);
        await api.get(getMachineInformation(), { requiresAuth: true })
            .then((response) => {
                setMachines(response.data.data)
                console.log("Machines => ", response.data);
                setLoading(false);
            }).catch(error => error);
    }

    const fetchBasicInformationMachine = async () => {
        await api.get(getMachineBasicInformation(), { requiresAuth: true })
            .then((response) => {
                console.log("Response => ", response);
                setBasicInformations(response.data.data);
            }).catch(error => error);
    }

    useEffect(() => {
        fetchMachine();
        fetchBasicInformationMachine();
    }, []);
    // useEffect(() => {
    // }, []);

    useEffect(() => {
        const updatedMachines = machines.map(machine => {
            const basicInfo = basicInformations.find(info => info.id === machine.machine_basic_id);
            return {
                ...machine,
                machine_category: basicInfo ? basicInfo.category : machine.machine_category,
                machine_title: basicInfo ? basicInfo.title : machine.machine_title,
                machine_type: basicInfo ? basicInfo.type : machine.machine_type,
            };
        });
        setMachines(updatedMachines);
    }, [basicInformations]);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        methods.reset();
        setData({});
        setOpenViewMachine(false);
    }

    const handleAddMachine = () => {
        setMode('add');
        handleOpenModal();
    }

    const handleOpenInformation = (row) => {
        Object.entries(row.original).forEach(([key, value]) => {
            console.log("Key => ", key, "Value => ", value);

            methods.setValue(key, value);
        });
        setData(row.original);
        setSelectedMachine(row.original); // ذخیره اطلاعات ماشین انتخاب شده
        setOpenViewMachine(true); // نمایش ViewMachineInformation
        handleClose(); // بستن منوی انتخاب
    }

    const handleEditMachine = (row) => {
        setMode('edit');
        // methods.setValue(row.original.nid);
        Object.entries(row.original).forEach(([key, value]) => {
            methods.setValue(key, value);
        });
        console.log("Methods =>", methods);
        setData(row.original);
        handleOpenModal()
    }

    const handleDeleteMachine = (row) => {
        const newData = machines.filter((user) => {
            return user.id !== row.original.id
        });
        setMachines(newData);
        setAnchorEl(null);
    }

    const tableData = useMemo(() => machines, [machines]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'شناسه',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'machine_category',
                header: 'دسته',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'machine_type',
                header: 'نوع',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'machine_title',
                header: 'عنوان',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'machine_status',
                header: 'وضعیت',
                size: 150,
                Cell: ({ cell }) => {
                    return (
                        <div style={{ textAlign: 'right' }}>

                            <Button variant='contained' className='flex gap-2 rounded-full h-8 bg-backgroundPaper text-textPrimary'>
                                <div className='bg-backgroundDefault rounded-full h-6 w-6 flex justify-center items-center text-xs'>3</div>
                                وضعیت
                            </Button>
                        </div>
                    )
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
                            handleOpenInformation(selectedRow)
                        }}>
                            نمایش اطلاعات
                        </MenuItem>
                        {/* <MenuItem onClick={() => {
                            handleEditMachine(selectedRow)
                        }}>
                            ویرایش اطلاعات
                        </MenuItem> */}
                        <MenuItem onClick={() => {
                            handleDeleteMachine(selectedRow);
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
                    onClick={handleAddMachine}
                >
                    افزودن ماشین
                </Button>
            </Box>
        ),
        initialState: {
            density: 'compact',
        },
        rowCount: machines.length,
        state: {
            isLoading: loading, // نشان دادن لودینگ پیش‌فرض
            showProgressBars: loading, // نمایش Progress Bars در هنگام بارگذاری
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
        <>
            <MaterialReactTable table={table} />
            <Dialog open={openViewMachine} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogContent>
                    <div className='flex justify-end w-full'>
                        <Button onClick={handleCloseDialog}><i className='ri-close-fill' /></Button>
                    </div>
                    {selectedMachine && <ViewMachineInformation onClose={handleCloseDialog} data={selectedMachine} />}
                </DialogContent>
            </Dialog>
        </>

    )
}

export default MachineList