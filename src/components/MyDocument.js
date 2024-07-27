import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Font, Page, StyleSheet, Text, View, PDFViewer } from '@react-pdf/renderer';

// ثبت فونت
Font.register({
    family: 'iranSans',
    src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/IRANSans/ttf/IRANSansWeb_UltraLight.ttf`,
});

// تعریف استایل‌ها
const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 9,
        fontWeight: '100',
        fontFamily: 'iranSans',
        textAlign: 'right',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#fff',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
        borderBottom: '1px solid black',
        paddingBottom: 2,
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
    },
    headerDate: {
        textAlign: 'left',
        fontSize: 9,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderCollapse: 'collapse',
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        backgroundColor: '#EDEDED',
        padding: 2,
        fontWeight: 'bold',
        border: '1px solid #dfdfdf',
        textAlign: 'right',
    },
    tableCol: {
        padding: 1.5,
        border: '1px solid #dfdfdf',
        textAlign: 'right',
        flexWrap: 'nowrap',
    },
    highlightedText: {
        color: 'red',
    },
    highlightedRow: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row-reverse',
    },
    whiteRow: {
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        fontSize: '9px',
    },
    textCenter: {
        textAlign: 'center',
    },
    number: {
        marginRight: 2,
    },
    footer: {
        borderTop: '1px solid black',
        paddingTop: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    greyBackground: {
        backgroundColor: '#EDEDED',
        flexDirection: 'row-reverse'
    },
    centerAlign: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
// کامپوننت‌های کمکی
const Header = ({ title }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);
const NumberedText = ({ number, text }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text>{text} - </Text>
        <Text style={styles.number}>{number}</Text>
    </View>
);

const TableRow = ({ rowStyle, data }) => (
    <View style={[styles.tableRow, rowStyle]}>
        {data.map((col, index) => (
            <View key={index} style={{ flex: col.flex, ...styles.tableCol }}>
                <NumberedText number={col.number} text={col.text} />
            </View>
        ))}
    </View>
);

const Footer = () => (
    <View style={styles.footer}>
        <Text>۱۱:۲۴:۴۱ ۱۴۰۳/۰۳/۱۶ چهارشنبه</Text>
        <Text>سامانه عملکرد دهیاری ها - dehyar.net</Text>
    </View>
);

const MyDocument = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>
                <Header title="قرارداد مدت معین و حکم حقوقی مسئول امور مالی پاره وقت - چهار ساعته" />

                <View style={styles.table}>
                    <TableRow
                        rowStyle={styles.highlightedRow}
                        data={[
                            { flex: 1, text: `استان: ${data.province}`, number: '۱' },
                            { flex: 1, text: `شهرستان: ${data.county}` },
                            { flex: 2, text: `بخش: ${data.section}` },
                            { flex: 1, text: `تعداد دهیاری: ${data.villageCount}` },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.highlightedRow}
                        data={[
                            {
                                flex: 1,
                                text: `دهیاری های طرف قرارداد: ${data.villages}`,
                                number: '۲'
                            }
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            { flex: 3.9, text: `نام و نام خانوادگی : ${data.name}`, number: '۳' },
                            { flex: 1.5, text: `نام پدر : ${data.fatherName}`, number: '۴' },
                            { flex: 2, text: `کد ملی : ${data.nationalId}`, number: '۵' },
                            { flex: 1.8, text: `وضعیت تاهل: ${data.maritalStatus}`, number: '۶' },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            { flex: 1.8, text: `شماره شناسنامه: ${data.idNumber}`, number: '۷' },
                            { flex: 1.5, text: `تاریخ تولد: ${data.birthDate}`, number: '۸' },
                            { flex: 1, text: `جنسیت: ${data.gender}`, number: '۹' },
                            { flex: 1, text: `تعداد فرزندان: ${data.childrenCount}`, number: '۱۰' },
                            { flex: 2, text: `نظام وظیفه: ${data.militaryStatus}`, number: '۱۱' },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            { flex: 1, text: `وضعیت ایثارگری: ${data.isaarStatus}`, number: '۱۲' },
                            { flex: 1, text: `محل تولد: ${data.birthPlace}`, number: '۱۳' },
                            { flex: 1, text: `محل صدور شناسنامه: ${data.issuePlace}`, number: '۱۴' },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            { flex: 1, text: `مدرک تحصیلی: ${data.education}`, number: '۱۵' },
                            { flex: 1.5, text: `رشته تحصیلی: ${data.major}`, number: '۱۶' },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            { flex: 1, text: `تاریخ انتصاب: ${data.appointmentDate}`, number: '۱۷' },
                            { flex: 1, text: `سابقه کار(ماه) : ${data.experience}`, number: '۱۸' },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `مدت این قرارداد: از تاریخ : ${data.contractStartDate} تا تاریخ : ${data.contractEndDate}`,
                                number: '۲۱'
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 6,
                                text: `موضوع قرارداد: ${data.contractSubject}`,
                                number: '۲۲'
                            },
                        ]}
                    />
                    <View style={[styles.tableRow, { flexDirection: 'row-reverse' }]}>
                        <View style={{ flex: 1, ...styles.tableCol, textAlign: 'right', padding: 5 }}>
                            <Text>{data.contractDescription}</Text>

                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.tableRow, styles.greyBackground]}>
                                <View
                                    style={{ flex: 1, ...styles.tableColHeader, ...styles.textCenter, ...styles.centerAlign }}>
                                    <Text>الف- مزد ثابت</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>حقوق مبنا:</Text>
                                        </View>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>{data.baseSalary}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>پایه سنواتی:</Text>
                                        </View>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>{data.yearlyBase}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>فوق‌العاده شغل:</Text>
                                        </View>
                                        <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                            <Text>{data.jobBonus}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.totalFixedWage}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>جمع مزد ثابت:</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.supervisor_benefits}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>حق مسئولیت:</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.married_benifits}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>حق تاهل:</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.familyAllowance}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>ب- کمک هزینه عائله‌مندی(حق اولاد):</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.housingAllowance}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>ج- کمک هزینه مسکن:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.householdAllowance}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>د- کمک هزینه اقلام مصرفی خانوار:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.deprivationBonus}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>ذ- فوق العاده محرومیت از تسهیلات زندگی:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.veteransBonus}</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>ر- فوق العاده ایثارگری:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>جمع حقوق مزایا:</Text>
                                </View>
                                <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                    <Text>{data.totalSalary}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: ` .${data.contractClause1}`,
                                number: "۲۵"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `.${data.contractClause2}`,
                                number: "۲۶"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `.${data.contractClause3}`,
                                number: "۲۷"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `.${data.contractClause4}`,
                                number: "۲۸"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `: تعهدات قرارداد
                                - ${data.commitment1}
                                - ${data.commitment2}
                                - ${data.commitment3}
                                - ${data.commitment4}`,
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `${data.signingNote}`
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: `${data.finalNote}`,
                                number:"۳۱"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={[styles.whiteRow]}
                        data={[
                            { flex: 1, text: `تاریخ اجرای قرارداد: ${data.executionDate}`, number: "۳۲" },
                            { flex: 1, text: `شناسه یکتا : ${data.uniqueId}`, number: "۳۳" },
                            { flex: 1, text: `شماره و تاریخ قرارداد: ${data.contractNumber}`, number: "۳۴" },
                        ]}
                    />
                    <TableRow
                        rowStyle={[styles.whiteRow, { height: 50 }]} // تنظیم ارتفاع مورد نظر به صورت inline
                        data={[
                            {
                                flex: 1,
                                text: 'طرف قرارداد ( امورمالی دهیاری )',
                                subText: `${data.contractorName}`,
                                subTextStyle: styles.textCenter
                            },
                            {
                                flex: 1,
                                text: 'دهیاری منتخب ( پاکل گراب )',
                                subText: `${data.employerName}`,
                                subTextStyle: styles.textCenter
                            },
                            { flex: 1, text: 'بخشدار مرکزی', subText: `${data.centralGovernor}`, subTextStyle: styles.textCenter },
                            {
                                flex: 1,
                                text: 'بخشدار سیوان',
                                subText: `${data.sivanGovernor}`,
                                subTextStyle: styles.textCenter
                            },
                        ]}
                    />

                </View>

                <Footer />
            </View>
        </Page>
    </Document>
);
export default MyDocument;