export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(num) {
    return `${formatNumber(num)}`;
}

export function daysToMonths(days) {
    const daysInMonth = 30;
    return Math.floor(days / daysInMonth);
}
