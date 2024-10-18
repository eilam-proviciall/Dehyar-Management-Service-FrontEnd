import {Card, CardContent, Grid} from '@mui/material';

import validationSchemas from './validationSchemas';
import StepPersonalDetails from "@views/dehyari/form/StepsForm/StepPersonalDetails";
import StepEducation from "@views/dehyari/form/StepsForm/StepEducation";
import StepInsurance from "@views/dehyari/form/StepsForm/StepInsurance";
import StepChildren from "@views/dehyari/form/StepsForm/StepChildren";
import StepContract from "@views/dehyari/form/StepsForm/StepContract";
import StepJobDetails from "@views/dehyari/form/StepsForm/JobDetails/StepJobDetails";

const FormContent = ({invoiceData}) => (
    <Card>
        <CardContent className='sm:!p-12'>
            <Grid container spacing={6} gap={2}>
                {/*<StepJobDetails invoiceData={invoiceData} validation={validationSchemas.jobDetails} />*/}
                <StepPersonalDetails validation={validationSchemas.personalDetails}/>
                <StepEducation validation={validationSchemas.education}/>
                {/*<StepInsurance validation={validationSchemas.insurance} />*/}
                <StepChildren validation={validationSchemas.children}/>
                {/*<StepContract validation={validationSchemas.contract} />*/}
            </Grid>
        </CardContent>
    </Card>
);

export default FormContent;
