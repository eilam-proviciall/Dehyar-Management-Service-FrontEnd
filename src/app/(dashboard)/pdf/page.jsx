"use client"
import React from 'react';
import MyDocument from "@components/MyDocument";
import {PDFDownloadLink} from "@react-pdf/renderer";

function Page(props) {
    return (
        <div>
            <h1>PDF Document</h1>
            <PDFDownloadLink document={<MyDocument/>} fileName="somename.pdf">
                {({blob, url, loading, error}) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>

        </div>
    );
}

export default Page;