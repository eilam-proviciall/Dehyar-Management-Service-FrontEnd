import React from 'react';
import { Document, Page, Text, StyleSheet, Font, View } from '@react-pdf/renderer';

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

const MyDocument = ({ data }) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <Text style={styles.header}>اطلاعات حقوق</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>شناسه:</Text>
                    <Text style={styles.value}>{data.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>منبع انسانی:</Text>
                    <Text style={styles.value}>{data.human_resource}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>آخرین مدرک:</Text>
                    <Text style={styles.value}>{data.last_degree}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>پایه حقوق:</Text>
                    <Text style={styles.value}>{data.base_salary}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای شغلی:</Text>
                    <Text style={styles.value}>{data.job_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای سرپرستی:</Text>
                    <Text style={styles.value}>{data.supervisor_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای تحصیلی:</Text>
                    <Text style={styles.value}>{data.study_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای مناطق جنگی:</Text>
                    <Text style={styles.value}>{data.warzone_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای خانه:</Text>
                    <Text style={styles.value}>{data.home_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای غذا:</Text>
                    <Text style={styles.value}>{data.food_benefits}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای ازدواج:</Text>
                    <Text style={styles.value}>{data.married_benefits || 'ندارد'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>مزایای سابقه:</Text>
                    <Text style={styles.value}>{data.history_benefits || 'ندارد'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>تاریخ ایجاد:</Text>
                    <Text style={styles.value}>{data.created_at}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>تاریخ بروزرسانی:</Text>
                    <Text style={styles.value}>{data.updated_at}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
