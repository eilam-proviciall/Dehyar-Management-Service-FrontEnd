import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

Font.register({
    family: 'iranSans',
    src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/IRANSans/ttf/IRANSans-Regular.ttf`,
});
// تعریف استایل‌ها
const styles = StyleSheet.create({
    page: {
        padding: 15,
        fontSize: 11,
        fontFamily: 'iranSans',
        textAlign: 'right',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid black',
        paddingBottom: 5,
        marginBottom: 5,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
    textEnd: {
        textAlign: 'end',
    },
    borderBox: {
        border: '1px solid #dfdfdf',
        backgroundColor: '#ededed',
        padding: 5,
    },
    border: {
        border: '1px solid #dfdfdf',
        padding: 5,
    },
    tableCell: {
        padding: 5,
        fontSize: 11,
    },
    footer: {
        borderTop: '1px solid black',
        paddingTop: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        borderBottom: '1px solid black',
        paddingBottom: 5,
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
    headerDate: {
        textAlign: 'left',
        fontSize: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderCollapse: 'collapse',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        backgroundColor: '#EDEDED',
        padding: 5,
        fontWeight: 'bold',
        border: '1px solid #dfdfdf',
        textAlign: 'right',
    },
    tableCol: {
        marginTop: 0,
        padding: 5,
        border: '1px solid #dfdfdf',
        textAlign: 'right',
        flexWrap: 'nowrap',
    },
    highlightedText: {
        color: 'red',
    },
    highlightedRow: {
        backgroundColor: '#f0f0f0',
        marginTop: 5,
        flexDirection: 'row-reverse',
        padding: 0,
        margin: 0,
        flexWrap: 'nowrap',

    },
    whiteRow: {
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        fontSize: "10.5px"
    },
    noWrapText: {
        whiteSpace: 'nowrap',
        flexShrink: 1,
    },
    numberText: {
        marginLeft: 2,
        textAlign: 'right',
    },
    textContainer: {
        flex: 1,
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

const MyDocument = () => {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>
                            قرارداد مدت معین و حکم حقوقی مسئول امور مالی پاره وقت - چهار ساعته
                        </Text>
                        <Text style={styles.headerDate}>
                            ۱۱:۲۴:۴۱ ۱۴۰۳/۰۳/۱۶ چهارشنبه
                        </Text>
                    </View>

                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.highlightedRow]}>
                            <View style={{flex: 1, ...styles.tableColHeader}}>
                                <Text>۱ -استان: ایلام</Text>
                            </View>
                            <View style={{flex: 1, ...styles.tableColHeader}}>
                                <Text>شهرستان: ایلام</Text>
                            </View>
                            <View style={{flex: 2, ...styles.tableColHeader}}>
                                <Text>بخش: مرکزی / سیوان</Text>
                            </View>
                            <View style={{flex: 1, ...styles.tableColHeader}}>
                                <Text>تعداد دهیاری: ۳</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.highlightedRow]}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>۲ -دهیاری های تحت پوشش: زیفل / <Text style={styles.highlightedText}>پاکل
                                    گراب</Text> / کله کبود /</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 3.9, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>نام و نام خانوادگی طرف قرارداد : کبری جوانمردی</Text>
                                <Text style={{ marginLeft: -1 }}>-3</Text>
                            </View>
                            <View style={{ flex: 1.5, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>نام پدر : کرمرضا</Text>
                                <Text style={{ marginLeft: -1 }}>-4</Text>
                            </View>
                            <View style={{ flex: 2, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>کد ملی : 6340081738</Text>
                                <Text style={{ marginLeft: -1 }}>-5</Text>
                            </View>
                            <View style={{ flex: 1.8, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>وضعیت تاهل: مجرد</Text>
                                <Text style={{ marginLeft: -1 }}>-6</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 2, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>ﺷﻤﺎره ﺷﻨﺎﺳﻨﺎﻣﻪ: ۶۳۴۰۰۸۱۷۳۸</Text>
                                <Text style={{ marginLeft: -1 }}>-7</Text>
                            </View>
                            <View style={{ flex: 1.8, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>ﺗﺎرﯾﺦ ﺗﻮﻟﺪ: ۱۳۶۵/۰۴/۱۶</Text>
                                <Text style={{ marginLeft: -1 }}>-8</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>ﺟﻨﺴﯿﺖ: زن</Text>
                                <Text style={{ marginLeft: -1 }}>-9</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text>ﺗﻌﺪاد ﻓﺮزﻧﺪان:</Text>
                                <Text style={{ marginLeft: -1 }}>-10</Text>
                            </View>
                        </View>


                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> وضعیت نظام وظیفه: ندارد</Text>
                                <Text style={{ marginLeft: 2 }}>-11</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ marginLeft: 2 }}>-12</Text>
                                <Text> وضعیت ایثارگری: ندارد</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> محل تولد: ایلام - سیروان</Text>
                                <Text style={{ marginLeft: 2 }}>-13</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> محل صدور شناسنامه: ایلام - ایلام</Text>
                                <Text style={{ marginLeft: 2 }}>-14</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> مدرک تحصیلی: کارشناسی ناپیوسته</Text>
                                <Text style={{ marginLeft: 2 }}>-15</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> رشته تحصیلی: مدیریت بازرگانی</Text>
                                <Text style={{ marginLeft: 2 }}>-16</Text>
                            </View>
                        </View>



                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> تاریخ انتصاب: ۱۳۹۹/۱۰/۰۱</Text>
                                <Text style={{ marginLeft: 2 }}>-17</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> سابقه کار(ماه) : ۱۴</Text>
                                <Text style={{ marginLeft: 2 }}>-18</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> شماره حکم : ۹۷۸/۱۳/ه/گ/م</Text>
                                <Text style={{ marginLeft: 2 }}>-19</Text>
                            </View>
                        </View>
                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> عنوان سمت: مسئول مالی دهیاری</Text>
                                <Text style={{ marginLeft: 2 }}>-20</Text>
                            </View>
                            <View style={{ flex: 1, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> مدت این قرارداد: از تاریخ : ۱۴۰۲/۰۱/۰۱ تا تاریخ : ۱۴۰۲/۱۲/۲۹</Text>
                                <Text style={{ marginLeft: 2 }}>-21</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.whiteRow]}>
                            <View style={{ flex: 6, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> موضوع قرارداد: انجام وظایف تعیین شده برای امور مالی در چهار قوانین و مقررات</Text>
                                <Text style={{ marginLeft: 2 }}>-22</Text>
                            </View>
                            <View style={{ flex: 2, ...styles.tableCol, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text> محل اجرا : دهیاری های بند 2 قرارداد</Text>
                                {/*<Text style={{ marginLeft: 2 }}>-23</Text>*/}
                            </View>
                        </View>


                        <View style={[styles.tableRow, { flexDirection: 'row-reverse' }]}>
                            <View style={{ flex: 1, ...styles.tableCol, textAlign: 'right', padding: 5 }}>
                                <Text>۲۴- دستمزد ماهیانه به شرح زیر تعیین می‌شود: </Text>
                                <Text>دستمزد ماهیانه به شرح زیر تعیین می‌شود :</Text>
                                <Text>براساس دستورالعمل نحوه تعیین حقوق و مزایای امور مالی موضوع بخشنامه شماره ۱۶۱۹۸</Text>
                                <Text>مورخ ۱۴۰۲/۰۴/۰۳ سازمان شهرداری ها و دهیاریهای کشور و</Text>
                                <Text>بخشنامه شماره ۱۳۴۵۹۹/ت۵۸۷۵۶ شورا عالی کار حقوق و مزایای</Text>
                                <Text>شما طبق ارقام مندرج در ردیف ۲۳ این حکم تعیین می‌گردد که با</Text>
                                <Text>رعایت قانون و مقررات و پس از کسورات قانونی قابل پرداخت می‌باشد.</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.tableRow, styles.greyBackground]}>
                                    <View style={{ flex: 1, ...styles.tableColHeader, ...styles.textCenter, ...styles.centerAlign }}>
                                        <Text>الف- مزد ثابت</Text>
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <View style={[styles.tableRow, styles.greyBackground]}>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>حقوق مبنا:</Text>
                                            </View>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>۲۶,۹۸۳,۷۷۷ ریال</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.tableRow, styles.greyBackground]}>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>پایه سنواتی:</Text>
                                            </View>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>۲,۵۶۵,۵۶۸ ریال</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.tableRow, styles.greyBackground]}>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>ﻓﻮق اﻟﻌﺎده ﺷﻐﻞ:</Text>
                                            </View>
                                            <View style={{ flex: 1, ...styles.tableCol, ...styles.textCenter }}>
                                                <Text>۲,۴۲۸,۵۳۹ ریال</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>ب- کمک ﻫﺰﯾﻨﻪ ﻋﺎﺋﻠﻪ ﻣﻨﺪی(ﺣﻖ اوﻻد):</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۰ رﯾﺎل</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>ج- کمک ﻫﺰﯾﻨﻪ مسکن:</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۴,۵۰۰,۰۰۰ رﯾﺎل</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>د- کمک ﻫﺰﯾﻨﻪ اﻗﻼم مصرفی ﺧﺎﻧﻮار:</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۵,۵۰۰,۰۰۰ رﯾﺎل</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>ذ- ﻓﻮق اﻟﻌﺎده ﻣﺤﺮوﻣﯿﺖ از ﺗﺴﻬﯿﻼت زﻧﺪگی:</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۵,۳۹۶,۷۵۵ رﯾﺎل</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>ر- ﻓﻮق اﻟﻌﺎده ایثارگری:</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۰ رﯾﺎل</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderBottom: '1px solid #dfdfdf', paddingBottom: 5 }}>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>جمع حقوق مزایا:</Text>
                                    </View>
                                    <View style={{ flex: 1, ...styles.tableCol, textAlign: 'center' }}>
                                        <Text>۴۷,۳۷۴,۶۳۹ رﯾﺎل</Text>
                                    </View>
                                </View>
                            </View>
                        </View>




                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۲۵- ﻃﺮف ﻗﺮارداد ﺗﺎﺑﻊ ﻣﻘﺮرات،ﺿﻮاﺑﻂ و آﺋﯿﻦ ﻧﺎﻣﻪ ﻫﺎی ﻣﺮﺑﻮط ﺑﻪ دﻫﯿﺎری ، ﻗﺎﻧﻮن کار و
                                    ﻗﺎﻧﻮن ﺗﺎﻣﯿﻦ اﺟﺘﻤﺎﻋی ﺑﻮده و از ﻣﺰاﯾﺎی ﻗﻮاﻧﯿﻦ ﻣﺬکﻮر ﺑﻬﺮه ﻣﻨﺪ می ﺷﻮد.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۲۶ - ﻣﻮارد ﺧﺎﺗﻤﻪ کﺎر ﻃﺮف ﻗﺮارداد ﺑﻪ اﺳﺘﻨﺎد ﻣﺎده ۲۱ ﻗﺎﻧﻮن کﺎر ﻣی ﺑﺎﺷﺪ.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۲۷- ﻣﺎﻣﻮرﯾﺖ و ﻣﺮﺧﺼی اﻣﻮرﻣﺎﻟی دﻫﯿﺎری ﺑﻪ اﺳﺘﻨﺎد اﺻﻼﺣﯿﻪ ﻣﺎده ۱۲ آﺋﯿﻦ ﻧﺎﻣﻪ اﺳﺘﺨﺪاﻣی
                                    دﻫﯿﺎری ﻫﺎی کﺸﻮر ﺑﺎ تایید ﺑﺨﺸﺪار ﺻﻮرت ﻣی گﯿﺮد.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۲۸ - ﻣﺰاﯾﺎی پﺎﯾﺎن ﻗﺮارداد ﻃﺒﻖ ﻗﺎﻧﻮن کﺎر و ﺑﺮاﺳﺎس ﺣﻘﻮق و دﺳﺘﻤﺰد ﻣﻨﺪرج در ﻗﺮارداد از
                                    ﻣﺤﻞ اﻋﺘﺒﺎرات دﻫﯿﺎری ﻫﺎی ﺑﻨﺪ ۲ ﻃﺮف ﻗﺮارداد پﺮداﺧﺖ ﻣی ﺷﻮد.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    <Text style={styles.textCenter}>۲۹ - ﺗﻌﻬﺪات ﻗﺮارداد:</Text>
                                    - ﻃﺮف ﻗﺮارداد ﻣﺘﻬﻌﺪ اﺳﺖ ﻣﻄﺎﺑﻖ ﺷﺮح وﻇﺎﯾﻒ ﻣﻨﺪرج در ﻣﻘﺮرات و ﺿﻮاﺑﻂ،ﻧﺴﺒﺖ ﺑﻪ اﻧﺠﺎم ﻣﻮﺿﻮع
                                    ﻗﺮارداد اﻗﺪام کﻨﺪ.
                                    - ﻃﺮف ﻗﺮارداد اﻗﺮار ﻣی کﻨﺪ ﻣﺸﻤﻮل ﻗﺎﻧﻮن ﻣﻨﻊ ﻣﺪاﺧﻠﻪ کﺎرکﻨﺎن دوﻟﺖ در ﻣﻌﺎﻟﻤﺎت دوﻟﺘی ﻣﺼﻮب
                                    ۱۳۷۷ ﻧﯿﺴﺖ .
                                    - ﻋﻘﺪ ﻗﺮارداد ﻫﯿﭽﮕﻮﻧﻪ ﺗﻌﻬﺪی ﻣﺒﻨﯽ ﺑﺮ اﺳﺘﺨﺪام اﻋﻢ از رﺳﻤﯽ ﯾﺎ پﯿﻤﺎﻧﯽ اﻋﻢ از ﺳﻮی دﻫﯿﺎری
                                    ﺑﺮای ﻃﺮف ﻗﺮارداد اﯾﺠﺎد ﻧﻤی کﻨﺪ.
                                    - ﻃﺮف ﻗﺮارداد ﻣﺴﺌﻮل ﺣﻔﻆ و نگهداری وﺳﺎﯾﻞ و اﻣﻮال در اﺧﺘﯿﺎر اﺳﺖ و در ﺻﻮرت اﯾﺠﺎد ﺧﺴﺎرت
                                    ،دﻫﯿﺎری ﻣی ﺗﻮاﻧﺪ از ﻣﺤﻞ ﻗﺮارداد ﺧﺴﺎرت را ﺟﺒﺮان کﻨﺪ
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۳۰- اﻣﻀﺎی ذﯾﻞ اﯾﻦ ﻗﺮارداد از ﺳﻮی ﺑﺨﺸﺪار ﺻﺮﻓﺎ ﺟﻬﺖ اﺟﺮای ﻣﺎده ۱۶ اﺳﺎﺳﻨﺎﻣﻪ ، ﺗﺴﻬﯿﻼت و
                                    ﺳﺎزﻣﺎن دﻫﯿﺎری ﻫﺎ ﻣﺼﻮب ۱۳۸۰ و اﻣﻀﺎی ﻣﺴﺌﻮل اﻣﻮرﻣﺎﻟی دﻫﯿﺎری دﻫﯿﺎری ﺑﻪ اﺳﺘﻨﺎد ﻣﺎده ۱۱
                                    آﻦ ﻧﺎﻣﻪ اﺳﺘﺨﺪاﻣی دﻫﯿﺎری ﻫﺎی کﺸﻮر ﻣی ﺑﺎﺷﺪ دﻫﯿﺎری پﺎکﻞ گﺮاب ﺑﻪ ﻧﻤﺎﯾﻨﺪگی از دﻫﯿﺎری ﻫﺎی
                                    ﺑﻨﺪ ۲ اﯾﻦ ﻗﺮارداد ﺑﻪ ﻋﻨﻮان دﻫﯿﺎری کﺎرﻓﺮﻣﺎ ﺗﻌﻦ ﻣی گﺮدد.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>
                                    ۳۱- اﯾﻦ ﻗﺮارداد در ۵ ﻧﺴﺨﻪ ﺗﻨﻈﯿﻢ و ﻫﺮ ﻧﺴﺨﻪ ﺣکﻢ واﺣﺪ را دارد و پﺲ از اﻣﻀﺎ و ﻣﻬﺮ و ﺛﺒﺖ
                                    ﻣﻌﺘﺒﺮ ﺧﻮاﻫﺪ ﺑﻮد.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>۳۲- ﺗﺎرﯾﺦ اﺟﺮای ﻗﺮارداد: ۱۴۰۲/۰۱/۰۱</Text>
                            </View>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>۳۳- ﺷﻨﺎﺳﻪ یکتا : ۱۴۰۰۸۸۱۲۹۳۴</Text>
                            </View>
                            <View style={{flex: 1, ...styles.tableCol}}>
                                <Text>۳۴- ﺷﻤﺎره و ﺗﺎرﯾﺦ ﺻﺪور ﻗﺮارداد: ۴۰۷ - ۱۴۰۲/۰۴/۲۶</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCol, {flex: 1, textAlign: 'center'}]}>
                                <Text>ﻃﺮف ﻗﺮارداد ( امورمالی دﻫﯿﺎری )</Text>
                                <Text>کﺒﺮی ﺟﻮاﻧﻤﺮدی</Text>
                            </View>
                            <View style={[styles.tableCol, {flex: 1, textAlign: 'center'}]}>
                                <Text>دﻫﯿﺎری کارفرما ( پاکل گراب )</Text>
                                <Text>ﻧﻌﻤﺖ اﷲ ﻧﻮری</Text>
                            </View>
                            <View style={[styles.tableCol, {flex: 1, textAlign: 'center'}]}>
                                <Text>ﺑﺨﺸﺪار مرکزی</Text>
                                <Text>ﺻﻔﯿﻪ علی اوﻻد</Text>
                            </View>
                            <View style={[styles.tableCol, {flex: 1, textAlign: 'center'}]}>
                                <Text>ﺑﺨﺸﺪار ﺳﯿﻮان</Text>
                                <Text>آزاد شریفی ﻧژاد</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text>ﺻﻔﺤﻪ ١</Text>
                        <Text>ﺳﺎﻣﺎﻧﻪ ﻋﻤﻠکﺮد دﻫﯿﺎری ﻫﺎ - dehyar.net</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
