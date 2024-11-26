import { Button, Drawer, DialogActions, DialogContent, Collapse } from "@mui/material";
import React, { useState } from "react";
import CustomIconButton from "@core/components/mui/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import DividerSimple from "@components/common/Divider/DividerSimple";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import UserInfoItem from '../edit/Tables/UserInfoItem'; // فرض کنید مسیر فایل UserInfoItem.js است
import { changeStateWorkflow } from "@/utils/workflowService";
import { toast } from "react-toastify";
import CustomTextField from "@/@core/components/custom-inputs/CustomTextField";
import { useForm } from "react-hook-form";
import { convertUnixToJalali } from "@/utils/dateConverter";

const WorkFlowDrawer = ({ open, setDialogOpen, details, rejectApprovalLevel = 0, setLoading }) => {
    const [showRejectOptions, setShowRejectOptions] = useState(false);
    const [description, setDescription] = useState('');
    const { control, handleSubmit, reset, formState: { errors } } = useForm();


    const handleClose = () => {
        setDescription('');
        setDialogOpen(false)
    }

    const handleApprove = (data) => {
        return changeStateWorkflow(details.salary_id, 'pending_supervisor', '')
            .then(() => {
                setLoading(true);
                toast.success("عملیات موفقیت آمیز بود.");
                console.log(`change state workflow  to: ${contractState}`)
            })
            .catch(error => console.error(error))
            .finally(handleClose());
    }

    const handleReject = (data) => {

        if (rejectApprovalLevel === 2) {
            return setShowRejectOptions(true);
        } else if (rejectApprovalLevel > 0 && !description) {
            toast.error("لطفاً دلیل رد قرارداد را وارد کنید.");
            return;
        } else {
            return changeStateWorkflow(details.salary_id, 'rejected_to_financial_officer', data.message)
                .then(() => {
                    setLoading(true);
                    toast.success("عملیات موفقیت آمیز بود.");
                    console.log(`change state workflow  to: ${contractState}`)
                })
                .catch(error => console.error(error))
                .finally(handleClose());
        }
    };

    console.log(details);
    const handleRejectTo = (data, role) => {
        return changeStateWorkflow(details.salary_id, role === 'bakhsdar' && 'rejected_to_supervisor' || 'rejected_to_financial_officer', data.message)
            .then(() => {
                setLoading(true);
                toast.success("عملیات موفقیت آمیز بود.");
                console.log(`change state workflow  to: ${contractState}`)
            })
            .catch(error => console.error(error))
            .finally(handleClose());
        console.log(`Rejected to ${role} with description: ${description}`);
        setShowRejectOptions(false);
        handleClose();
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
            <Grid className={'p-5'}>
                <div className={'flex w-full justify-end'}>
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
                <div className={'flex justify-center gap-5 mt-5'}>
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
                        <UserInfoItem icon="ri-user-line" label="نام کاربر" value={details && (`${details.first_name} ${details.last_name}`) || "نامشخص"} />
                        <UserInfoItem icon="ri-government-line" label="پست سازمانی" value={details && (details.job_type || 'نامشخص')} />
                        <UserInfoItem icon="ri-community-line" label="اسم روستا" value={details && (details.village.approved_name || "نامشخص")} />
                        <UserInfoItem icon="ri-file-line" label="نوع قرارداد" value={details && (`${details.contract_type} روز` || 'نامشخص')} />
                        <UserInfoItem icon="ri-calendar-line" label="تاریخ پایان قرارداد" value={details && (`${convertUnixToJalali(details.contract_end)}` || 'نامشخص')} />
                        <UserInfoItem icon="ri-wallet-2-line" label="جمع حقوق و دستمزد" value="-" />
                    </Box>
                    {rejectApprovalLevel > 0 && (
                        <CustomTextField
                            name='message'
                            control={control}
                            label={'توضیحات'}
                            rules={{ required: 'لطفاً دلیل رد قرارداد را وارد کنید.' }}
                            multiline
                            fullWidth
                            rows={4}
                            value={description}
                            sx={{ mt: 3 }}
                        />
                    )}
                </DialogContent>
            </Grid>
            <DialogActions className={' relative justify-center'}>
                {rejectApprovalLevel > 0 && (
                    <Button
                        onClick={handleReject}
                        color="error"
                        variant={'contained'}
                        fullWidth
                    >
                        عدم تایید حکم
                    </Button>
                )}
                <Collapse in={showRejectOptions} className="absolute w-full left-0 top-[75%]">
                    <Button color="error" onClick={handleSubmit((data) => handleRejectTo(data, 'bakhshdar'))}>
                        رد به بخشدار
                    </Button>
                    <Button color="error" onClick={handleSubmit((data) => handleRejectTo(data, 'financial'))}>
                        رد به مسئول مالی
                    </Button>
                </Collapse>
                <Button onClick={() => handleSubmit(handleApprove())} color="success" variant={'contained'}>
                    تایید حکم
                </Button>
            </DialogActions>
        </Drawer>
    );
}

export default WorkFlowDrawer;