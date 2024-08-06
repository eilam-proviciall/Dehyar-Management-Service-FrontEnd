import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

let counter = 1;

const NumberedText = ({ text, showNumber = true }) => {
    const persianNumber = (num) => {
        if (num === undefined || num === null) {
            return '';
        }
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
    };

    const number = showNumber ? persianNumber(counter++) : '';

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text>{text}</Text>
            {showNumber && <Text> - {number}</Text>}
        </View>
    );
};

NumberedText.propTypes = {
    text: PropTypes.string.isRequired,
    showNumber: PropTypes.bool
};

export default NumberedText;
