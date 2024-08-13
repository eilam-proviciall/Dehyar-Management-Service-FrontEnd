import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import EditStepPersonalDetails from './EditStepPersonalDetails';
import EditStepEducation from './EditStepEducation';
import EditStepInsurance from './EditStepInsurance';

const EditFormContent = ({  validationSchemas }) => (
    <Card>
        <CardContent className='sm:!p-12'>
            <Grid container spacing={6}>
                <EditStepPersonalDetails  validation={validationSchemas}/>
                <EditStepEducation validation={validationSchemas}/>
                <EditStepInsurance validation={validationSchemas}/>
            </Grid>
        </CardContent>
    </Card>
);

export default EditFormContent;
