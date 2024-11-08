import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
                <p>متن شما اینجا قرار می‌گیرد.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    انصراف
                </Button>
                <Button onClick={() => {
                    handleClose();
                }} color="primary">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkFlowPopup;