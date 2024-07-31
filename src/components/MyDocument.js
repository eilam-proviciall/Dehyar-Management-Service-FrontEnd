import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import moment from "moment-jalaali";
import axios from "axios";
import {getVillageEmployerDetail} from "@/Services/DataService";

// ثبت فونت
Font.register({
    family: 'iranSans',
    src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/IRANSans/ttf/IRANSansXFaNum-Regular.ttf`,
});
moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
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
    tableColHeader: {
        backgroundColor: '#EDEDED',
        padding: 2,
        fontWeight: 'bold',
        border: '1px solid #dfdfdf',
        textAlign: 'right',
    },
    highlightedText: {
        color: 'red',
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
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        padding: 1.5,
        border: '1px solid #dfdfdf',
        textAlign: 'right',
        flexWrap: 'nowrap',
    },
    textCenter: {
        textAlign: 'center',
    },
    justifiedText: {
        textAlign: 'justify',
        padding: 5,
        margin: 5,
        lineHeight: 1.5,
        fontSize: 10,
    },
    highlightedRow: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row-reverse',
    },
    whiteRow: {
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
    },
});
const Header = ({title}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);
const NumberedText = ({number, text}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text>{text} -</Text>
        <Text style={styles.number}>{number}</Text>
    </View>
);

const TableRow = ({rowStyle, data}) => (
    <View style={[styles.tableRow, rowStyle]}>
        {data.map((col, index) => (
            <View key={index} style={{flex: col.flex, ...styles.tableCol}}>
                <NumberedText number={col.number} text={col.text}/>
            </View>
        ))}
    </View>
);
const now = moment();
const formattedDate = now.format('HH:mm:ss jYYYY/jMM/jDD dddd');

const Footer = () => (
    <View style={styles.footer}>
        <Text>{formattedDate}</Text>
        <Text>پنجره واحد سازمان شهرداری ها و دهیاری ها</Text>
    </View>
);
const renderTableRowsByJobTitle = (data, jobTitleId) => {
    if (jobTitleId === 3) {
        return (
            <>
                <TableRow
                    rowStyle={styles.highlightedRow}
                    data={[
                        {flex: 1, text: `استان: ${data.province}`, number: '۱'},
                        {flex: 1, text: `شهرستان: ${data.county}`},
                        {flex: 2, text: `بخش: ${data.section}`},
                        {flex: 1, text: `تعداد دهیاری: ${data.villageCount}`},
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
            </>
        );
    } else if (jobTitleId === 1) {
        if (data.covered_villages.length === 1) {
            return (
                <>
                    <TableRow
                        rowStyle={styles.highlightedRow}
                        data={[
                            {flex: 1, text: `استان: ${data.province}`, number: '۱'},
                            {flex: 1.5, text: `شهرستان: ${data.county}`, number: '۲'},
                            {flex: 1, text: `بخش: ${data.section}`, number: '۳'},
                            {
                                flex: 1.5,
                                text: `دهیاری: ${data.covered_villages[0].village.approved_name}`,
                                number: '۵'
                            },
                            {flex: 1, text: `درجه دهیاری ${data.villageCount}`, number: '۴'},
                        ]}
                    />
                </>
            );
        } else {
            return (
                <>
                    <>
                        <TableRow
                            rowStyle={styles.highlightedRow}
                            data={[
                                {flex: 1, text: `استان: ${data.province}`, number: '۱'},
                                {flex: 1, text: `شهرستان: ${data.county}`},
                                {flex: 2, text: `بخش: ${data.section}`},
                                {flex: 1, text: `تعداد دهیاری: ${data.villageCount}`},
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
                    </>
                </>
            )
        }
    } else {
        return (
            <>
                <Text>نا مشخص</Text>
            </>
        );
    }
};
const renderSignatoriesByJobTitle = (data) => {
    console.log(data.signatureData)
    if (data.job_type_id === 1) {
        return (
            <>
                <View style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: '#ffffff', flexWrap: 'nowrap' }}>
                    <View style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>{`طرف قرارداد`}</Text>
                        <Text style={{ fontSize: 8 }}>{data.name}</Text>
                    </View>
                    <View style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>{`مسئول امور مالی`}</Text>
                        <Text style={{ fontSize: 8 }}>{data.signatureData.financial_responsible.full_name}</Text>
                    </View>
                    <View style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>{`بخشدار مرکزی`}</Text>
                        <Text style={{ fontSize: 8 }}>{data.signatureData.goverment.full_name}</Text>
                    </View>
                </View>
            </>
        );
    } else if (data.job_type_id === 2 || data.job_type_id === 3) {
        return (
            <>
                <View style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: '#ffffff', flexWrap: 'nowrap' }}>
                    {data.signatureData.covered_villages.map((region, index) => (
                        <View key={index} style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}> {` بخشدار ${region.region_name}`}</Text>
                            <Text style={{ fontSize: 8 }}>{region.bakhshdar.full_name}</Text>
                        </View>
                    ))}
                    <View style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>{`طرف قرارداد`}</Text>
                        <Text style={{ fontSize: 8 }}>{data.name}</Text>
                    </View>
                    <View style={{ flex: 1, padding: 10, border: '1px solid #dfdfdf', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>{`دهیاری منتخب`}</Text>
                        <Text style={{ fontSize: 8 }}>{data.signatureData.village_employer.full_name}</Text>
                    </View>

                </View>
            </>
        );
    }
};
const renderRemainDay = (contract_type,data) => {
     if (contract_type == 1){
         return (
             <>
                 <View style={[styles.tableRow]}>
                     <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                         <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                             <Text style={{marginRight: 4}}>ریال</Text>
                             <Text>{data.remainDay}</Text>
                         </View>
                     </View>
                     <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                         <Text>:مابه التفاوت روز های کارکرد</Text>
                     </View>
                 </View>
             </>
         )
     }
}
const MyDocument = ({data}) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>
                <Header title={`قرارداد مدت معین و حکم حقوقی ${data.job_name} ${data.contract_type}`}/>

                <View style={styles.table}>
                    {renderTableRowsByJobTitle(data, data.job_type_id)}
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 3.9, text: `نام و نام خانوادگی : ${data.name}`, number: '۳'},
                            {flex: 1.5, text: `نام پدر : ${data.fatherName}`, number: '۴'},
                            {flex: 2, text: `کد ملی : ${data.nationalId}`, number: '۵'},
                            {flex: 1.8, text: `وضعیت تاهل: ${data.maritalStatus}`, number: '۶'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1.8, text: `شماره شناسنامه: ${data.idNumber}`, number: '۷'},
                            {flex: 1.5, text: `تاریخ تولد: ${data.birthDate}`, number: '۸'},
                            {flex: 1, text: `جنسیت: ${data.gender}`, number: '۹'},
                            {flex: 1, text: `تعداد فرزندان: ${data.childrenCount}`, number: '۱۰'},
                            {flex: 2, text: `نظام وظیفه: ${data.militaryStatus}`, number: '۱۱'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1, text: `وضعیت ایثارگری: ${data.isaarStatus}`, number: '۱۲'},
                            {flex: 1, text: `محل تولد: ${data.birthPlace}`, number: '۱۳'},
                            {flex: 1, text: `محل صدور شناسنامه: ${data.issuePlace}`, number: '۱۴'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1, text: `مدرک تحصیلی: ${data.education}`, number: '۱۵'},
                            {flex: 1.5, text: `رشته تحصیلی: ${data.major}`, number: '۱۶'},
                            {flex: 1, text: `تاریخ انتصاب: ${data.appointmentDate}`, number: '۱۷'},
                            {flex: 1, text: `سابقه کار(ماه) : ${data.experience}`, number: '۱۸'},

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
                    <View style={[styles.tableRow, {flexDirection: 'row-reverse'}]}>
                        <View style={{
                            flex: 1,
                            padding: 10,
                            margin: 10,
                            lineHeight: 2,
                            direction: 'rtl',
                            textAlign: 'justify'
                        }}>
                            <Text style={{
                                textAlign: 'justify',
                                direction: 'rtl',
                                writingDirection: 'rtl'
                            }}>{data.contractDescription}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={[styles.tableRow, styles.greyBackground]}>
                                <View
                                    style={{flex: 1, ...styles.tableColHeader, ...styles.textCenter, ...styles.centerAlign}}>
                                    <Text>الف- مزد ثابت</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>:حقوق مبنا</Text>
                                        </View>
                                        <View style={{
                                            flex: 1, ...styles.tableCol, ...styles.textCenter,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Text style={{marginRight: 4}}>ریال</Text>
                                            <Text>{data.baseSalary}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>:پایه سنواتی</Text>
                                        </View>
                                        <View style={{
                                            flex: 1, ...styles.tableCol, ...styles.textCenter,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Text style={{marginRight: 4}}>ریال</Text>
                                            <Text>{data.yearlyBase}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>:فوق‌العاده شغل</Text>
                                        </View>
                                        <View style={{
                                            flex: 1, ...styles.tableCol, ...styles.textCenter,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Text style={{marginRight: 4}}>ریال</Text>
                                            <Text>{data.jobBonus}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>:مزایای سرپرستی</Text>
                                        </View>
                                        <View style={{
                                            flex: 1, ...styles.tableCol, ...styles.textCenter,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Text style={{marginRight: 4}}>ریال</Text>
                                            <Text>{data.supervisor_benefits}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.totalFixedWage}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:جمع مزد ثابت</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.married_benifits}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:حق تاهل</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.familyAllowance}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:کمک هزینه عائله‌مندی(حق اولاد)</Text>
                                </View>
                            </View>
                            {renderRemainDay(data.contract_type,data)}
                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.housingAllowance}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:کمک هزینه مسکن</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.householdAllowance}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:کمک هزینه اقلام مصرفی خانوار</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.deprivationBonus}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:فوق العاده محرومیت از تسهیلات زندگی</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.veteransBonus}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:فوق العاده ایثارگری</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Text style={{marginRight: 4}}>ریال</Text>
                                        <Text>{data.totalSalary}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2.130, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>:جمع حقوق مزایا</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 2,
                                text: `${data.contractClause1}`,
                                number: "۲۵",
                                style: {
                                    flexDirection: 'row',
                                    padding: '5px',
                                    marginLeft: '20px' // اضافه کردن فاصله برای جلوگیری از رفتن متن داخل عدد
                                }
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
                                text: `: تعهدات قرارداد \n${data.commitment1}\n ${data.commitment2}\n ${data.commitment3}\n ${data.commitment4}`,
                                style: {
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    padding: '5px',
                                    width: '100%',
                                    whiteSpace: 'pre-wrap',
                                }
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
                                number: "۳۱"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={[styles.whiteRow]}
                        data={[
                            {flex: 1, text: `تاریخ اجرای قرارداد: ${data.executionDate}`, number: "۳۲"},
                            {flex: 1, text: `شناسه یکتا : ${data.uniqueId}`, number: "۳۳"},
                            {flex: 1, text: `شماره و تاریخ قرارداد: ${data.contractNumber}`, number: "۳۴"},
                        ]}
                    />
                    {renderSignatoriesByJobTitle(data)}

                </View>

                <Footer/>
            </View>
        </Page>
    </Document>
);
export default MyDocument;