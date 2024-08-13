import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const EditButtonGroup = ({ onSubmit }) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
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
