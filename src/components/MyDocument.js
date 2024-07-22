import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

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
const Header = ({title}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);

const NumberedText = ({number, text}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text>{text}-</Text>
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

const Footer = () => (
    <View style={styles.footer}>
        <Text>۱۱:۲۴:۴۱ ۱۴۰۳/۰۳/۱۶ چهارشنبه</Text>
        <Text>سامانه عملکرد دهیاری ها - dehyar.net</Text>
    </View>
);

const MyDocument = () => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>
                <Header title="قرارداد مدت معین و حکم حقوقی مسئول امور مالی پاره وقت - چهار ساعته"/>

                <View style={styles.table}>
                    <TableRow
                        rowStyle={styles.highlightedRow}
                        data={[
                            {flex: 1, text: 'استان: ایلام', number: '۱'},
                            {flex: 1, text: 'شهرستان: ایلام'},
                            {flex: 2, text: 'بخش: مرکزی / سیوان'},
                            {flex: 1, text: 'تعداد دهیاری: ۳'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.highlightedRow}
                        data={[
                            {
                                flex: 1,
                                text: 'دهیاری های تحت پوشش: زیفل / ',
                                subText: 'پاکل گراب / کله کبود /',
                                subTextStyle: styles.highlightedText,
                                number: '۲'
                            }
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 3.9, text: 'نام و نام خانوادگی : کبری جوانمردی', number: '۳'},
                            {flex: 1.5, text: 'نام پدر : کرمرضا', number: '۴'},
                            {flex: 2, text: 'کد ملی : 6340081738', number: '۵'},
                            {flex: 1.8, text: 'وضعیت تاهل: مجرد', number: '۶'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1.8, text: 'شماره شناسنامه: ۶۳۴۰۰۸۱۷۳۸', number: '۷'},
                            {flex: 1.5, text: 'تاریخ تولد: ۱۳۶۵/۰۴/۱۶', number: '۸'},
                            {flex: 1, text: 'جنسیت: زن', number: '۹'},
                            {flex: 1, text: 'تعداد فرزندان:', number: '۱۰'},
                            {flex: 2, text: 'وضعیت نظام وظیفه: ندارد', number: '۱۱'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1, text: 'وضعیت ایثارگری: ندارد', number: '۱۲'},
                            {flex: 1, text: 'محل تولد: ایلام - سیروان', number: '۱۳'},
                            {flex: 1, text: 'محل صدور شناسنامه: ایلام - ایلام', number: '۱۴'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1, text: 'مدرک تحصیلی: کارشناسی ناپیوسته', number: '۱۵'},
                            {flex: 1.5, text: 'رشته تحصیلی: مدیریت بازرگانی', number: '۱۶'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {flex: 1, text: 'تاریخ انتصاب: ۱۳۹۹/۱۰/۰۱', number: '۱۷'},
                            {flex: 1, text: 'سابقه کار(ماه) : ۱۴', number: '۱۸'},
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: 'مدت این قرارداد: از تاریخ : ۱۴۰۲/۰۱/۰۱ تا تاریخ : ۱۴۰۲/۱۲/۲۹',
                                number: '۲۱'
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 6,
                                text: 'موضوع قرارداد: انجام وظایف تعیین شده برای امور مالی در چهار قوانین و مقررات',
                                number: '۲۲'
                            },
                        ]}
                    />

                    <View style={[styles.tableRow, {flexDirection: 'row-reverse'}]}>
                        <View style={{flex: 1, ...styles.tableCol, textAlign: 'right', padding: 5}}>
                            <Text>:دستمزد ماهیانه به شرح زیر تعیین می‌شود</Text>
                            <Text>براساس دستورالعمل نحوه تعیین حقوق و مزایای امور مالی موضوع بخشنامه شماره ۱۶۱۹۸</Text>
                            <Text>مورخ ۱۴۰۲/۰۴/۰۳ سازمان شهرداری ها و دهیاریهای کشور و</Text>
                            <Text>بخشنامه شماره ۱۳۴۵۹۹/ت۵۸۷۵۶ شورا عالی کار حقوق و مزایای</Text>
                            <Text>شما طبق ارقام مندرج در ردیف ۲۳ این حکم تعیین می‌گردد که با</Text>
                            <Text>رعایت قانون و مقررات و پس از کسورات قانونی قابل پرداخت می‌باشد.</Text>
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
                                            <Text>حقوق مبنا:</Text>
                                        </View>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>۲۶,۹۸۳,۷۷۷ ریال</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>پایه سنواتی:</Text>
                                        </View>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>۲,۵۶۵,۵۶۸ ریال</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.tableRow, styles.greyBackground]}>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>فوق‌العاده شغل:</Text>
                                        </View>
                                        <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                            <Text>۲,۴۲۸,۵۳۹ ریال</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۳۱,۹۷۷,۸۸۴ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>جمع مزد ثابت:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۰ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>ب- کمک هزینه عائله‌مندی(حق اولاد):</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۴,۵۰۰,۰۰۰ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>ج- کمک هزینه مسکن:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۵,۵۰۰,۰۰۰ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>د- کمک هزینه اقلام مصرفی خانوار:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۵,۳۹۶,۷۵۵ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>ذ- فوق العاده محرومیت از تسهیلات زندگی:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۰ ریال</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>ر- فوق العاده ایثارگری:</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow]}>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>جمع حقوق مزایا:</Text>
                                </View>
                                <View style={{flex: 1, ...styles.tableCol, ...styles.textCenter}}>
                                    <Text>۴۷,۳۷۴,۶۳۹ ریال</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: ' .طرف قرارداد تابع مقررات،ضوابط و آئین نامه های مربوط به دهیاری ، قانون کار و قانون تامین اجتماعی بوده و از مزایای قوانین مذکور بهره مند می شود',
                                number: "۲۵"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: '.موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد',
                                number: "۲۶"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: '.ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید بخشدار صورت می گیرد',
                                number: "۲۷"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: '.مزایای پایان قرارداد طبق قانون کار و براساس حقوق و دستمزد مندرج در قرارداد از محل اعتبارات دهیاری های بند ۲ طرف قرارداد پرداخت می شود',
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
                                - طرف قرارداد متهعد است مطابق شرح وظایف مندرج در مقررات و ضوابط،نسبت به انجام موضوع قرارداد اقدام کند.
                                - طرف قرارداد اقرار می کند مشمول قانون منع مداخله کارکنان دولت در معالمات دولتی مصوب ۱۳۷۷ نیست .
                                - عقد قرارداد هیچ گونه تعهدی مبنی بر استخدام اعم از رسمی یا پیمانی اعم از سوی دهیاری برای طرف قرارداد ایجاد نمی کند.
                                - طرف قرارداد مسئول حفظ و نگهداری وسایل و اموال در اختیار است و در صورت ایجاد خسارت ،دهیاری می تواند از محل قرارداد خسارت را جبران کند`,
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: 'امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آﺋین نامه استخدامی دهیاری های کشور' +
                                    'می باشد دهیاری پاکل گراب به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می گردد'
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={styles.whiteRow}
                        data={[
                            {
                                flex: 1,
                                text: '.این قرارداد در ۵ نسخه تنظیم و هر نسخه حکم واحد را دارد و پس از امضا و مهر و ثبت معتبر خواهد بود ',
                                number:"۳۱"
                            },
                        ]}
                    />
                    <TableRow
                        rowStyle={[styles.whiteRow]}
                        data={[
                            {flex: 1, text: 'تاریخ اجرای قرارداد: ۱۴۰۲/۰۱/۰۱',number: "۳۲"},
                            {flex: 1, text: 'شناسه یکتا : پیش فرض',number: "۳۳"},
                            {flex: 1, text: 'شماره و تاریخ قرارداد: ۴۰۷ - ۱۴۰۲/۰۴/۲۶',number: "۳۴"},
                        ]}
                    />
                    <TableRow
                        rowStyle={[styles.whiteRow, { height: 50 }]} // تنظیم ارتفاع مورد نظر به صورت inline
                        data={[
                            {
                                flex: 1,
                                text: 'طرف قرارداد ( امورمالی دهیاری )',
                                subText: 'کبری جوانمردی',
                                subTextStyle: styles.textCenter
                            },
                            {
                                flex: 1,
                                text: 'دهیاری کارفرما ( پاکل گراب )',
                                subText: 'نعمت االله نوری',
                                subTextStyle: styles.textCenter
                            },
                            { flex: 1, text: 'بخشدار مرکزی', subText: 'صفیه علی اولاد', subTextStyle: styles.textCenter },
                            {
                                flex: 1,
                                text: 'بخشدار سیوان',
                                subText: 'آزاد شریفی نژاد',
                                subTextStyle: styles.textCenter
                            },
                        ]}
                    />

                </View>

                <Footer/>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
