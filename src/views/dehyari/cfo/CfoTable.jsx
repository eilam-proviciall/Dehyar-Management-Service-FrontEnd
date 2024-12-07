"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Chip from "@mui/material/Chip";
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { DownloadHumanResourcePdf, GetHumanResourcesForCfo } from "@/Services/humanResources";
import contractType from "@data/contractType.json";
import PersonalOption from "@data/PersonalOption.json";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import { toast } from "react-toastify";
import MyDocument from "@components/MyDocument";
import { pdf } from "@react-pdf/renderer";
import HumanResourceDTO from "@/utils/HumanResourceDTO";
import { getJobTitleLabel } from "@data/jobTitles";
import api from '@/utils/axiosInstance';
import Loading from '@/@core/components/loading/Loading';
import CustomIconButton from "@core/components/mui/IconButton";
import Typography from "@mui/material/Typography";
import WorkFlowPopup from "@views/dehyari/form/workflow/WorkFlowPopup";
import { translateContractState } from "@utils/contractStateTranslator";
import ContractStateChip from "@components/badges/ContractStateChip";
import WorkFlowDrawer from '../form/workflow/WorkFlowDialog';
import useCustomTable from '@/hooks/useCustomTable';
import FilterChip from '@/@core/components/mui/FilterButton';
import HistoryWorkflowPopup from '../form/workflow/HistoryWorkflow';

function CfoTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupWorkflow, setPopupWorkflow] = useState(false);
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
        setCurrentRow(row.original);
    };

    const handleDownloadPdf = async (row) => {
        try {
            const response = await api.get(`${DownloadHumanResourcePdf()}?human_resource_id=${row.human_resource_id}&human_contract_id=${row.human_contract_id}`, { requiresAuth: true });
            const humanResourceData = response.data;
            const data = new HumanResourceDTO(humanResourceData);
            const doc = <MyDocument data={data} />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            toast.success('محاسبه موفق بود');
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);
    };

    const handleFilterChange = (status, index) => {
        setFilterStatus(status);
        const button = buttonRefs.current[index];
        if (button) {
            const { offsetWidth, offsetLeft } = button;
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    };

    const handleWorkflowHistory = (row) => {
        if (row?.salary_id) {
            setCurrentRow(row);  // مقداردهی صحیح به currentRow
            setPopupWorkflow(true);  // باز کردن پنجره تاریخچه
        } else {
            toast.error("اطلاعات تاریخچه موجود نیست.");
        }
    };


    const fetchData = async () => {
        try {
            const response = await api.get(`${GetHumanResourcesForCfo()}`, { requiresAuth: true });
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
                accessorKey: 'first_name',
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
                Cell: ({ cell }) => {
                    return <div style={{ textAlign: 'right' }}>{cell.getValue() && cell.getValue().approved_name || '-'}</div>
                },
            },
            {
                accessorKey: 'job_type',
                header: 'پست سازمانی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{cell.getValue()}</div>,
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
                            // onClick={() => {
                            //     if (cell.getValue() == 'draft' || cell.getValue() == 'rejected_to_financial_officer') {
                            //         setCurrentRow(row.original);
                            //         setPopupOpen(true);
                            //     } else {
                            //         toast.warning('شما به این قرارداد دسترسی ندارید');
                            //     }
                            // }}
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
                        <CustomIconButton
                            color={"secondary"}
                            disabled={row.original.contract_state == 'approved'}
                            onClick={() => {
                                row.original.contract_state !== 'approved' && router.push(`/dehyari/form/edit?param=${row.original.nid}&id=${row.original.human_resource_id}&salary_id=${row.original.salary_id}`) || toast.warning('شما اجازه ویرایش این قرارداد را ندارید');
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-edit-box-line' />
                        </CustomIconButton>
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                handleDownloadPdf(row.original)
                            }}
                            className={"rounded-full"}
                        >
                            <i className="ri-printer-line" />
                        </CustomIconButton>
                        {/* <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                handleWorkflowHistory(row.original);
                            }}
                            className={"rounded-full"}
                        >
                            < i class="ri-history-line" />
                        </CustomIconButton> */}
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                if (row.original.contract_state == 'draft' || row.original.contract_state == 'rejected_to_financial_officer') {
                                    setCurrentRow(row.original);
                                    setPopupOpen(true);
                                } else {
                                    toast.warning('شما به این قرارداد دسترسی ندارید');
                                }
                            }}
                            className={"rounded-full animate-pulse"}
                        >
                            < i class="ri-mail-send-line" />
                        </CustomIconButton>
                    </div>
                ),
            },
        ],
        [currentRow]
    );

    const table = useCustomTable(columns, tableData, {
        isLoading: loading,
        renderTopToolbarCustomActions: () => (
            <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
                <Button variant='contained' onClick={() => router.push('/dehyari/form')} className={"rounded-full h-8"}>
                    <i className='ri-add-line' />
                </Button>
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
                    label="پیش‌نویس"
                    onClick={() => handleFilterChange('draft', 1)}
                    clickable
                    variant={filterStatus === 'draft' ? 'outlined' : 'filled'}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[2] = el)}
                    label="نیازمند اصلاح"
                    onClick={() => handleFilterChange('rejected_to_financial_officer', 2)}
                    clickable
                    variant={filterStatus === 'rejected_to_financial_officer' ? 'outlined' : 'filled'}
                />
            </Box>
        ),
    },

    );

    return (
        <div>
            <Typography display={'flex'} variant={'h5'} mb={5} gap={1}>
                <span>فهرست</span>
                <span className={'text-error font-bold relative inline-block'}>
                    پرسنل
                    <img
                        src="/images/icons/Line-2.png"
                        alt="زیرخط"
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            width: '100%',
                            height: '4px',
                            position: 'absolute',
                            bottom: '-2px',
                            objectFit: 'contain',
                        }}
                    />
                </span>
                <span>دهیاری ها</span></Typography>
            <MaterialReactTable table={table} />
            <WorkFlowDrawer open={popupOpen} setDialogOpen={setPopupOpen} details={currentRow} rejectApprovalLevel={0} setLoading={setLoading} nextState={'pending_supervisor'} />
        </div>
    );
}

export default CfoTable;