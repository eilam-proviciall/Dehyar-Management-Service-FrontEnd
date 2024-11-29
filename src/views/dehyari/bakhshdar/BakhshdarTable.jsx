"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { GetHumanResourcesForBakhshdar } from "@/Services/humanResources";
import { toast } from "react-toastify";
import api from '@/utils/axiosInstance';
import CustomIconButton from "@core/components/mui/IconButton";
import Box from "@mui/material/Box";
import { translateContractState } from "@utils/contractStateTranslator";
import ContractStateChip from "@components/badges/ContractStateChip";
import WorkFlowPopup from "@views/dehyari/form/workflow/WorkFlowPopup";
import WorkFlowDrawer from '../form/workflow/WorkFlowDialog';
import useCustomTable from '@/hooks/useCustomTable';
import FilterChip from '@/@core/components/mui/FilterButton';

function BakhshdarTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const [popupOpen, setPopupOpen] = useState(false);
    const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
    const [filterStatus, setFilterStatus] = useState('');
    const buttonRefs = useRef([]);

    useEffect(() => {
        // Set initial highlight on the "همه" button
        if (buttonRefs.current[0]) {
            const { offsetWidth, offsetLeft } = buttonRefs.current[0];
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    }, []);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (status, index) => {
        setFilterStatus(status);
        const button = buttonRefs.current[index];
        if (button) {
            const { offsetWidth, offsetLeft } = button;
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    };

    const fetchData = async () => {
        try {
            const response = await api.get(`${GetHumanResourcesForBakhshdar()}`, { requiresAuth: true });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    const tableData = useMemo(() => {
        if (!filterStatus) {
            return data;
        }
        return data.filter(item => item.contract_state === filterStatus);
    }, [data, filterStatus]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'full_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({ row }) => {
                    const { first_name, last_name } = row.original;
                    return <div className={'flex items-center gap-2'}>
                        <img className={'rounded-full h-7'} src="/images/avatars/1.png" alt="پروفایل" />
                        {`${first_name ?? " "} ${last_name ?? " "}`}
                    </div>;
                },
            },
            {
                accessorKey: 'village',
                header: 'دهیاری',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue().approved_name}</div>,
            },
            {
                accessorKey: 'nid',
                header: 'کدملی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'contract_state',
                header: 'وضعیت قرارداد',
                size: 150,
                Cell: ({ cell, row }) => {
                    const contractStateValue = translateContractState(cell.getValue());
                    const role = row.original.contract_type;
                    return <div style={{ textAlign: 'right' }}>
                        <ContractStateChip
                            label={contractStateValue}
                            onClick={() => {
                                if (cell.getValue() == 'pending_supervisor' || cell.getValue() == 'rejected_to_supervisor') {
                                    setSelectedRow(row.original);
                                    setPopupOpen(true);
                                } else {
                                    toast.warning('شما به این قرارداد دسترسی ندارید');
                                }
                            }}
                            avatar={role}
                        />
                    </div>
                },
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                        {/*<CustomIconButton*/}
                        {/*    color={"error"}*/}
                        {/*    onClick={() => {*/}
                        {/*        handleDeleteTimeOff(row);*/}
                        {/*    }}*/}
                        {/*    className={"rounded-full"}*/}
                        {/*>*/}
                        {/*    <i className='ri-delete-bin-7-line'/>*/}
                        {/*</CustomIconButton>*/}
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                router.push(`/dehyari/form?mode=edit&id=${row.original.human_resource_id}`);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-eye-line' />
                        </CustomIconButton>
                    </div>
                ),
            },
        ],
        [anchorEl, selectedRow]
    );

    const table = useCustomTable(columns, tableData, {
        isLoading: loading,
        renderTopToolbarCustomActions: () => (
            <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
                <Box
                    className={'bg-backgroundPaper rounded-full'}
                    sx={{
                        position: 'absolute',
                        height: '90%',
                        transition: 'width 0.3s, right 0.3s',
                        ...highlightStyle,
                    }}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[0] = el)}
                    label="همه"
                    onClick={() => handleFilterChange('', 0)}
                    clickable
                    variant={filterStatus === '' ? 'outlined' : 'filled'}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[1] = el)}
                    label="در انتظار تایید بخشدار"
                    onClick={() => handleFilterChange('approved_by_supervisor', 1)}
                    clickable
                    variant={filterStatus === 'approved_by_supervisor' ? 'outlined' : 'filled'}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[2] = el)}
                    label="نیازمند اصلاح"
                    onClick={() => handleFilterChange('rejected_to_supervisor', 2)}
                    clickable
                    variant={filterStatus === 'rejected_to_supervisor' ? 'outlined' : 'filled'}
                />
            </Box>
        ),
    },
    );

    return (
        <div>
            <MaterialReactTable table={table} />
            <WorkFlowDrawer open={popupOpen} setDialogOpen={setPopupOpen} details={selectedRow} rejectApprovalLevel={1} setLoading={setLoading} nextState={'pending_governor'} />
        </div>
    );
}

export default BakhshdarTable;
