import React, { useRef, useState } from 'react'
import { Grid, Typography } from '@mui/material' // npm i @mui/material
import generatePDF from 'react-to-pdf'

const mainStyle = {
    fontSize: 15,
    p: 2,
    color: 'black',
    border: '2px solid #dfdfdf'
}

export default function usePdf() {
    const target = useRef()

    const ComponentPDF = (
        <Grid container ref={target} sx={{ p: 15, }}>
            <Grid item xs={12} sx={{ borderBottom: '1px solid black', pb: 1 }}>
                <Typography sx={{ textAlign: 'center', color: '#000' }}>
                    قرارداد مدت معین و حکم حقوقی مسئول امور مالی پاره وقت - چهار ساعنه
                </Typography>
                <Typography sx={{ textAlign: 'end', color: '#000' }}>۱۱:۲۴:۴۱ ۱۴۰۳/۰۳/۱۶ چهارشنبه</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 5 }}>
                <Grid container sx={{ border: '3px solid #dfdfdf' }}>
                    <Grid item xs={3} sx={[{ backgroundColor: '#ededed' }, mainStyle]}>
                        ۱ -اﺳﺘﺎن: اﯾﻼم
                    </Grid>
                    <Grid item xs={3} sx={[{ backgroundColor: '#ededed' }, mainStyle]}>
                        ﺷﻬﺮﺳﺘﺎن: اﯾﻼم
                    </Grid>
                    <Grid item xs={3} sx={[{ backgroundColor: '#ededed' }, mainStyle]}>
                        ﺑﺨﺶ: ﻣﺮکﺰی / ﺳﯿﻮان
                    </Grid>
                    <Grid item xs={3} sx={[{ backgroundColor: '#ededed' }, mainStyle]}>
                        ﺗﻌﺪاد دﻫﯿﺎری: ۳
                    </Grid>
                    <Grid item xs={12} sx={[{ backgroundColor: '#ededed' }, mainStyle]}>
                        ۲ -دﻫﯿﺎری ﻫﺎی ﺗﺤﺖ پوشش: زﯾﻔﻞ / پاکل گراب / کله کبود /
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        3- نام و نام خانوادگی طرف قرارداد : کبری جوانمردی
                    </Grid>
                    <Grid item xs={2} sx={mainStyle}>
                        4- نام پدر : کرمرضا
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        کد ملی : 6340081738
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        ۶- وﺿﻌﯿﺖ ﺗﺎﻫﻞ: ﻣﺠﺮد
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        ۷- ﺷﻤﺎره ﺷﻨﺎﺳﻨﺎﻣﻪ: ۶۳۴۰۰۸۱۷۳۸
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        ۸- ﺗﺎرﯾﺦ ﺗﻮﻟﺪ: ۱۳۶۵/۰۴/۱۶
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        ۹-ﺟﻨﺴﯿﺖ: زن
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        ۱۰- ﺗﻌﺪاد ﻓﺮزﻧﺪان:
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۱- وﺿﻌﯿﺖ ﻧﻈﺎم وﻇﯿﻔﻪ: ﻧﺪارد
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۲- وﺿﻌﯿﺖ ایثارگری : ﻧﺪارد
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۳- ﻣﺤﻞ ﺗﻮﻟﺪ: اﯾﻼم -ﺳﯿﺮوان
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۴- ﻣﺤﻞ ﺻﺪور ﺷﻨﺎﺳﻨﺎﻣﻪ: اﯾﻼم - اﯾﻼم
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۵- ﻣﺪرک تحصیلی: کارشناسی ناپیوسته
                    </Grid>
                    <Grid item xs={6} sx={mainStyle}>
                        ۱۶- رﺷﺘﻪ تحصیلی: ﻣﺪﯾﺮﯾﺖ بازرگانی
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۱۷-ﺗﺎرﯾﺦ اﻧﺘﺼﺎب: ۱۳۹۹/۱۰/۰۱
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۱۸- ﺳﺎﺑﻘﻪ کار (ﻣﺎه) : ۱۴
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۱۹ -ﺷﻤﺎره حکیم : ۹۷۸/۱۳/ه/گ/م
                    </Grid>
                    <Grid item xs={5} sx={mainStyle}>
                        ۲۰- ﻋﻨﻮان ﺳﻤﺖ: ﻣﺴﺌﻮل مالی دﻫﯿﺎری
                    </Grid>
                    <Grid item xs={7} sx={mainStyle}>
                        ۲۱ - ﻣﺪت اﯾﻦ ﻗﺮارداد: از ﺗﺎرﯾﺦ : ۱۴۰۲/۰۱/۰۱ ﺗﺎ ﺗﺎرﯾﺦ : ۱۴۰۲/۱۲/۲۹
                    </Grid>
                    <Grid item xs={9} sx={mainStyle}>
                        ۲۲- ﻣﻮﺿﻮع ﻗﺮارداد: اﻧﺠﺎم وﻇﺎﯾﻒ تعیین ﺷﺪه ﺑﺮای اﻣﻮر مالی در چهار ﻗﻮاﻧﯿﻦ و ﻣﻘﺮرات
                    </Grid>
                    <Grid item xs={3} sx={mainStyle}>
                        23- محل اجرا : دهیاری های بند 2 قرارداد
                    </Grid>
                    <Grid item xs={5} sx={mainStyle}>
                        ۲۴- دﺳﺘﻤﺰد ﻣﺎﻫﯿﺎﻧﻪ ﺑﻪ ﺷﺮح زﯾﺮ تعیین ﻣﯿﺸﻮد: دﺳﺘﻤﺰد ﻣﺎﻫﯿﺎﻧﻪ ﺑﻪ ﺷﺮح زﯾﺮ تعیین ﻣﯿﺸﻮد : ﺑﺮﺳﺎس دﺳﺘﻮراﻟﻌﻤﻞ ﻧﺤﻮه
                        تعیین ﺣﻘﻮق و ﻣﺰاﯾﺎی اﻣﻮر ﻣﺎﻟی ﻣﻮﺿﻮع ﺑﺨﺸﻨﺎﻣﻪ ﺷﻤﺎره ۱۶۱۹۸ و کﺸﻮر دﻫﯿﺎرﯾﻬﺎی و ﻫﺎ ﺷﻬﺮداری ﺳﺎزﻣﺎن ۱۴۰۲/۰۴/۰۳ ﻣﻮرخ
                        ﺑﺨﺸﻨﺎﻣﻪ ﺷﻤﺎره ۱۳۴۵۹۹/ت۵۸۷۵۶ ﺷﻮرا ﻋﺎﻟی کﺎر ﺣﻘﻮق و ﻣﺰاﯾﺎی ﺷﻤﺎ ﻃﺒﻖ ارﻗﺎم ﻣﻨﺪرج در ردﯾﻒ ۲۳ اﯾﻦ ﺣکﻢ تعیین ﻣی گﺮدد
                        کﻪ ﺑﺎ رﻋﺎﯾﺖ ﻗﺎﻧﻮن و ﻣﻘﺮرات و پﺲ از کﺴﻮرات ﻗﺎﻧﻮﻧی ﻗﺎﺑﻞ پﺮداﺧﺖ ﻣی ﺑﺎﺷﺪ
                    </Grid>
                    <Grid item xs={7} sx={{ fontSize: 15, color: 'black', border: '2px solid #dfdfdf' }}>
                        <Grid container sx={{ backgroundColor: '#ededed' }}>
                            <Grid
                                xs={4}
                                item
                                sx={{
                                    fontSize: 15,
                                    p: 2,
                                    color: 'black',
                                    border: '2px solid #dfdfdf',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                اﻟﻒ- ﻣﺰد ﺛﺎﺑﺖ
                            </Grid>
                            <Grid item xs={8} sx={{ fontSize: 15, color: 'black' }}>
                                <Grid container>
                                    <Grid item xs={6} sx={mainStyle}>
                                        ﺣﻘﻮق ﻣﺒﻨﺎ:
                                    </Grid>
                                    <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                        ۲۶,۹۸۳,۷۷۷ رﯾﺎل
                                    </Grid>
                                    <Grid item xs={6} sx={mainStyle}>
                                        پایه سنواتی:
                                    </Grid>
                                    <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                        ۲,۵۶۵,۵۶۸ رﯾﺎل
                                    </Grid>
                                    <Grid item xs={6} sx={mainStyle}>
                                        ﻓﻮق اﻟﻌﺎده ﺷﻐﻞ:
                                    </Grid>
                                    <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                        ۲,۴۲۸,۵۳۹ رﯾﺎل
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ﺟﻤﻊ ﻣﺰد ﺛﺎﺑﺖ :
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۳۱,۹۷۷,۸۸۴ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ب- کمک ﻫﺰﯾﻨﻪ ﻋﺎﺋﻠﻪ ﻣﻨﺪی(ﺣﻖ اوﻻد):
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۰ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ج- کمک ﻫﺰﯾﻨﻪ مسکن:
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۴,۵۰۰,۰۰۰ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                د- کمک ﻫﺰﯾﻨﻪ اﻗﻼم مصرفی ﺧﺎﻧﻮار:
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۵,۵۰۰,۰۰۰ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ذ- ﻓﻮق اﻟﻌﺎده ﻣﺤﺮوﻣﯿﺖ از ﺗﺴﻬﯿﻼت زﻧﺪگی:
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۵,۳۹۶,۷۵۵ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ر- ﻓﻮق اﻟﻌﺎده ایثارگری:
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۰ رﯾﺎل
                            </Grid>
                            <Grid item xs={6} sx={mainStyle}>
                                ﺟﻤﻊ ﺣﻘﻮق ﻣﺰاﯾﺎ:
                            </Grid>
                            <Grid item xs={6} sx={[mainStyle, { textAlign: 'end' }]}>
                                ۴۷,۳۷۴,۶۳۹ رﯾﺎل
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۲۵- ﻃﺮف ﻗﺮارداد ﺗﺎﺑﻊ ﻣﻘﺮرات،ﺿﻮاﺑﻂ و آﺋﯿﻦ ﻧﺎﻣﻪ ﻫﺎی ﻣﺮﺑﻮط ﺑﻪ دﻫﯿﺎری ، ﻗﺎﻧﻮن کار و ﻗﺎﻧﻮن ﺗﺎﻣﯿﻦ اﺟﺘﻤﺎﻋی ﺑﻮده و
                        از ﻣﺰاﯾﺎی ﻗﻮاﻧﯿﻦ ﻣﺬکﻮر ﺑﻬﺮه ﻣﻨﺪ می ﺷﻮد.
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۲۶ - ﻣﻮارد ﺧﺎﺗﻤﻪ کﺎر ﻃﺮف ﻗﺮارداد ﺑﻪ اﺳﺘﻨﺎد ﻣﺎده ۲۱ ﻗﺎﻧﻮن کﺎر ﻣی ﺑﺎﺷﺪ.
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۲۷- ﻣﺎﻣﻮرﯾﺖ و ﻣﺮﺧﺼی اﻣﻮرﻣﺎﻟی دﻫﯿﺎری ﺑﻪ اﺳﺘﻨﺎد اﺻﻼﺣﯿﻪ ﻣﺎده ۱۲ آﺋﯿﻦ ﻧﺎﻣﻪ اﺳﺘﺨﺪاﻣی دﻫﯿﺎری ﻫﺎی کﺸﻮر ﺑﺎ تایید
                        ﺑﺨﺸﺪار ﺻﻮرت ﻣی گﯿﺮد.
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۲۸ - ﻣﺰاﯾﺎی پﺎﯾﺎن ﻗﺮارداد ﻃﺒﻖ ﻗﺎﻧﻮن کﺎر و ﺑﺮاﺳﺎس ﺣﻘﻮق و دﺳﺘﻤﺰد ﻣﻨﺪرج در ﻗﺮارداد از ﻣﺤﻞ اﻋﺘﺒﺎرات دﻫﯿﺎری ﻫﺎی
                        ﺑﻨﺪ ۲ ﻃﺮف ﻗﺮارداد پﺮداﺧﺖ ﻣی ﺷﻮد.
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        <Typography sx={{ color: '#000' }}>۲۹ - ﺗﻌﻬﺪات ﻗﺮارداد:</Typography>
                        <Typography sx={{ color: '#000' }}>
                            - ﻃﺮف ﻗﺮارداد ﻣﺘﻬﻌﺪ اﺳﺖ ﻣﻄﺎﺑﻖ ﺷﺮح وﻇﺎﯾﻒ ﻣﻨﺪرج در ﻣﻘﺮرات و ﺿﻮاﺑﻂ،ﻧﺴﺒﺖ ﺑﻪ اﻧﺠﺎم ﻣﻮﺿﻮع ﻗﺮارداد اﻗﺪام کﻨﺪ.
                        </Typography>
                        <Typography sx={{ color: '#000' }}>
                            - ﻃﺮف ﻗﺮارداد اﻗﺮار ﻣی کﻨﺪ ﻣﺸﻤﻮل ﻗﺎﻧﻮن ﻣﻨﻊ ﻣﺪاﺧﻠﻪ کﺎرکﻨﺎن دوﻟﺖ در ﻣﻌﺎﻟﻤﺎت دوﻟﺘی ﻣﺼﻮب ۱۳۷۷ ﻧﯿﺴﺖ .
                        </Typography>
                        <Typography sx={{ color: '#000' }}>
                            - ﻋﻘﺪ ﻗﺮارداد ﻫﯿچ گﻮﻧﻪ ﺗﻌﻬﺪی ﻣﺒﻨی ﺑﺮ اﺳﺘﺨﺪام اﻋﻢ از رﺳﻤی ﯾﺎ پﯿﻤﺎﻧی اﻋﻢ از ﺳﻮی دﻫﯿﺎری ﺑﺮای ﻃﺮف ﻗﺮارداد
                            اﯾﺠﺎد ﻧﻤی کﻨﺪ.
                        </Typography>
                        <Typography sx={{ color: '#000' }}>
                            - ﻃﺮف ﻗﺮارداد ﻣﺴﺌﻮل ﺣﻔﻆ و نگهداری وﺳﺎﯾﻞ و اﻣﻮال در اﺧﺘﯿﺎر اﺳﺖ و در ﺻﻮرت اﯾﺠﺎد ﺧﺴﺎرت ،دﻫﯿﺎری ﻣی ﺗﻮاﻧﺪ از
                            ﻣﺤﻞ ﻗﺮارداد ﺧﺴﺎرت را ﺟﺒﺮان کﻨﺪ
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۳۰- اﻣﻀﺎی ذﯾﻞ اﯾﻦ ﻗﺮارداد از ﺳﻮی ﺑﺨﺸﺪار ﺻﺮﻓﺎ ﺟﻬﺖ اﺟﺮای ﻣﺎده ۱۶ اﺳﺎﺳﻨﺎﻣﻪ ، ﺗﺴﻬﯿﻼت و ﺳﺎزﻣﺎن دﻫﯿﺎری ﻫﺎ ﻣﺼﻮب
                        ۱۳۸۰ و اﻣﻀﺎی ﻣﺴﺌﻮل اﻣﻮرﻣﺎﻟی دﻫﯿﺎری دﻫﯿﺎری ﺑﻪ اﺳﺘﻨﺎد ﻣﺎده ۱۱ آﻦ ﻧﺎﻣﻪ اﺳﺘﺨﺪاﻣی دﻫﯿﺎری ﻫﺎی کﺸﻮر ﻣﺼﻮب ۱۳۸۳ ﻣی
                        ﺑﺎﺷﺪ دﻫﯿﺎری پﺎکﻞ گﺮاب ﺑﻪ ﻧﻤﺎﯾﻨﺪگی از دﻫﯿﺎری ﻫﺎی ﺑﻨﺪ ۲ اﯾﻦ ﻗﺮارداد ﺑﻪ ﻋﻨﻮان دﻫﯿﺎری کﺎرﻓﺮﻣﺎ ﺗﻌﻦ ﻣی گﺮدد.
                    </Grid>
                    <Grid item xs={12} sx={mainStyle}>
                        ۳۱- اﯾﻦ ﻗﺮارداد در ۵ ﻧﺴﺨﻪ ﺗﻨﻈﯿﻢ و ﻫﺮ ﻧﺴﺨﻪ ﺣکﻢ واﺣﺪ را دارد و پﺲ از اﻣﻀﺎ و ﻣﻬﺮ و ﺛﺒﺖ ﻣﻌﺘﺒﺮ ﺧﻮاﻫﺪ ﺑﻮد.
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۳۲- ﺗﺎرﯾﺦ اﺟﺮای ﻗﺮارداد: ۱۴۰۲/۰۱/۰۱
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۳۳- ﺷﻨﺎﺳﻪ یکتا : ۱۴۰۰۸۸۱۲۹۳۴
                    </Grid>
                    <Grid item xs={4} sx={mainStyle}>
                        ۳۴- ﺷﻤﺎره و ﺗﺎرﯾﺦ ﺻﺪور ﻗﺮارداد: ۴۰۷ - ۱۴۰۲/۰۴/۲۶
                    </Grid>
                    <Grid
                        xs={3}
                        item
                        sx={{
                            fontSize: 15,
                            p: 6,
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid #dfdfdf'
                        }}
                    >
                        <Typography sx={{ color: '#000', mb: 5 }}>ﻃﺮف ﻗﺮارداد ( امورمالی دﻫﯿﺎری )</Typography>
                        <Typography sx={{ color: '#000' }}>کﺒﺮی ﺟﻮاﻧﻤﺮدی</Typography>
                    </Grid>
                    <Grid
                        xs={3}
                        item
                        sx={{
                            fontSize: 15,
                            p: 6,
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid #dfdfdf'
                        }}
                    >
                        <Typography sx={{ color: '#000', mb: 5 }}>دﻫﯿﺎری کارفرما ( پاکل گراب )</Typography>
                        <Typography sx={{ color: '#000' }}>ﻧﻌﻤﺖ اﷲ ﻧﻮری</Typography>
                    </Grid>
                    <Grid
                        xs={3}
                        item
                        sx={{
                            fontSize: 15,
                            p: 6,
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid #dfdfdf'
                        }}
                    >
                        <Typography sx={{ color: '#000', mb: 5 }}>ﺑﺨﺸﺪار مرکزی</Typography>
                        <Typography sx={{ color: '#000' }}>ﺻﻔﯿﻪ علی اوﻻد</Typography>
                    </Grid>
                    <Grid
                        xs={3}
                        item
                        sx={{
                            fontSize: 15,
                            p: 6,
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '2px solid #dfdfdf'
                        }}
                    >
                        <Typography sx={{ color: '#000', mb: 5 }}>ﺑﺨﺸﺪار ﺳﯿﻮان</Typography>
                        <Typography sx={{ color: '#000' }}>آزاد شریفی ﻧژاد</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    borderTop: '1px solid black',
                    pt: 1,
                    mt: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography sx={{ color: '#000' }}>ﺻﻔﺤﻪ ١</Typography>
                <Typography sx={{ color: '#000' }}>ﺳﺎﻣﺎﻧﻪ ﻋﻤﻠکﺮد دﻫﯿﺎری ﻫﺎ - dehyar.net</Typography>
            </Grid>
        </Grid>
    )

    const print = () => {
        console.log(target)
        generatePDF(target, { filename: 'page.pdf' })
    }

    return [ComponentPDF, print]
}