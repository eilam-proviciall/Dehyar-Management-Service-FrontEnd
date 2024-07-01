"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { GetHumanResourcesForCfo } from "@/Services/humanResources";

const CfoTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GetHumanResourcesForCfo(), {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                });

                const villagesData = response.data.map(item => ({
                    id: item.id,
                    villageName: item.village.approved_name,
                    humanResources: item.village.covered_human_resources || [], // چک برای undefined بودن
                }));

                setData(villagesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            { header: 'نام روستا', accessorKey: 'villageName' },
            { header: 'نام و نام خانوادگی', accessorKey: 'humanResources.full_name' },
            { header: 'کد ملی', accessorKey: 'humanResources.nid' },
        ],
        []
    );

    const tableData = useMemo(
        () =>
            data.map(village => ({
                ...village,
                subRows: village.humanResources.map(hr => ({
                    villageName: '',
                    humanResources: hr,
                })),
            })),
        [data]
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={tableData}
            enableExpanding
            initialState={{ expanded: true }}
        />
    );
};

export default CfoTable;
