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

function CfoTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);  // مدیریت نمایش منو
    const [currentRow, setCurrentRow] = useState(null); // ردیف جاری
    const open = Boolean(anchorEl);
    const router = useRouter();

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
            console.log(humanResourceData)
            const data = new HumanResourceDTO(humanResourceData);
            const doc = <MyDocument data={data}/>;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            toast.success('محاسبه موفق بود', {position: "top-center"});
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
                accessorKey: 'village',
                header: 'دهیاری',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue().approved_name}</div>,
            },
            {
                accessorKey: 'first_name',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({row}) => {
                    const {first_name, last_name} = row.original;
                    return <div style={{textAlign: 'right'}}>{`${first_name ?? " "} ${last_name ?? " "}`}</div>;
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
                            <Chip label={contractType[role]} color="primary"/>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({row}) => (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <IconButton
                            aria-label="more"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, row)}
                            style={{paddingLeft: 0}}
                        >
                            <MoreVertIcon
                                style={{textAlign: "center", justifyContent: 'center', alignItems: 'center'}}/>
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
                            <MenuItem onClick={handleClose}>
                                {currentRow ? (
                                    <Link href={`/dehyari/form/edit?param=${currentRow.nid}`}>
                                        ویرایش
                                    </Link>
                                ) : (
                                    <span>ویرایش</span>
                                )}
                            </MenuItem>
                            <MenuItem onClick={() => handleDownloadPdf(currentRow)}>
                                حکم کارگزینی
                            </MenuItem>
                        </Menu>
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
        // muiTableHeadCellProps: {
        //     className: 'bg-gray-200 py-2'
        // },
        muiTableBodyCellProps: {
            className: 'bg-backgroundPaper',
            sx: {
                padding: '0px 8px',
                lineHeight: '1',
            },
        }
    })

    if (loading) {
        return <Loading/>
    }

    return (
        <MaterialReactTable table={table}/>
    );
}

export default CfoTable;
