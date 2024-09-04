import React from 'react';
import { Modal, Backdrop, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; // استفاده از framer-motion

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const HistoryTableModal = ({ open, handleClose }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // تنظیم رنگ تیره با شفافیت 50%
                },
            }}
        >
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                افزودن کاربر
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                این یک مثال از محتویات داخل یک modal است.
                            </Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
};

export default HistoryTableModal;
