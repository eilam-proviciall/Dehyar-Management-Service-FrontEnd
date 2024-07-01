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
                        <Text style={styles.label}>حقوق مبنا:</Text>
                        <Text style={styles.value}>{data.base_salary}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>فوق العاده شغل:</Text>
                        <Text style={styles.value}>{data.job_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>مزایای سرپرستی:</Text>
                        <Text style={styles.value}>{data.supervisor_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>مدرک تحصیلی:</Text>
                        <Text style={styles.value}>{data.study_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>حق اولاد:</Text>
                        <Text style={styles.value}>{data.child_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>فوق العاده محرومیت از تسهیلات زندگی:</Text>
                        <Text style={styles.value}>{data.warzone_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>مزایای مسکن:</Text>
                        <Text style={styles.value}>{data.home_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>کمک هزینه اقلام مصرفی خانوار:</Text>
                        <Text style={styles.value}>{data.food_benefits}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>کمک هزینه عائله مندی:</Text>
                        <Text style={styles.value}>{data.married_benefits || 'ندارد'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>پایه سنواتی:</Text>
                        <Text style={styles.value}>{data.history_benefits || 'ندارد'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>جمع کل:</Text>
                        <Text style={styles.value}>{total}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
