'use client';
import React, {useMemo} from 'react';
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {db} from "@/fake-db/apps/user-list";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function UserListTable() {
    const tableData = db
    console.log(tableData)
    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName', //access nested data with dot notation
                header: 'First Name',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'country', //normal accessorKey
                header: 'Address',
                size: 200,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,
            },
            {
                accessorKey: 'role',
                header: 'role',
                size: 150,
                Cell: ({cell}) => <div style={{textAlign: 'right'}}>{cell.getValue()}</div>,

            },

        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data: tableData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderTopToolbarCustomActions: ({table}) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button variant="contained">
                    افزودن کاربر
                </Button>
            </Box>
        ),

    });
    return (
        <>
            <MaterialReactTable table={table}/>
        </>
    );
}

export default UserListTable;