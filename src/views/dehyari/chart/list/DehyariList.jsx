import React, {useMemo, useState} from 'react';
import Button from "@mui/material/Button";
import {
    MaterialReactTable,
    MRT_ActionMenuItem,
    useMaterialReactTable,
} from 'material-react-table';
import Box from "@mui/material/Box";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import DehyariDialog from "@views/dehyari/chart/list/DehyariDialog";
import {db} from "@/fake-db/dehyari/ahkam";
import Chip from "@mui/material/Chip";
import { Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
function DehyariList(props) {
    const tableData = useMemo(() => db, []); // Memoize table data
    const {
        dispatch,
        handleAddEventSidebarToggle
    } = props;
    const buttonProps = {
        variant: 'contained',
        children: 'ثبت اطلاعات پرسنلی'

    }

    const [expandedRows, setExpandedRows] = useState({});

    const handleExpandClick = (rowId) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
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
                accessorKey: 'position',
                header: 'پست سازمانی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            }, {
                accessorKey: 'fullName',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'nationalID',
                header: 'کدملی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            }, {
                accessorKey: 'contractType',
                header: 'نوع قرار داد',
                size: 150,
                Cell: ({cell}) => {
                    const role = cell.getValue();
                    const color = getChipColor(role);
                    return (
                        <div style={{textAlign: 'right'}}>
                            <Chip label={role} color={color}/>
                        </div>
                    );
                },
            },

            {
                accessorKey: 'operation',
                header: 'عملیات',
                size: 150,
                Cell: ({cell}) => {
                    const role = cell.getValue();
                    const color = getChipColor(role);
                    return (
                        <div style={{textAlign: 'right'}}>
                            <Chip label={role} color={color}/>
                        </div>
                    );
                },
            },
        ],
        [expandedRows]
    );

    let renderTopToolbarCustomActions;
    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableCellActions: true,
        enableClickToCopy: 'context-menu',
        enableEditing: true,
        editDisplayMode: 'cell',
        renderCellActionMenuItems: ({ closeMenu, table, internalMenuItems }) => [
            ...internalMenuItems,
            <Divider key="divider" ma />,
        ],
        renderTopToolbarCustomActions: ({table}) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={DehyariDialog}/>
            </Box>
        ),
    });
    return (
        <div>
            <MaterialReactTable table={table}/>
        </div>
    );
}

export default DehyariList;