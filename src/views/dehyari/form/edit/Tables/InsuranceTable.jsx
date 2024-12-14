import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InsuranceHistory } from "@/Services/humanResources";
import InsuranceModal from "@views/dehyari/form/edit/Tables/InsuranceModal/InsuranceModal";
import CustomIconButton from "@core/components/mui/IconButton";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import useCustomTable from "@/hooks/useCustomTable";

function InsuranceTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false); // برای مدیریت مودال
  const [editId, setEditId] = useState(null); // برای مدیریت id رکوردی که در حال ویرایش است
  const [mode, setMode] = useState("create"); // برای تعیین حالت ایجاد یا ویرایش مودال
  const queryParams = new URLSearchParams(window.location.search);
  const param = queryParams.get("param");
  const open = Boolean(anchorEl);
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const fetchInsuranceHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${InsuranceHistory()}/${param}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log("Datas => ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsuranceHistory(); // دریافت داده‌ها هنگام لود شدن کامپوننت
  }, []);

  const handleEditClick = (row) => {
    setEditId(row.original.id); // تنظیم شناسه رکورد برای ویرایش
    setMode("edit"); // تنظیم مودال روی حالت ویرایش
    setOpenModal(true); // باز کردن مودال
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "dehyari_title",
        header: "عنوان محل کار",
        size: 50,
        Cell: ({ cell }) => (
          <div style={{ textAlign: "right" }}>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: "insurance_workshop",
        header: "کارگاه بیمه",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <div style={{ textAlign: "right" }}>
              <Chip
                label={value === 1 ? "دهیاری" : value === 2 ? "کارگاه" : ""}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "start_date",
        header: "تاریخ شروع",
        size: 50,
        Cell: ({ cell }) => (
          <div style={{ textAlign: "right" }}>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: "end_date",
        header: "تاریخ پایان",
        size: 20,
        Cell: ({ cell }) => (
          <div style={{ textAlign: "right" }}>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: "days",
        header: "سابقه به روز",
        size: 20,
        Cell: ({ cell }) => (
          <div style={{ textAlign: "right" }}>{cell.getValue()} روز</div>
        ),
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        size: 20,
        Cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: "100%",
            }}
          >
            {row.original.contract_state == "draft" && (
              <Tooltip title="حذف" placement={"top"}>
                <CustomIconButton
                  color={"error"}
                  onClick={() => {
                    row.original.contract_state == "draft"
                      ? toast.warning("این قابلیت هنوز افزوده نشده است")
                      : toast.error("شما اجازه حذف این قرارداد را ندارید");
                  }}
                  className={"rounded-full"}
                >
                  <i className="ri-delete-bin-7-line" />
                </CustomIconButton>
              </Tooltip>
            )}
            <Tooltip title="ویرایش" placement={"top"}>
              <CustomIconButton
                color={"primary"}
                onClick={() => {
                  handleEditClick(row);
                }}
                className={"rounded-full"}
              >
                <i className="ri-edit-box-line" />
              </CustomIconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    [anchorEl, selectedRow]
  );
  const table = useCustomTable(columns, data, {
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setMode("create");
            setOpenModal(true);
          }}
        >
          افزودن سابقه بیمه
        </Button>
      </Box>
    ),
    state: { isLoading: loading },
  });

  return (
    <>
      <MaterialReactTable
        sx={{
          maxHeight: "400px", // تنظیم ارتفاع ثابت برای جدول
          overflowY: "hidden", // غیرفعال کردن اسکرول عمودی
        }}
        table={table}
      />
      {/* مودال ایجاد یا ویرایش */}
      <InsuranceModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        refreshData={fetchInsuranceHistory}
        mode={mode} // ارسال حالت مودال (ایجاد یا ویرایش)
        editId={editId} // ارسال شناسه رکورد در صورت ویرایش
      />
    </>
  );
}

export default InsuranceTable;
