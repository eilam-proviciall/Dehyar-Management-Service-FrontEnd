"use client";
import React, {useMemo, useState, useEffect} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import {getLogs} from "@/Services/Admin";
import api from '@/utils/axiosInstance';
import Loading from '@/@core/components/loading/Loading';

// تابع برای تبدیل تاریخ میلادی به شمسی
const toPersianDate = (dateString) => {
    const date = new Date(dateString);
    const persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(date);
    return persianDate;
};

function LogTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setLoading(true);
        api.get(getLogs(), {requiresAuth: true})
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const downloadJson = (properties) => {
        const blob = new Blob([JSON.stringify(properties, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `log_${properties.request_id}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'created_at',
                header: 'تاریخ',
                size: 200,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{toPersianDate(cell.getValue())}</div>,
            },
            {
                accessorKey: 'properties.tracking_code',
                header: 'کد پیگیری',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'properties.user_id',
                header: 'شناسه کاربر',
                size: 100,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'properties.exception_message',
                header: 'پیام خطا',
                size: 200,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'properties.request_url',
                header: 'URL درخواست',
                size: 300,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 100,
                Cell: ({row}) => (
                    <MenuItem onClick={() => downloadJson(row.original.properties)}>
                        <DownloadIcon/> دانلود JSON
                    </MenuItem>
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
            data={data}
            options={{
                columnOrder: ['created_at', 'properties.tracking_code', 'properties.user_id', 'properties.exception_message', 'properties.request_url', 'actions'],
            }}
        />
    );
}

export default LogTable;
