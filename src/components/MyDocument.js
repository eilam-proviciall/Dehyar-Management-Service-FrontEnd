import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Load custom font from Google Fonts
Font.register({ family: "iranSans", src: "./iranSans.ttf" });


// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 10,
        fontFamily: 'iranSans',
        // direction: 'rtl'
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        borderCollapse: 'collapse',
        margin: 'auto'
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCol: {
        width: '16.6%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        backgroundColor: '#ededed',
        textAlign: 'right'
    },
    text: {
        fontSize: 11,
        textAlign: 'right'
    }
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.text}>۱- استان: ایلام</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>شهرستان: ایلام</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>بخش: مرکزی / سیوان</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>تعداد دهیاری: ۳</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲- دهیاری های تحت پوشش: زیفل / پاکل گراب / کله کبود</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۳- نام و نام خانوادگی طرف قرارداد: کبری جوانمردی</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۴- نام پدر: کرمرضا</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۵- کد ملی: ۶۳۴۰۰۸۱۷۳۸</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۶- وضعیت تاهل: مجرد</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.text}>۷- شماره شناسنامه: ۶۳۴۰۰۸۱۷۳۸</Text></View>
                    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.text}>۸- تاریخ تولد: ۱۳۶۵/۰۴/۱۶</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۹- جنسیت: زن</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۱۰- تعداد فرزندان: </Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۱- وضعیت نظام وظیفه: ندارد</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۲- وضعیت ایثارگری: ندارد</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۳- محل تولد: ایلام -سیروان</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۴- محل صدور شناسنامه: ایلام - ایلام</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۵- مدرک تحصیلی: کارشناسی ناپیوسته</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۶- رشته تحصیلی: مدیریت بازرگانی</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.text}>۱۷- تاریخ انتصاب: ۱۳۹۹/۱۰/۰۱</Text></View>
                    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.text}>۱۸- سابقه کار(ماه): ۱۴</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۱۹- شماره حکم: ۹۷۸/۱۳/ه/گ/م</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۲۰- عنوان سمت: مسئول مالی دهیاری</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۲۱- مدت این قرارداد: از تاریخ: ۱۴۰۲/۰۱/۰۱ تا تاریخ: ۱۴۰۲/۱۲/۲۹</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '83.3%' }]}><Text style={styles.text}>۲۲- موضوع قرارداد: انجام وظایف تعیین شده برای امور مالی در چهار قوانین و مقررات</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۲۳- محل اجرا: دهیاری های بند ۲ قرارداد</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '50%', textAlign: 'justify' }]} rowSpan={10}>
                        <Text style={styles.text}>۲۴- دستمزد ماهیانه به شرح زیر تعیین میشود:</Text>
                        <Text style={styles.text}>دستمزد ماهیانه به شرح زیر تعیین میشود: برساس دستورالعمل نحوه تعیین حقوق و مزایای امور مالی موضوع بخشنامه شماره ۱۶۱۹۸ مورخ ۱۴۰۲/۰۴/۰۳ سازمان شهرداری ها و دهیاریهای کشور و بخشنامه شماره ۱۳۴۵۹۹/ت۵۸۷۵۶ شورا عالی کار حقوق و مزایای شما طبق ارقام مندرج در ردیف ۲۳ این حکم تعیین می گردد که با رعایت قانون و مقررات و پس از کسورات قانونی قابل پرداخت می باشد.</Text>
                    </View>
                    <View style={styles.tableCol} rowSpan={3}><Text style={styles.text}>الف- مزد ثابت</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>حقوق مبنا:</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۲۶,۹۸۳,۷۷۷ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.text}>پایه سنواتی:</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۲,۵۶۵,۵۶۸ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.text}>فوق العاده شغل:</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۲,۴۲۸,۵۳۹ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>جمع مزد ثابت:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۳۱,۹۷۷,۸۸۴ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>ب- کمک هزینه عائله مندی(حق اولاد):</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۰ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>ج- کمک هزینه مسکن:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۴,۵۰۰,۰۰۰ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>د- کمک هزینه اقلام مصرفی خانوار:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۵,۵۰۰,۰۰۰ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>ذ- فوق العاده محرومیت از تسهیلات زندگی:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۵,۳۹۶,۷۵۵ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>ر- فوق العاده ایثارگری:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۰ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>جمع حقوق مزایا:</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>۴۷,۳۷۴,۶۳۹ ریال</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲۵- طرف قرارداد تابع مقررات،ضوابط و آئین نامه های مربوط به دهیاری ، قانون کار و قانون تامین اجتماعی بوده و از مزایای قوانین مذکور بهره مند می شود.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲۶ - موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲۷- ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید بخشدار صورت می گیرد.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲۸ - مزایای پایان قرارداد طبق قانون کار و براساس حقوق و دستمزد مندرج در قرارداد از محل اعتبارات دهیاری های بند ۲ طرف قرارداد پرداخت می شود.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۲۹ - تعهدات قرارداد:</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>- طرف قرارداد متهعد است مطابق شرح وظایف مندرج در مقررات و ضوابط،نسبت به انجام موضوع قرارداد اقدام کند.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>- طرف قرارداد اقرار می کند مشمول قانون منع مداخله کارکنان دولت در معالمات دولتی مصوب ۱۳۷۷ نیست.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>- عقد قرارداد هیچ گونه تعهدی مبنی بر استخدام اعم از رسمی یا پیمانی اعم از سوی دهیاری برای طرف قرارداد ایجاد نمی کند.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>- طرف قرارداد مسئول حفظ و نگهداری وسایل و اموال در اختیار است و در صورت ایجاد خسارت ،دهیاری می تواند از محل قرارداد خسارت را جبران کند.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۳۰- امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آیین نامه استخدامی دهیاری های کشور مصوب ۱۳۸۳ می باشد دهیاری پاکل گراب به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می گردد.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '100%' }]}><Text style={styles.text}>۳۱- این قرارداد در ۵ نسخه تنظیم و هر نسخه حکم واحد را دارد و پس از امضا و مهر و ثبت معتبر خواهد بود.</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.text}>۳۲- تاریخ اجرای قرارداد: ۱۴۰۲/۰۱/۰۱</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>۳۳- شناسه یکتا: ۱۴۰۰۸۸۱۲۹۳۴</Text></View>
                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.text}>۳۴- شماره و تاریخ صدور قرارداد: ۴۰۷ - ۱۴۰۲/۰۴/۲۶</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>طرف قرارداد (امورمالی دهیاری)</Text><Text style={styles.text}>کبری جوانمردی</Text></View>
                    <View style={[styles.tableCol, { width: '33.3%' }]}><Text style={styles.text}>دهیاری کارفرما (پاکل گراب)</Text><Text style={styles.text}>نعمت الله نوری</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>بخشدار مرکزی</Text><Text style={styles.text}>صفیه علی اولاد</Text></View>
                    <View style={styles.tableCol}><Text style={styles.text}>بخشدار سیوان</Text><Text style={styles.text}>آزاد شریفی نژاد</Text></View>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
