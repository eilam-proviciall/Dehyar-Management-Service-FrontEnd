import moment from 'moment-jalaali';

export const convertUnixToJalali = (unixTimestamp) => {
    const jalaliDate = moment.unix(unixTimestamp).locale('fa').format("jYYYY/MM/DD");
    return jalaliDate;
}

export const convertJalaliToUnix = (jalaliDate) => {
    const unixTimestamp = moment(jalaliDate, 'jYYYY/jMM/jDD').unix();
    return unixTimestamp;
};