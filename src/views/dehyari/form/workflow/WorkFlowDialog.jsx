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
import TabContent from "@/components/common/Tabs/TabContent";
import AnimatedTabs from "@/components/common/Tabs/AnimatedTabs";
import Typography from "@mui/material/Typography";

const WorkFlowDrawer = ({ open, setDialogOpen, details, rejectApprovalLevel = 0, setLoading, nextState, readOnly = false }) => {
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
                {rejectApprovalLevel > 1 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={async () => {
                                    if (!description) {
                                        toast.error('لطفا توضیحات را وارد کنید');
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await changeStateWorkflow(details.salary_id, 'rejected_to_financial_officer', description);
                                        toast.success("عملیات با موفقیت انجام شد");
                                        handleClose();
                                    } catch (err) {
                                        toast.error(err.message || 'خطا در انجام عملیات');
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                عدم تایید و رد به مسئول مالی
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={async () => {
                                    if (!description) {
                                        toast.error('لطفا توضیحات را وارد کنید');
                                        return;
                                    }
                                    setLoading(true);
                                    try {
                                        await changeStateWorkflow(details.salary_id, 'rejected_to_supervisor', description);
                                        toast.success("عملیات با موفقیت انجام شد");
                                        handleClose();
                                    } catch (err) {
                                        toast.error(err.message || 'خطا در انجام عملیات');
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                عدم تایید و رد به بخشداری
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={handleReject}
                    >
                        ثبت رد درخواست
                    </Button>
                )}
            </Box>
        );
    };

    const tabs = [
        { label: "بررسی حکم", value: "review" },
        { label: "سوابق درخواست", value: "history" }
    ];

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
            <DividerSimple title={
                <Typography component="span">
                    حکم کارگزینی{' '}
                    <Typography component="span" sx={{ fontWeight: 700 }} display="inline">
                        {details?.first_name || ''} {details?.last_name || ''}
                    </Typography>
                </Typography>
            } />
            <AnimatedTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <DialogContent>
                <TabContent active={activeTab === 'review'}>
                    <ReviewDecree
                        details={details}
                        rejectApprovalLevel={rejectApprovalLevel}
                        description={description}
                        error={error}
                        handleDescriptionChange={handleDescriptionChange}
                        renderRejectOptions={renderRejectOptions}
                        readOnly={readOnly}
                    />
                </TabContent>
                <TabContent active={activeTab === 'history'}>
                    <RequestHistory details={details} />
                </TabContent>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', px: 5, pb: 3 }}>
                {!readOnly && (
                    <>
                        <Button variant="contained" color="success" onClick={handleApprove}>
                            تایید
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setShowRejectOptions(true);
                                handleStateChange('rejected', true);
                            }}
                        >
                            رد درخواست
                        </Button>
                    </>
                )}
            </DialogActions>
        </Drawer>
    );
};

export default WorkFlowDrawer;