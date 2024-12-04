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
import RequestHistory from "./RequestHistory";
import ReviewDecree from "./ReviewDecree";

const WorkFlowDrawer = ({ open, setDialogOpen, details, rejectApprovalLevel = 0, setLoading, nextState }) => {
    const [showRejectOptions, setShowRejectOptions] = useState(false);
    const [selectedRejectType, setSelectedRejectType] = useState(null);
    const [activeTab, setActiveTab] = useState('review'); // Default tab is بررسی حکم

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
            await changeStateWorkflow(details.salary_id, nextState, '');
            toast.success("عملیات با موفقیت انجام شد");
            handleClose();
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
                const rejectState = rejectApprovalLevel === 2 ? selectedRejectType : 'rejected_to_financial_officer';
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
            <DividerSimple title={`بررسی حکم کارگزینی ${details?.first_name} ${details?.last_name}`} />
            <div className={'flex justify-center gap-5 mt-2'}>
                <Chip
                    label={"بررسی حکم"}
                    onClick={() => setActiveTab('review')}
                    clickable
                    variant={activeTab === 'review' ? 'filled' : 'outlined'}
                    sx={{
                        boxShadow: activeTab === 'review' ? 2 : 0,
                        borderWidth: 1,
                        backgroundColor: activeTab === 'review' ? 'primary.main' : 'transparent',
                        color: activeTab === 'review' ? 'white' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'inherit',
                        },
                    }}
                />
                <Chip
                    label={"سوابق درخواست"}
                    onClick={() => setActiveTab('history')}
                    clickable
                    variant={activeTab === 'history' ? 'filled' : 'outlined'}
                    sx={{
                        boxShadow: activeTab === 'history' ? 2 : 0,
                        borderWidth: 1,
                        backgroundColor: activeTab === 'history' ? 'primary.main' : 'transparent',
                        color: activeTab === 'history' ? 'white' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'inherit',
                        },
                    }}
                />
            </div>
            <DialogContent>
                {activeTab === 'review' ? (
                    <ReviewDecree
                        details={details}
                        rejectApprovalLevel={rejectApprovalLevel}
                        description={description}
                        error={error}
                        handleDescriptionChange={handleDescriptionChange}
                        renderRejectOptions={renderRejectOptions}
                    />
                ) : (
                    <RequestHistory details={details} />
                )}
            </DialogContent>
            <DialogActions>
                {activeTab === 'review' && (
                    <>
                        {rejectApprovalLevel > 0 && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setShowRejectOptions(!showRejectOptions)}
                                sx={{ ml: 2 }}
                            >
                                رد درخواست
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleApprove}
                        >
                            تایید
                        </Button>
                    </>
                )}
            </DialogActions>
        </Drawer>
    );
};

export default WorkFlowDrawer;