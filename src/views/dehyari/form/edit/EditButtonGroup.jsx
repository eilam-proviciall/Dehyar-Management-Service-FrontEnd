import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const EditButtonGroup = ({ onSubmit }) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={() => console.log('sd')}
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
                    style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                        marginTop: '20px',
                    }}
                >
                    ذخیره
                </Button>
            </CardContent>
        </Card>
    );
};

export default EditButtonGroup;
