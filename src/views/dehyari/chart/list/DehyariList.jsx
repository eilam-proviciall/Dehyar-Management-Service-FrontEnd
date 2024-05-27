import React, {useMemo, useState} from 'react';
import {db} from "@/fake-db/apps/user-list";
import {selectedEvent} from "@/redux-store/slices/calendar";
import Button from "@mui/material/Button";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import Box from "@mui/material/Box";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import CreateApp from "@components/dialogs/create-app";
import DehyariDialog from "@views/dehyari/chart/list/DehyariDialog";

function DehyariList(props) {
    const tableData = useMemo(() => db, []); // Memoize table data
    const {
        dispatch,
        handleAddEventSidebarToggle
    } = props;
    const buttonProps = {
        variant: 'contained',
        children: 'صدور حکم جدید'

    }

    const [expandedRows, setExpandedRows] = useState({});

    const handleExpandClick = (rowId) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName',
                header: 'نام و نام خانوادگی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'nationalId',
                header: 'کدملی',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },

            {
                accessorKey: 'dehyaries',
                header: 'دهیاری‌ها',
                size: 200,
                Cell: ({cell, row}) => {
                    const dehyaries = cell.getValue();
                    const rowId = row.id;
                    const isExpanded = !!expandedRows[rowId];

                    if (Array.isArray(dehyaries) && dehyaries.length <= 2) {
                        return <div style={{textAlign: 'right'}}>{dehyaries.join(', ')}</div>;
                    }

                    return (
                        <div style={{textAlign: 'right'}}>
                            {isExpanded ? dehyaries.join(', ') : `${dehyaries.slice(0, 2).join(', ')}...`}
                            <Button onClick={() => handleExpandClick(rowId)} size="small">
                                {isExpanded ? 'کمتر' : 'بیشتر'}
                            </Button>
                        </div>
                    );
                }
            },
            {
                accessorKey: 'role',
                header: 'نقش',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
        ],
        [expandedRows]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        renderTopToolbarCustomActions: ({table}) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={DehyariDialog} />
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