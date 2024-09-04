import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const EditButtonGroup = ({ onSubmit, onSwitch }) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={onSwitch} // Use the switch handler to hide the form and show the table
                >
                    حکم کارگزینی
                </Button>
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
            </CardContent>
        </Card>
    );
};

export default EditButtonGroup;
