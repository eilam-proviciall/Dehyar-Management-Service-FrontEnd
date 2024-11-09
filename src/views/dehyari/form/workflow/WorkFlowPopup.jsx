import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import api from "@utils/axiosInstance";
import {ChangeStateSalaries} from "@/Services/humanResources";

const WorkFlowPopup = ({open, setOpen, information}) => {
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
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant={'h6'} className={'p-5'}>آیا از ارسال حکم به بخشداری جهت بررسی اطمینان
                    دارید؟</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    انصراف
                </Button>
                <Button onClick={() => {
                    const finallyData = {
                        state: 'pending_bakhshdar',
                        message: 'در انتظار تایید بخشدار',
                    };
                    console.log("Information => ", information)
                    const response = api.post(`${ChangeStateSalaries()}/${information.human_resource_id}`, finallyData, {requiresAuth: true});
                    console.log("Response => ", response);
                    handleClose();
                }} color="primary">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkFlowPopup;