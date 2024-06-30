import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Load custom font
Font.register({
    family: 'iranSans',
    src: `${process.env.NEXT_PUBLIC_APP_URL}/fonts/IRANSans/ttf/IRANSans-Regular.ttf`,
});

// Create styles
// Create styles
const styles = StyleSheet.create({
    page: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: 20,
        fontFamily: 'iranSans',
        // direction: 'rtl',
        textAlign: 'right'
    },
    header: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 10
    },
    subHeader: {
        textAlign: 'end',
        fontSize: 10,
        marginBottom: 5
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        margin: 'auto'
    },
    tableRowBg: {
        flexDirection: 'row-reverse',
        display: 'flex',
        backgroundColor: '#ededed'
    },
    tableRow: {
        flexDirection: 'row-reverse',
        display: 'flex'
    },
    tableCol: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        backgroundColor: 'transparent',
        textAlign: 'right'
    },
    tableColFullWidth: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row-reverse',
        borderColor: '#000',
        padding: 5,
        backgroundColor: 'transparent',
        textAlign: 'right'
    },
    tableColHalfWidth: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        backgroundColor: 'transparent',
        textAlign: 'right'
    },
    tableColThirdWidth: {
        width: '33.3%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: 5,
        backgroundColor: 'transparent',
        textAlign: 'right'
    },
    text: {
        fontSize: 10,
        textAlign: 'right'
    },
    boldText: {
        fontSize: 10,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    highlightedText: {
        color: 'red'
    }
})
const MyDocument = () => (
    <Document>
        <Page size='A4' style={styles.page}>
            <Text style={styles.header}>قرارداد مدت معین و حکم حقوقی مسئول امور مالی پاره وقت - چهار ساعته</Text>
            <Text style={styles.subHeader}>چهارشنبه ۱۴۰۳/۰۳/۱۶ ۱۱:۲۴:۴۱</Text>
            <View style={styles.table}>
                <View style={styles.tableRowBg}>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-۱ </Text>
                        <Text style={styles.boldText}>استان: ایلام</Text>۱
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>شهرستان: ایلام</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>بخش: مرکزی / سیوان</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>تعداد دهیاری: ۳</Text>
                    </View>
                </View>
                <View style={styles.tableRowBg}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>-2 </Text>
                        <Text style={styles.boldText}>دهیاری های تحت پوشش: زیفل / پاکل گراب / کله کبود</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-3 </Text>
                        <Text style={styles.boldText}>نام و نام خانوادگی طرف قرارداد: کبری جوانمردی</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-4 </Text>
                        <Text style={styles.boldText}>نام پدر: کرمرضا</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-5 </Text>
                        <Text style={styles.boldText}>کد ملی: ۶۳۴۰۰۸۱۷۳۸</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-6 </Text>
                        <Text style={styles.boldText}>وضعیت تاهل: مجرد</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColThirdWidth}>
                        <Text style={styles.boldText}>-7 </Text>
                        <Text style={styles.boldText}>شماره شناسنامه: ۶۳۴۰۰۸۱۷۳۸</Text>
                    </View>
                    <View style={styles.tableColThirdWidth}>
                        <Text style={styles.boldText}>-8 </Text>
                        <Text style={styles.boldText}>تاریخ تولد: ۱۳۶۵/۰۴/۱۶</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-9 </Text>
                        <Text style={styles.boldText}>جنسیت: زن</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-10 </Text>
                        <Text style={styles.boldText}>تعداد فرزندان:</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-11 </Text>
                        <Text style={styles.boldText}>وضعیت نظام وظیفه: ندارد</Text>
                    </View>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-12 </Text>
                        <Text style={styles.boldText}>وضعیت ایثارگری: ندارد</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-13 </Text>
                        <Text style={styles.boldText}>محل تولد: ایلام -سیروان</Text>
                    </View>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-14 </Text>
                        <Text style={styles.boldText}>محل صدور شناسنامه: ایلام - ایلام</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-15 </Text>
                        <Text style={styles.boldText}>مدرک تحصیلی: کارشناسی ناپیوسته</Text>
                    </View>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-16 </Text>
                        <Text style={styles.boldText}>رشته تحصیلی: مدیریت بازرگانی</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColThirdWidth}>
                        <Text style={styles.boldText}>-17 </Text>
                        <Text style={styles.boldText}>تاریخ انتصاب: ۱۳۹۹/۱۰/۰۱</Text>
                    </View>
                    <View style={styles.tableColThirdWidth}>
                        <Text style={styles.boldText}>-18 </Text>
                        <Text style={styles.boldText}>سابقه کار(ماه): ۱۴</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-19 </Text>
                        <Text style={styles.boldText}>شماره حکم: ۹۷۸/۱۳/ه/گ/م</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-20 </Text>
                        <Text style={styles.boldText}>عنوان سمت: مسئول مالی دهیاری</Text>
                    </View>
                    <View style={styles.tableColHalfWidth}>
                        <Text style={styles.boldText}>-21 </Text>
                        <Text style={styles.boldText}>مدت این قرارداد: از تاریخ: ۱۴۰۲/۰۱/۰۱ تا تاریخ: ۱۴۰۲/۱۲/۲۹</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.boldText}>-22 </Text>
                        <Text style={styles.boldText}>
                            موضوع قرارداد: انجام وظایف تعیین شده برای امور مالی در چهار قوانین و مقررات
                        </Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-23 </Text>
                        <Text style={styles.boldText}>محل اجرا: دهیاری های بند ۲ قرارداد</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { textAlign: 'end', flexDirection: 'column' }]} rowSpan={10}>
                        <Text style={styles.boldText}>-24 </Text>
                        <Text style={styles.boldText}>دستمزد ماهیانه به شرح زیر تعیین میشود:</Text>
                        <Text style={styles.text}>
                            دستمزد ماهیانه به شرح زیر تعیین میشود: برساس دستورالعمل نحوه تعیین حقوق و مزایای امور مالی موضوع بخشنامه
                            شماره ۱۶۱۹۸ مورخ ۱۴۰۲/۰۴/۰۳ سازمان شهرداری ها و دهیاریهای کشور و بخشنامه شماره ۱۳۴۵۹۹/ت۵۸۷۵۶ شورا عالی
                            کار حقوق و مزایای شما طبق ارقام مندرج در ردیف ۲۳ این حکم تعیین می گردد که با رعایت قانون و مقررات و پس
                            از کسورات قانونی قابل پرداخت می باشد.
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#ededed' }}>
                        <View style={styles.tableCol} rowSpan={3}>
                            <Text style={styles.boldText}>الف- مزد ثابت</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>حقوق مبنا:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>۲۶,۹۸۳,۷۷۷ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>پایه سنواتی:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>۲,۵۶۵,۵۶۸ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>فوق العاده شغل:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.boldText}>۲,۴۲۸,۵۳۹ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>جمع مزد ثابت:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۳۱,۹۷۷,۸۸۴ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>ب- کمک هزینه عائله مندی(حق اولاد):</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۰ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>ج- کمک هزینه مسکن:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۴,۵۰۰,۰۰۰ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>د- کمک هزینه اقلام مصرفی خانوار:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۵,۵۰۰,۰۰۰ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>ذ- فوق العاده محرومیت از تسهیلات زندگی:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۵,۳۹۶,۷۵۵ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>ر- فوق العاده ایثارگری:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۰ ریال</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>جمع حقوق مزایا:</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '33.3%' }]}>
                            <Text style={styles.boldText}>۴۷,۳۷۴,۶۳۹ ریال</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>-25 </Text>
                        <Text style={styles.boldText}>
                            طرف قرارداد تابع مقررات،ضوابط و آئین نامه های مربوط به دهیاری ، قانون کار و قانون تامین اجتماعی بوده و
                            از مزایای قوانین مذکور بهره مند می شود.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.boldText}>-26 </Text>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد.</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>-27 </Text>
                        <Text style={styles.boldText}>
                            ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید
                            بخشدار صورت می گیرد.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.boldText}>-28 </Text>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>
                            مزایای پایان قرارداد طبق قانون کار و براساس حقوق و دستمزد مندرج در قرارداد از محل اعتبارات دهیاری های
                            بند ۲ طرف قرارداد پرداخت می شود.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.boldText}>-29 </Text>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>تعهدات قرارداد:</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.text}>
                            - طرف قرارداد متهعد است مطابق شرح وظایف مندرج در مقررات و ضوابط،نسبت به انجام موضوع قرارداد اقدام کند.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.text}>
                            - طرف قرارداد اقرار می کند مشمول قانون منع مداخله کارکنان دولت در معالمات دولتی مصوب ۱۳۷۷ نیست.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.text}>
                            - عقد قرارداد هیچ گونه تعهدی مبنی بر استخدام اعم از رسمی یا پیمانی اعم از سوی دهیاری برای طرف قرارداد
                            ایجاد نمی کند.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.text}>
                            - طرف قرارداد مسئول حفظ و نگهداری وسایل و اموال در اختیار است و در صورت ایجاد خسارت ،دهیاری می تواند از
                            محل قرارداد خسارت را جبران کند.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>-30 </Text>
                        <Text style={styles.boldText}>
                            امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب
                            ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آیین نامه استخدامی دهیاری های کشور مصوب ۱۳۸۳
                            می باشد دهیاری پاکل گراب به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می
                            گردد.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.boldText}>-31 </Text>
                    <View style={styles.tableColFullWidth}>
                        <Text style={styles.boldText}>
                            این قرارداد در ۵ نسخه تنظیم و هر نسخه حکم واحد را دارد و پس از امضا و مهر و ثبت معتبر خواهد بود.
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-32 </Text>
                        <Text style={styles.boldText}>تاریخ اجرای قرارداد: ۱۴۰۲/۰۱/۰۱</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>-33 </Text>
                        <Text style={styles.boldText}> شناسه یکتا: ۱۴۰۰۸۸۱۲۹۳۴</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '50%' }]}>
                        <Text style={styles.boldText}>-34 </Text>

                        <Text style={styles.boldText}>شماره و تاریخ صدور قرارداد: ۴۰۷ - ۱۴۰۲/۰۴/۲۶</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>طرف قرارداد (امورمالی دهیاری)</Text>
                        <Text style={styles.boldText}>کبری جوانمردی</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>دهیاری کارفرما (پاکل گراب)</Text>
                        <Text style={styles.boldText}>نعمت الله نوری</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>بخشدار مرکزی</Text>
                        <Text style={styles.boldText}>صفیه علی اولاد</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.boldText}>بخشدار سیوان</Text>
                        <Text style={styles.boldText}>آزاد شریفی نژاد</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
