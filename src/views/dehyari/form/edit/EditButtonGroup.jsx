import React from 'react';
import {Button, Card, CardContent} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {AnimatePresence, motion} from 'framer-motion'; // Import Framer Motion and AnimatePresence

const EditButtonGroup = ({onSubmit, onSwitch}) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <AnimatePresence>
                    <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 0.8}}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            startIcon={<PictureAsPdfIcon/>}
                            onClick={onSwitch} // Use the switch handler to hide the form and show the table
                        >
                            حکم کارگزینی
                        </Button>
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 0.8}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon/>}
                            onClick={onSubmit}
                        >
                            ذخیره
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};

export default EditButtonGroup;
