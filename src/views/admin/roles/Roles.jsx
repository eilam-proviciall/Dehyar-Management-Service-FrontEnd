'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, IconButton, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { getRoles, } from '@/Services/Admin';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import borderRadius from 'tailwindcss-logical/plugins/borderRadius';
import { Controller, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { minLength, object, string } from 'valibot';
import RoleModal from './role-modal/RoleModal';
import { toast } from 'react-toastify';

function Roles() {

    // States
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({ status: "add", name: "", guardName: "" });

    // Handlers
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleAddRole = () => {
        setModalData({ status: "add", name: "", guardName: "" });
        setOpenModal(true);
    }

    const handleEditRole = (row) => {
        setModalData({ status: "edit", id: row._valuesCache.id, name: row._valuesCache.name, guardName: row._valuesCache.guard_name });
        setOpenModal(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteRole = async (row) => {
        try {
            await axios.delete(`${getRoles()}/${row._valuesCache.id}`,
                { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}`, } }
            );
            toast.success("نقش مورد نظر شما با موفقیت حذف شد",
                {
                    position: "top-center",
                    duration: 3000
                }
            );
            return fetchRoles();
        }
        catch {
            return toast.error("حذف موفقیت آمیز نبود",
                {
                    position: "top-center",
                    duration: 3000
                }
            );
        }
    }

    const handleRefresh = () => {
        fetchRoles();
    }

    const fetchRoles = async () => {
        setLoading(true);
        await axios.get(getRoles(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            }
        }).then((response) => {
            console.log("Response => ", response);
            setData(response.data.data);
            console.log("Data => ", data);

            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'شناسه',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'guard_name',
                header: 'عنوان',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'name',
                header: 'عنوان لاتین',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 100,
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
                            <MenuItem onClick={() => {
                                handleEditRole(selectedRow);
                            }}>
                                ویرایش
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleDeleteRole(selectedRow);
                            }}>
                                حذف
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
        muiCircularProgressProps: {
            color: 'secondary', // رنگ Circular Progress (در صورت استفاده)
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

    // if (loading) return <div className='animate-pulse'>در حال بارگذاری . . .</div>

    return (
        <>
            <div className='grid mb-5 gap-5'>
                <Card >
                    <div className='p-5 text-center'>
                        <Typography variant='h5' mb={5}>در صورت نیاز میتوانید نقش های جدید بسازید</Typography>
                        <Button variant='contained' onClick={() => handleAddRole()}>افزودن نقش جدید</Button>
                    </div>
                </Card>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <RoleModal data={modalData} allData={data} onRefresh={handleRefresh} onClose={handleCloseModal} />
            </Modal>
            <MaterialReactTable
                table={table}
            />
        </>
    );
}

export default Roles