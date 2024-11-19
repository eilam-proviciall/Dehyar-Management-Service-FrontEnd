"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Chip from "@mui/material/Chip";
import { IconButton, Menu, MenuItem } from '@mui/material';
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

function CfoTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const [popupOpen, setPopupOpen] = useState(false);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(row.original);
    };

    const handleDownloadPdf = async (row) => {
        try {
            const response = await api.get(`${DownloadHumanResourcePdf()}?human_resource_id=${row.human_resource_id}`, { requiresAuth: true });
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

    const fetchData = async () => {
        try {
            const response = await api.get(`${GetHumanResourcesForCfo()}`, { requiresAuth: true });
            setData(response.data);
            setLoading(false); // پایان بارگذاری
        } catch (error) {
            console.error(error);
            setLoading(false); // پایان بارگذاری در صورت خطا
        }
    };

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]); // بارگذاری مجدد زمانی که loading تغییر می‌کند

    const tableData = useMemo(() => data, [data]);

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
                            onClick={() => {
                                if (contractStateValue !== "نامشخص") {
                                    setCurrentRow(row.original);
                                    setPopupOpen(true);
                                } else {
                                    toast.warning("امکان تغییر وضعیت قرارداد وجود ندارد!!!");
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
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                router.push(`/dehyari/form/edit?param=${row.original.nid}&id=${row.original.human_resource_id}&salary_id=${row.original.salary_id}`);
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
                    </div>
                ),
            },
        ],
        [currentRow]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        initialState: {
            density: 'compact'
        },
        muiTableBodyCellProps: {
            className: 'bg-backgroundPaper',
            sx: {
                padding: '2px 8px',
                lineHeight: '1',
            },
        }
    });

    if (loading) {
        return <Loading />
    }

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
                <span>طرف قرارداد</span></Typography>
            <MaterialReactTable table={table} />
            <WorkFlowPopup open={popupOpen} setOpen={setPopupOpen} id={currentRow?.salary_id} contractState={currentRow?.contract_state} setLoading={setLoading} />
        </div>
    );
}

export default CfoTable;