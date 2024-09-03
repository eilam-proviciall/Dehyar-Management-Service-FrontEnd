// React Imports
import DividerSimple from '@/components/common/Divider/DividerSimple'
import { Grid } from '@mui/material'
import React from 'react'

const StepBasicInformation = ({data,setData}) => {
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <DividerSimple title={data.organization_type} />
            </Grid>
        </Grid>
    )
}

export default StepBasicInformation