import React from 'react';
import Grid from "@mui/material/Grid";
import Forms from "@views/dehyari/form/Forms";
import Actions from "@views/dehyari/form/Actions";
import { getInvoiceData } from '@/app/server/actions'

async function Page(props) {
    const data = await getInvoiceData()

    return (
        <div>
                    <Forms invoiceData={data}/>

        </div>
    );
}

export default Page;