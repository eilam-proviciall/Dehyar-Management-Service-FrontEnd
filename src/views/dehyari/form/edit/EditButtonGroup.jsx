import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AnimatePresence, motion } from 'framer-motion';

const EditButtonGroup = ({ onSubmit, onSwitch, showTable }) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <AnimatePresence>
                    <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.8 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={showTable ? "primary" : "error"} // تغییر رنگ دکمه
                            startIcon={<PictureAsPdfIcon />}
                            onClick={onSwitch}
                        >
                            {showTable ? "اطلاعات فردی" : "اطلاعات منابع انسانی"} {/* تغییر متن دکمه */}
                        </Button>
                    </motion.div>
                </AnimatePresence>

                {!showTable && ( // دکمه ذخیره فقط زمانی نمایش داده شود که در حالت فرم باشیم
                    <AnimatePresence>
                        <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.8 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={onSubmit}
                            >
                                ذخیره
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                )}
            </CardContent>
        </Card>
    );
};

export default EditButtonGroup;
