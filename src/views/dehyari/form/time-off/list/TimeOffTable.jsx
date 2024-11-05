import React, {useEffect, useMemo, useRef, useState} from 'react';
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from '@/utils/axiosInstance';
import CustomIconButton from "@core/components/mui/IconButton";
import FilterChip from "@core/components/mui/FilterButton";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const TimeOffTable = ({handleToggle, setMode}) => {
    const [timeOffs, setTimeOffs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
    const buttonRefs = useRef([]);

    const fetchTimeOffs = async () => {
        console.log("Refresh");

        // setLoading(true);
        // await api.get(`${user()}?page${page + 1}&per_page${perPage}`, { requiresAuth: true })
        //     .then((response) => {
        //         setTimeOffs(response.data.data)
        //         console.log(response.data);
        //         setLoading(false);
        //     })
    }

    useEffect(() => {
        loading ? fetchTimeOffs() : null;
    }, [loading]);

    const handleFilterChange = (status, index) => {
        setFilterStatus(status);
        const button = buttonRefs.current[index];
        if (button) {
            const { offsetWidth, offsetLeft } = button;
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    };

    useEffect(() => {
        // Set initial highlight on the "همه" button
        if (buttonRefs.current[0]) {
            const { offsetWidth, offsetLeft } = buttonRefs.current[0];
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'type',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({row}) => {
                    const {first_name, last_name} = row.original;
                    return <div style={{textAlign: 'right'}}>{`${first_name} ${last_name}`}</div>;
                },
            },
            {
                accessorKey: 'start_date',
                header: 'کدملی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'duration',
                header: 'استان',
                size: 150,
                Cell: ({cell}) => <div></div>
            },
            {
                accessorKey: 'attachment_file',
                header: 'شهرستان',
                size: 150,
                Cell: ({cell}) => <div></div>
            },
            {
                accessorKey: 'user_id',
                header: 'بخش',
                size: 150,
                Cell: ({cell}) => <div></div>
            },
            {
                accessorKey: 'actions',
                header: 'عملیات',
                size: 150,
                Cell: ({row}) => (
                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%'}}>
                        <CustomIconButton
                            color={"error"}
                            onClick={() => handleDeleteTimeOff(row)}
                            className={"rounded-full"}
                        >
                            <i className='ri-delete-bin-7-line'/>
                        </CustomIconButton>
                        <CustomIconButton
                            color={"primary"}
                            onClick={() => handleEditTimeOff(row)}
                            className={"rounded-full"}
                        >
                            <i className='ri-edit-box-line'/>
                        </CustomIconButton>
                    </div>
                ),
            },
        ],
        []
    );


    const table = useMaterialReactTable({
        columns,
        data: timeOffs,
        state: {
            isLoading: loading,
            columnFilters: filterStatus ? [{ id: 'status', value: filterStatus }] : [],
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ position: 'relative', display: 'flex', alignItems:'center', gap:1 }}>
                <Box
                    className={'bg-backgroundPaper rounded-full'}
                    sx={{
                        position: 'absolute',
                        height: '90%',
                        transition: 'width 0.3s, right 0.3s',
                        ...highlightStyle,
                    }}
                />
                <Button variant='contained' onClick={handleToggle} className={"rounded-full h-8"}>
                    <i className='ri-add-line' />
                </Button>
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[0] = el)}
                    label="همه"
                    onClick={() => handleFilterChange('', 0)}
                    clickable
                    variant={filterStatus === '' ? 'filled' : 'outlined'}
                    sx={{ color: filterStatus === '' ? 'white' : 'black' }}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[1] = el)}
                    label="پیش‌نویس"
                    onClick={() => handleFilterChange('draft', 1)}
                    clickable
                    variant={filterStatus === 'draft' ? 'filled' : 'outlined'}
                    sx={{ color: filterStatus === 'draft' ? 'white' : 'black' }}
                />
                <Chip
                    avatar={<Avatar>0</Avatar>}
                    ref={(el) => (buttonRefs.current[2] = el)}
                    label="در حال بررسی"
                    onClick={() => handleFilterChange('reviewing', 2)}
                    clickable
                    variant={filterStatus === 'reviewing' ? 'filled' : 'outlined'}
                    sx={{ color: filterStatus === 'reviewing' ? 'white' : 'black' }}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[3] = el)}
                    label="تایید شده"
                    onClick={() => handleFilterChange('approved', 3)}
                    clickable
                    variant={filterStatus === 'approved' ? 'filled' : 'outlined'}
                    sx={{ color: filterStatus === 'approved' ? 'white' : 'black' }}
                />
                <FilterChip
                    avatarValue="0"
                    ref={(el) => (buttonRefs.current[4] = el)}
                    label="رد شده"
                    onClick={() => handleFilterChange('rejected', 4)}
                    clickable
                    variant={filterStatus === 'rejected' ? 'filled' : 'outlined'}
                    sx={{ color: filterStatus === 'rejected' ? 'white' : 'black' }}
                />
            </Box>
        ),
        renderEmptyRowsFallback: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary', padding: "25px" }}>
                <img src="/images/icons/no-results.svg" alt="داده ای وجود ندارد" className={"h-36"}/>
                <div>هیچ داده‌ای وجود ندارد</div>
            </Box>
        ),
        localization: {
            filterByColumn: 'اعمال فیلتر',
        },
        initialState: {
            density: 'compact',
            pagination: {
                pageIndex: page,
                pageSize: perPage,
            }
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
            showRowsPerPage: true,
            variant: 'outlined',
            sx: {
                button: {
                    borderRadius: '50%',
                },
            },
        },
        paginationDisplayMode: 'pages',
        muiTableBodyCellProps: {
            className: 'bg-backgroundPaper',
            sx: {
                padding: '2px 8px',
                lineHeight: '1',
            },
        }
    });

    return (
        <Box>
            <MaterialReactTable table={table}/>
        </Box>
    );
}

export default TimeOffTable;