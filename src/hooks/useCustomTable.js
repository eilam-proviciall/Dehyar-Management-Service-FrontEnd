// src/hooks/useCustomTable.js
import { Box } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';

const useCustomTable = (columns, data, options = {}) => {
    // تنظیمات پیش‌فرض برای همه جداول
    const defaultOptions = {
        // تنظیمات ظاهری
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: '#e0e0e0',
            },
        },
        muiTableProps: {
            sx: {
                '& .MuiTableRow-root:hover': {
                    backgroundColor: '#f5f5f5',
                },
            },
        },
        // تنظیمات عملکردی
        // enableColumnResizing: true,
        // enablePagination: true,
        // enableColumnFilters: true,
        // enableColumnOrdering: true,
        // enableSorting: true,
        // enableBottomToolbar: true,
        // enableTopToolbar: true,
        enableSelectAll: false,
        enableRowSelection: false,
        enableColumnSelection: false,
        columnResizeDirection: "rtl",
        // تنظیمات فارسی‌سازی
        localization: MRT_Localization_FA,
        // تنظیمات pagination
        muiTablePaginationProps: {
            rowsPerPageOptions: [10, 20, 50, 100],
            labelRowsPerPage: "تعداد در صفحه",
            labelDisplayedRows: ({ from, to, count }) => `${from}-${to} از ${count}`,
        },
        // تنظیمات dense
        initialState: {
            density: 'compact',
        },
        renderEmptyRowsFallback: () => (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary',
                padding: "25px"
            }}>
                <img src="/images/icons/no-results.svg" alt="داده ای وجود ندارد" className={"h-36"} />
                <div>هیچ داده‌ای جهت نمایش وجود ندارد</div>
            </Box>
        ),
        muiSkeletonProps: {
            animation: 'wave',
            height: 28,
        },
        muiLinearProgressProps: {
            color: 'primary',
        },
        muiCircularProgressProps: {
            color: 'secondary',
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
    };

    // ترکیب تنظیمات پیش‌فرض با تنظیمات سفارشی
    const mergedOptions = {
        ...defaultOptions,
        muiTablePaperProps: {
            ...defaultOptions.muiTablePaperProps,
            sx: {
                ...defaultOptions.muiTablePaperProps.sx,
            },
        },
    };

    return useMaterialReactTable({
        columns,
        data,
        ...mergedOptions,
    });
};

export default useCustomTable;