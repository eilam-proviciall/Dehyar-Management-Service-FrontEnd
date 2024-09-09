    "use client";
    import React, { useMemo, useState, useEffect } from 'react';
    import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
    import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
    import axios from "axios";
    import MoreVertIcon from '@mui/icons-material/MoreVert';
    import HistoryTableModal from "@views/dehyari/form/edit/Tables/HistoryModal/HistoryTableModal";
    import {HumanContract} from "@/Services/humanResources";

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
        const [openModal, setOpenModal] = useState(false); // مدیریت باز و بسته شدن مودال
        const [editMode, setEditMode] = useState(false); // تعیین حالت ویرایش یا ایجاد
        const [editId, setEditId] = useState(null); // نگه‌داری ID رکوردی که ویرایش می‌شود

        const open = Boolean(anchorEl);

        const handleClick = (event, row) => {
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };

        const handleCloseMenu = () => {
            setAnchorEl(null);
        };

        const handleOpenModal = () => {
            setEditMode(false); // حالت ایجاد
            setEditId(null);
            setOpenModal(true); // باز کردن مودال
        };

        const handleEdit = () => {
            setEditMode(true); // حالت ویرایش
            setEditId(selectedRow.original.id); // دریافت ID برای ویرایش
            setOpenModal(true); // باز کردن مودال
            handleCloseMenu();
        };

        const queryParams = new URLSearchParams(window.location.search);
        const param = queryParams.get('param');

        useEffect(() => {
            setLoading(true);
            axios.get(`${HumanContract()}/${param}`, {
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

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${HumanContract()}/${param}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        const columns = useMemo(() => [
            {
                accessorKey: 'contract_start',
                header: 'تاریخ شروع قرارداد',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'contract_end',
                header: 'تاریخ پایان قرارداد',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'title_contract',
                header: 'عنوان قرارداد',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
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
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleEdit}>
                                ویرایش
                            </MenuItem>
                        </Menu>
                    </div>
                ),
            },
        ], [anchorEl, selectedRow]);

        const table = useMaterialReactTable({
            columns,
            data,
            renderTopToolbarCustomActions: () => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        افزودن قرارداد
                    </Button>
                </Box>
            ),
            initialState: { density: 'compact' },
            state: {
                isLoading: loading,
                showProgressBars: loading,
            },
            muiSkeletonProps: {
                animation: 'wave',
                height: 28,
            },
            muiLinearProgressProps: {
                color: 'primary',
            },
            muiPaginationProps: {
                color: 'primary',
                shape: 'rounded',
                showRowsPerPage: false,
                variant: 'outlined',
            },
            paginationDisplayMode: 'pages',
        });

        return (
            <div>
                <MaterialReactTable table={table} />
                <HistoryTableModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    refreshData={fetchData}
                    mode={editMode ? 'edit' : 'create'}
                    editId={editId}
                />
            </div>
        );
    }

    export default HistoryTable;
