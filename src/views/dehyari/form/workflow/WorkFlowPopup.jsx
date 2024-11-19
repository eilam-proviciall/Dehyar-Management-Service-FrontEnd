import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { approveWorkflow, rejectWorkflow } from "@/utils/workflowService";

const WorkFlowPopup = ({ open, setOpen, id, contractState }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const handleApprove = () => {
        let nextContractState = null;

        switch (contractState) {
            case 'draft':
                nextContractState = 'pending_supervisor';
                break;
            case 'pending_supervisor':
                nextContractState = 'pending_governor';
                break;
            case 'pending_governor':
                nextContractState = 'approved';
                break;
            default:
                break;
        }

        if (nextContractState) {
            approveWorkflow(id, nextContractState, '')
                .then(() => console.log(`Workflow approved to: ${nextContractState}`))
                .catch(error => console.error(error))
                .finally(handleClose);
        }
    };

    const handleReject = (data) => {
        let nextContractState = null;

        switch (contractState) {
            case 'pending_supervisor':
                nextContractState = 'rejected_to_financial_officer';
                break;
            case 'pending_governor':
                nextContractState = 'rejected_to_supervisor';
                break;
            default:
                break;
        }

        if (nextContractState) {
            rejectWorkflow(id, nextContractState, data.reason)
                .then(() => console.log(`Workflow rejected to: ${nextContractState}`))
                .catch(error => console.error(error))
                .finally(handleClose);
        }
    };

    const handleRejectToCfo = (data) => {
        const nextContractState = 'rejected_to_financial_officer';

        rejectWorkflow(id, nextContractState, data.reason)
            .then(() => console.log(`Workflow rejected to CFO: ${nextContractState}`))
            .catch(error => console.error(error))
            .finally(handleClose);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant={'h6'} className={'pt-5 text-center'}>
                    آیا از ارسال حکم به بخشداری جهت بررسی اطمینان دارید؟
                </Typography>
                {(contractState === 'approved' || contractState === 'pending_governor' || contractState === 'pending_supervisor') && (
                    <Controller
                        name="reason"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'لطفاً دلیل رد قرارداد را وارد کنید.' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                label="توضیحات"
                                error={!!errors.reason}
                                helperText={errors.reason ? errors.reason.message : ''}
                            />
                        )}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    انصراف
                </Button>
                {(contractState === "approved" || contractState === "pending_supervisor") && (
                    <Button onClick={handleSubmit(handleReject)} color="error">رد قرارداد به مرحله قبل</Button>
                )}
                {(contractState === 'approved' || contractState === "pending_governor") && (
                    <Button onClick={handleSubmit(handleRejectToCfo)} color="error" variant={'contained'}>رد قرارداد به مسئول امور مالی</Button>
                )}
                {contractState !== 'approved' && (
                    <Button onClick={handleApprove} color="primary">تایید</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default WorkFlowPopup;