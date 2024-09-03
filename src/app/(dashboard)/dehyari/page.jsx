"use client"
import React, { useEffect } from 'react';
import Chart from "@views/dehyari/chart/Chart";

function Page(props) {
    useEffect(() => {
        const handleKeyPress = (event) => {
            const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
            const englishNumbers = '0123456789';

            if (persianNumbers.includes(event.key)) {
                const englishEquivalent = englishNumbers[persianNumbers.indexOf(event.key)];
                event.preventDefault();
                const input = event.target;
                const start = input.selectionStart;
                const end = input.selectionEnd;
                const newValue = input.value.substring(0, start) + englishEquivalent + input.value.substring(end);
                input.value = newValue;
                input.setSelectionRange(start + 1, start + 1);
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);
    return (
        <div>
            <Chart />
        </div>
    );
}

export default Page;