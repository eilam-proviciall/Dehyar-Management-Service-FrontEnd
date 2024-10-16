"use client"
import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import {MaterialReactTable} from 'material-react-table';
import Chip from "@mui/material/Chip";
import {IconButton, Menu, MenuItem} from '@mui/material';
import {GetHumanResourcesForGovernor} from "@/Services/humanResources";
import contractType from "@data/contractType.json";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import {toast} from "react-toastify";
import api from '@/utils/axiosInstance';
import Loading from '@/@core/components/loading/Loading';
import CustomIconButton from "@core/components/mui/IconButton";

function BakhshdarTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(GetHumanResourcesForGovernor(), {requiresAuth: true});
                console.log("Response => ", response);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error => ", error);
                if (error.response && error.response.status === 403) {
                    toast.error(error.response.data.message || 'شما به محتوای این بخش دسترسی ندارید!!', {
                        position: "top-center"
                    });
                } else {
                    toast.error('خطا در دریافت اطلاعات');
                }
                setLoading(false);
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
                accessorKey: 'full_name',
                header: 'نام و نام خانوادگی',
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
                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%'}}>
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
                            color={"primary"}
                            onClick={() => {
                                router.push(`/dehyari/form?mode=edit&id=${row.original.id}`);
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

    if (loading) {
        return <Loading/>
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
        />
    );
}

export default BakhshdarTable;
