import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

let counter = 1;
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
    },
    number: {
        marginRight: 2,
    },
    text: {
        flex: 1,
    },
};
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
        <View style={styles.container}>
            {showNumber && <Text style={styles.number}> - {persianNumber(number)} </Text>}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

NumberedText.propTypes = {
    text: PropTypes.string.isRequired,
    showNumber: PropTypes.bool
};

export default NumberedText;
