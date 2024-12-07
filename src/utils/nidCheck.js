export const validateIranianNationalId = (input) => {
    if (!input) return false;

    input = input.toString().trim();

    if (input.length !== 10) return false;

    if (!/^\d{10}$/.test(input)) return false;

    const bannedArray = [
        "0000000000",
        "1111111111",
        "2222222222",
        "3333333333",
        "4444444444",
        "5555555555",
        "6666666666",
        "7777777777",
        "8888888888",
        "9999999999"
    ];

    if (bannedArray.includes(input)) return false;

    const check = parseInt(input[9]);
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += parseInt(input[i]) * (10 - i);
    }

    const lastDigit = sum % 11;

    if (lastDigit < 2) {
        if (check !== lastDigit) return false;
    } else {
        if (check !== (11 - lastDigit)) return false;
    }

    return true;
};