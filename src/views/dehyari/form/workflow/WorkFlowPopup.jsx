import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import { approveWorkflow, rejectWorkflow } from "@/utils/workflowService";

const WorkFlowPopup = ({ open, setOpen, information }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleApprove = () => {
        approveWorkflow(information.human_resource_id,'pending_supervisor','')
            .then(response => {
                console.log("Response => ", response);
            })
            .catch(error => {
                console.error("Error => ", error);
            });
        handleClose();
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
                <Typography variant={'h6'} className={'pt-5'}>
                    آیا از ارسال حکم به بخشداری جهت بررسی اطمینان دارید؟
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    انصراف
                </Button>
                <Button onClick={handleApprove} color="primary">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkFlowPopup;