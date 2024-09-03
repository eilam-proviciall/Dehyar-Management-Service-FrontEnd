'use client';
import { useEffect } from 'react';

const NumberConversionScript = () => {
    useEffect(() => {
        const handleInput = (e) => {
            if (e.target.tagName.toLowerCase() === 'input') {
                e.target.value = e.target.value.replace(/[۰-۹]/g, function (d) {
                    return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);
                });
            }
        };
        document.addEventListener('input', handleInput);

        // Cleanup event listener when the component is unmounted
        return () => {
            document.removeEventListener('input', handleInput);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default NumberConversionScript;
