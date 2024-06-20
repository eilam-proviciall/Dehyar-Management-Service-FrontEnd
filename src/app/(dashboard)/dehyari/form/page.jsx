import React from 'react';
import Forms from "@views/dehyari/form/Forms";
import {getInvoiceData} from '@/app/server/actions'

async function Page(props) {
    const data = await getInvoiceData()

    return (
        <div>
            <Forms invoiceData={data}/>
        </div>
    );
}

export default Page;