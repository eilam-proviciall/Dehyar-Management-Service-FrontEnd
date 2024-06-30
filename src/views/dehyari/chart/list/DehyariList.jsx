import React, { useMemo, useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import { MaterialReactTable } from 'material-react-table';
import Box from "@mui/material/Box";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import DehyariDialog from "@views/dehyari/chart/list/DehyariDialog";
import Chip from "@mui/material/Chip";
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import axios from "axios";
import { humanResources } from "@/Services/humanResources";
import jobTitles from '@data/jobTitles.json';
import contractType from "@data/contractType.json";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DehyariList(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const options = [
        'None',
        'Atria',
        'Callisto',
        'Dione',
        'Ganymede',
        'Hangouts Call',
        'Luna',
        'Oberon',
        'Phobos',
        'Pyxis',
        'Sedna',
        'Titania',
        'Triton',
        'Umbriel',
    ];
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        axios.get(humanResources(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const tableData = useMemo(() => data, [data]);
    const {
        dispatch,
        handleAddEventSidebarToggle
    } = props;
    const buttonProps = {
        variant: 'contained',
        children: 'ثبت اطلاعات پرسنلی'
    };

    const getChipColor = (role) => {
        switch (role) {
            case 'ناقض':
                return 'primary';
            case 'پایان کار':
                return 'warning';
            default:
                return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'job_type_id',
                header: 'پست سازمانی',
                size: 150,
                Cell: ({ cell }) => <div style={{ textAlign: 'right' }}>{jobTitles[cell.getValue()]}</div>,
            },
            {
                accessorKey: 'full_name',
                header: 'نام و نام خانوادگی',
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
                accessorKey: 'contract_type',
                header: 'نوع قرار داد',
                size: 150,
                Cell: ({ cell }) => {
                    const role = cell.getValue();
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <Chip label={contractType[role]} color="primary" />
                        </div>
                    );
                },
            },
            {
                accessorKey: '3453',
                header: 'عملیات',
                size: 150,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event)}
                            style={{ paddingLeft: 0 }}
                        >
                            <MoreVertIcon style={{textAlign:"center",justifyContent: 'center', alignItems: 'center'}}/>
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
                            {options.map((option) => (
                                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                ),
            },
        ],
        [anchorEl, selectedRow]
    );

    const handleEdit = (row) => {
        console.info('Edit', row);
        setAnchorEl(null);
    };

    const handleDelete = (row) => {
        console.info('Delete', row);
        setAnchorEl(null);
    };

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
        />
    );
}

export default DehyariList;
