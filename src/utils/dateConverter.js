import moment from 'moment-jalaali';

export const convertUnixToJalali = (unixTimestamp) => {
    const jalaliDate = moment.unix(unixTimestamp).format("jYYYY/jM/jD");
    return jalaliDate;
}

export const convertJalaliToUnix = (jalaliDate) => {
    const unixTimestamp = moment(jalaliDate, 'jYYYY/jMM/jDD').unix();
    return unixTimestamp;
};