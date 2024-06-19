import React from 'react';
import Grid from "@mui/material/Grid";
import Forms from "@views/dehyari/form/Forms";
import Actions from "@views/dehyari/form/Actions";
import { getInvoiceData } from '@/app/server/actions'

async function Page(props) {
    const data = await getInvoiceData()

    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12} md={9}>
                    <Forms invoiceData={data}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    {/*<Actions/>*/}
                </Grid>
            </Grid>
        </div>
    );
}

export default Page;