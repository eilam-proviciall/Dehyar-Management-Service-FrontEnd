import { Button, Drawer, DialogActions, DialogContent, Collapse, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomIconButton from "@core/components/mui/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DividerSimple from "@components/common/Divider/DividerSimple";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import UserInfoItem from '../edit/Tables/UserInfoItem';
import { changeStateWorkflow } from "@/utils/workflowService";
import { toast } from "react-toastify";
import CustomTextField from "@/@core/components/custom-inputs/CustomTextField";
import { useForm } from "react-hook-form";
import { convertUnixToJalali } from "@/utils/dateConverter";
import useWorkflow from "@/hooks/useWorkflowState";

const WorkFlowDrawer = ({ open, setDialogOpen, details, rejectApprovalLevel = 0, setLoading }) => {
    const [showRejectOptions, setShowRejectOptions] = useState(false);
    const [selectedRejectType, setSelectedRejectType] = useState(null);

    const {
        state,
        description,
        error,
        canReject,
        handleStateChange,
        handleDescriptionChange,
        submitWorkflow
    } = useWorkflow('', rejectApprovalLevel == 0 && false || true);

    const handleClose = () => {
        setDialogOpen(false);
        setShowRejectOptions(false);
        setSelectedRejectType(null);
        handleStateChange('', false);
    };

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await submitWorkflow(details.salary_id);
            if (result.success) {
                await changeStateWorkflow(details.salary_id, 'pending_supervisor', '');
                toast.success("عملیات با موفقیت انجام شد");
                handleClose();
            }
        } catch (err) {
            toast.error(err.message || 'خطا در انجام عملیات');
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedRejectType && rejectApprovalLevel === 2) {
            toast.error('لطفا نوع رد درخواست را انتخاب کنید');
            return;
        }

        setLoading(true);
        try {
            const result = await submitWorkflow(details.salary_id, true);
            if (result.success) {
                const rejectState = rejectApprovalLevel === 2 ? selectedRejectType : 'rejected';
                await changeStateWorkflow(details.salary_id, rejectState, result.description);
                toast.success("عملیات با موفقیت انجام شد");
                handleClose();
            }
        } catch (err) {
            toast.error(err.message || 'خطا در انجام عملیات');
        } finally {
            setLoading(false);
        }
    };

    const renderRejectOptions = () => {
        if (!showRejectOptions) return null;

        return (
            <Box sx={{ mt: 2 }}>
                {rejectApprovalLevel > 1 && (
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant={selectedRejectType === 'rejected_to_financial_officer' ? 'contained' : 'outlined'}
                                color="error"
                                onClick={() => setSelectedRejectType('rejected_to_financial_officer')}
                            >
                                رد به مسئول مالی
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant={selectedRejectType === 'rejected_to_supervisor' ? 'contained' : 'outlined'}
                                color="error"
                                onClick={() => setSelectedRejectType('rejected_to_supervisor')}
                            >
                                رد به بخشدار
                            </Button>
                        </Grid>
                    </Grid>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleReject}
                    sx={{ mt: 2 }}
                >
                    ثبت رد درخواست
                </Button>
            </Box>
        );
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => {
                setShowRejectOptions(false);
                handleClose();
            }}
            PaperProps={{
                sx: { width: 350 }
            }}
        >
            <div className={'flex w-full justify-end px-5 py-2'}>
                <Tooltip title="بستن" placement={'top'}>
                    <CustomIconButton
                        onClick={() => handleClose()}
                        className={"rounded-full"}
                    >
                        <i className="ri-close-line" />
                    </CustomIconButton>
                </Tooltip>
            </div>
            <DividerSimple title={'بررسی حکم کارگزینی'} />
            <div className={'flex justify-center gap-5 mt-2'}>
                <Chip
                    label={"بررسی حکم"}
                    onClick={() => { }}
                    clickable
                    variant='outlined'
                    className='text-textPrimary'
                    sx={{
                        boxShadow: 2,
                        borderWidth: 1,
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    }}
                />
                <Chip
                    label={"سوابق درخواست"}
                    onClick={() => { }}
                    clickable
                    variant='outlined'
                    className='text-textPrimary'
                    sx={{
                        boxShadow: 0,
                        borderWidth: 1,
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    }}
                />
            </div>
            <DialogContent>
                <Box className={'flex flex-col gap-3'}>
                    <UserInfoItem icon="ri-user-line" label="نام کاربر" value={details ? `${details.first_name} ${details.last_name}` : "نامشخص"} />
                    <UserInfoItem icon="ri-government-line" label="پست سازمانی" value={details ? details.job_type : 'نامشخص'} />
                    <UserInfoItem icon="ri-community-line" label="اسم روستا" value={details ? details.village.approved_name : "نامشخص"} />
                    <UserInfoItem icon="ri-file-line" label="نوع قرارداد" value={details ? `${details.contract_type} روز` : 'نامشخص'} />
                    <UserInfoItem icon="ri-calendar-line" label="تاریخ پایان قرارداد" value={details ? convertUnixToJalali(details.contract_end) : 'نامشخص'} />
                    <UserInfoItem icon="ri-wallet-2-line" label="جمع حقوق و دستمزد" value="-" />
                </Box>
                {rejectApprovalLevel > 0 && (
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="توضیحات"
                        placeholder="لطفا دلیل رد درخواست را وارد کنید"
                        value={description}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        error={!!error}
                        helperText={error || 'در صورت رد درخواست، وارد کردن توضیحات الزامی است'}
                        required
                        sx={{ mt: 2, direction: 'rtl' }}
                    />
                )}
                {renderRejectOptions()}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleApprove} color="primary" variant="contained">
                    تایید
                </Button>

                {canReject && !showRejectOptions && (
                    <Button
                        onClick={() => {
                            setShowRejectOptions(true);
                            handleStateChange('rejected', true);
                        }}
                        color="error"
                        variant="contained"
                    >
                        رد
                    </Button>
                )}
            </DialogActions>
        </Drawer>
    );
};

export default WorkFlowDrawer;
