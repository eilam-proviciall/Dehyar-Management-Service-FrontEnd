import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import api from "@utils/axiosInstance";
import {ChangeStateSalaries} from "@/Services/humanResources";

const WorkFlowPopup = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
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
                <Typography variant={'h6'} className={'p-5'}>آیا از ارسال حکم به بخشداری جهت بررسی اطمینان دارید؟</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    انصراف
                </Button>
                <Button onClick={() => {
                    api.post(`${ChangeStateSalaries()}/}`,{requiresAuth: true })
                    handleClose();
                }} color="primary">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkFlowPopup;