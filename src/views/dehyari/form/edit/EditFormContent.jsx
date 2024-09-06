import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import EditStepPersonalDetails from './EditStepPersonalDetails';
import EditStepEducation from './EditStepEducation';
import PhoneNumberStepContact from './PhoneNumberStepContact';

const EditFormContent = ({  validationSchemas }) => (
    <Card>
        <CardContent className='sm:!p-12'>
            <Grid container spacing={6}>
                <EditStepPersonalDetails  validation={validationSchemas}/>
                <EditStepEducation validation={validationSchemas}/>
                <PhoneNumberStepContact validation={validationSchemas}/>
            </Grid>
        </CardContent>
    </Card>
);

export default EditFormContent;
