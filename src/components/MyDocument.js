import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Load custom font
Font.register({
    family: 'iranSans',
    src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/IRANSans/ttf/IRANSans-Regular.ttf`,
});

// Create styles
const styles = StyleSheet.create({
    page: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: 20,
        fontFamily: 'iranSans',
        textAlign: 'right'
    },
    header: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    section: {
        margin: 10,
        padding: 10,
        border: '1px solid #ccc'
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 12,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row-reverse',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5
    }
});

const MyDocument = ({ data }) => {
    const total = [
        data.base_salary,
        data.job_benefits,
        data.supervisor_benefits,
        data.study_benefits,
        data.child_benefits,
        data.warzone_benefits,
        data.home_benefits,
        data.food_benefits,
        data.married_benefits,
        data.history_benefits
    ].reduce((acc, val) => acc + (val || 0), 0);

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <Text style={styles.header}>اطلاعات حقوق</Text>

            </Page>
        </Document>
    );
};

export default MyDocument;
