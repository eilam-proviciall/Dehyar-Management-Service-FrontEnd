"use client"
import React from 'react';
import EditFromComponent from "@views/dehyari/form/edit/EditFromComponent";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";

function Page(props) {
    const cache = createCache({ key: 'css', prepend: true });

    return (
        <>
            <CacheProvider value={cache}>
            <EditFromComponent />
            </CacheProvider>
        </>
    );
}

export default Page;