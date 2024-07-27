import { Button, Card, CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import {getSalary} from "@/Services/Salary";
import MyDocument from "@components/MyDocument";
import {pdf} from "@react-pdf/renderer";
import {toast} from "react-toastify";

const ButtonGroup = ({ onSubmit }) =>{
    const handleDownload = async () => {
        // const queryParams = new URLSearchParams(window.location.search);
        // const id = queryParams.get('id');
         const data = {
             "province": "ایلام",
             "county": "ایلام",
             "section": "مرکزی / سیوان",
             "villageCount": 3,
             "villages": "زیفل / پاکل گراب / کله کبود",
             "name": "کبری جوانمردی",
             "fatherName": "کرمرضا",
             "nationalId": "6340081738",
             "maritalStatus": "مجرد",
             "idNumber": "6340081738",
             "birthDate": "۱۳۶۵/۰۴/۱۶",
             "gender": "زن",
             "childrenCount": 0,
             "militaryStatus": "ندارد",
             "isaarStatus": "ندارد",
             "birthPlace": "ایلام - سیروان",
             "issuePlace": "ایلام - ایلام",
             "education": "کارشناسی ناپیوسته",
             "major": "مدیریت بازرگانی",
             "appointmentDate": "۱۳۹۹/۱۰/۰۱",
             "experience": 14,
             "contractStartDate": "۱۴۰۲/۰۱/۰۱",
             "contractEndDate": "۱۴۰۲/۱۲/۲۹",
             "contractSubject": "انجام وظایف تعیین شده برای امور مالی در چهار قوانین و مقررات",
             "baseSalary": "۲۶,۹۸۳,۷۷۷ ریال",
             "yearlyBase": "۲,۵۶۵,۵۶۸ ریال",
             "jobBonus": "۲,۴۲۸,۵۳۹ ریال",
             "totalFixedWage": "۳۱,۹۷۷,۸۸۴ ریال",
             "familyAllowance": "۰ ریال",
             "housingAllowance": "۴,۵۰۰,۰۰۰ ریال",
             "householdAllowance": "۵,۵۰۰,۰۰۰ ریال",
             "deprivationBonus": "۵,۳۹۶,۷۵۵ ریال",
             "veteransBonus": "۰ ریال",
             "totalSalary": "۴۷,۳۷۴,۶۳۹ ریال",
             "contractClause1": "طرف قرارداد تابع مقررات،ضوابط و آئین نامه های مربوط به دهیاری ، قانون کار و قانون تامین اجتماعی بوده و از مزایای قوانین مذکور بهره مند می شود",
             "contractClause2": "موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد",
             "contractClause3": "ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید بخشدار صورت می گیرد",
             "contractClause4": "مزایای پایان قرارداد طبق قانون کار و براساس حقوق و دستمزد مندرج در قرارداد از محل اعتبارات دهیاری های بند ۲ طرف قرارداد پرداخت می شود",
             "commitment1": "طرف قرارداد متهعد است مطابق شرح وظایف مندرج در مقررات و ضوابط،نسبت به انجام موضوع قرارداد اقدام کند.",
             "commitment2": "طرف قرارداد اقرار می کند مشمول قانون منع مداخله کارکنان دولت در معالمات دولتی مصوب ۱۳۷۷ نیست .",
             "commitment3": "عقد قرارداد هیچ گونه تعهدی مبنی بر استخدام اعم از رسمی یا پیمانی اعم از سوی دهیاری برای طرف قرارداد ایجاد نمی کند.",
             "commitment4": "طرف قرارداد مسئول حفظ و نگهداری وسایل و اموال در اختیار است و در صورت ایجاد خسارت ،دهیاری می تواند از محل قرارداد خسارت را جبران کند",
             "signingNote": "امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آﺋین نامه استخدامی دهیاری های کشور می باشد دهیاری پاکل گراب به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می گردد",
             "finalNote": "این قرارداد در ۵ نسخه تنظیم و هر نسخه حکم واحد را دارد و پس از امضا و مهر و ثبت معتبر خواهد بود",
             "executionDate": "۱۴۰۲/۰۱/۰۱",
             "uniqueId": "پیش فرض",
             "contractNumber": "۴۰۷ - ۱۴۰۲/۰۴/۲۶",
             "contractorName": "کبری جوانمردی",
             "employerName": "نعمت االله نوری",
             "centralGovernor": "صفیه علی اولاد",
             "sivanGovernor": "آزاد شریفی نژاد"
         }

        // try {
            // const response = await axios.get(getSalary(id), {
            //     headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` },
            // });
            // const data = response.data;
            const doc = <MyDocument data={data}  />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe.contentWindow.print();
            };
        // } catch (err) {
            // toast.error("Error fetching salary data");
        // }
    };
    return(
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onSubmit}
                    style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                        marginTop: '20px',
                    }}
                >
                    ذخیره
                </Button>
                {/*<Button*/}
                {/*    fullWidth*/}
                {/*    variant="contained"*/}
                {/*    color="error"*/}
                {/*    startIcon={<PictureAsPdfIcon />}*/}
                {/*    onClick={handleDownload}*/}
                {/*>*/}
                {/*    حکم کارگزینی*/}
                {/*</Button>*/}
                <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                    اطلاعات پرسنلی
                </Button>
                <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                    پروفایل
                </Button>
            </CardContent>
        </Card>
    )
};

export default ButtonGroup;
