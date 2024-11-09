"use client"
import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import Chip from "@mui/material/Chip";
import {IconButton, Menu, MenuItem} from '@mui/material';
import {DownloadHumanResourcePdf, GetHumanResourcesForCfo} from "@/Services/humanResources";
import contractType from "@data/contractType.json";
import PersonalOption from "@data/PersonalOption.json";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import {toast} from "react-toastify";
import MyDocument from "@components/MyDocument";
import {pdf} from "@react-pdf/renderer";
import HumanResourceDTO from "@/utils/HumanResourceDTO";
import {getJobTitleLabel} from "@data/jobTitles";
import api from '@/utils/axiosInstance';
import Loading from '@/@core/components/loading/Loading';
import CustomIconButton from "@core/components/mui/IconButton";
import Typography from "@mui/material/Typography";
import WorkFlowPopup from "@views/dehyari/form/workflow/WorkFlowPopup";

function CfoTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);  // مدیریت نمایش منو
    const [currentRow, setCurrentRow] = useState(null); // ردیف جاری
    const open = Boolean(anchorEl);
    const router = useRouter();
    const [popupOpen,setPopupOpen] = useState(false);
    const [contractStateValue,setContractStateValue] = useState('');

    // کنترل کلیک روی دکمه عملیات
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(row.original);  // ردیف انتخاب شده
    };

    // دانلود فایل PDF
    const handleDownloadPdf = async (row) => {
        try {
            const response = await api.get(`${DownloadHumanResourcePdf()}?human_resource_id=${row.human_resource_id}`, {requiresAuth: true});
            const humanResourceData = response.data;
            console.log(humanResourceData);
            const data = new HumanResourceDTO(humanResourceData);
            const doc = <MyDocument data={data}/>;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            toast.success('محاسبه موفق بود');
        } catch (error) {
            return error
        }
    };

    // بستن منو
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);  // پاک کردن ردیف جاری
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`${GetHumanResourcesForCfo()}`, {requiresAuth: true});
                console.log("response => ", response);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error", error);
                setLoading(false);
                return error;
            }
        };

        fetchData();
    }, []);

    const tableData = useMemo(() => data, [data]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({row}) => {
                    const {first_name, last_name} = row.original;
                    return <div className={'flex items-center gap-2'}>
                        <img className={'rounded-full h-7'} src="/images/avatars/1.png" alt="پروفایل"/>
                        {`${first_name ?? " "} ${last_name ?? " "}`}
                    </div>;
                },
            },
            {
                accessorKey: 'village',
                header: 'دهیاری',
                size: 150,
                Cell: ({cell}) => {
                    return <div style={{textAlign: 'right'}}>{cell.getValue() && cell.getValue().approved_name || '-'}</div>
                },
            },
            {
                accessorKey: 'job_type',
                header: 'پست سازمانی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'nid',
                header: 'کدملی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'contract_type',
                header: 'نوع قرار داد',
                size: 150,
                Cell: ({cell}) => {
                    const role = cell.getValue();
                    return (
                        <div style={{textAlign: 'right'}}>
                            <Chip label={contractType[role]}
                                  className={`h-7 w-[65%] rounded-full ${role === 30 && "bg-green-700 text-gray-200" || "bg-backgroundDefault text-textPrimary"}`}
                            />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'contract_state',
                header: 'وضعیت قرارداد',
                size: 150,
                Cell: ({cell,row}) => {
                    console.log("Contract State => ", contractStateValue);
                    switch (cell.getValue()){
                        case 'draft' : setContractStateValue('پیش نویس'); break;
                        case 'reviewing' : setContractStateValue('در حال بررسی'); break;
                    }
                    return <div style={{textAlign: 'right'}}>
                        <Chip label={contractStateValue || 'پیش نویس'} onClick={()=>{
                            setCurrentRow(row.original);
                            setPopupOpen(true);
                        }}/>
                    </div>
                },
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({row}) => (
                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%'}}>
                        {/*<CustomIconButton*/}
                        {/*    color={"error"}*/}
                        {/*    onClick={() => {*/}
                        {/*        toast.warning('این قابلیت هنوز افزوده نشده است');*/}
                        {/*    }}*/}
                        {/*    className={"rounded-full"}*/}
                        {/*>*/}
                        {/*    <i className='ri-delete-bin-7-line'/>*/}
                        {/*</CustomIconButton>*/}
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                router.push(`/dehyari/form/edit?param=${row.original.nid}`);
                            }}
                            className={"rounded-full"}
                        >
                            <i className='ri-edit-box-line'/>
                        </CustomIconButton>
                        <CustomIconButton
                            color={"secondary"}
                            onClick={() => {
                                handleDownloadPdf(row.original)
                            }}
                            className={"rounded-full"}
                        >
                            < i class="ri-printer-line"/>
                        </CustomIconButton>
                    </div>
                ),
            },
        ],
        [anchorEl, currentRow]
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
    })

    if (loading) {
        return <Loading/>
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
            <MaterialReactTable table={table}/>
            <WorkFlowPopup open={popupOpen} setOpen={setPopupOpen} information={currentRow}/>
        </div>
    );
}

export default CfoTable;
