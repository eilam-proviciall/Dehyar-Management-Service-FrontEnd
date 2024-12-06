import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const AnimatedTabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
                mb: 1,
                gap: 1,
                width: '100%',
                minHeight: '40px'
            }}
        >
            {/* Container for background and chips */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    width: '100%',
                    maxWidth: '300px',
                    padding: '4px',
                    bgcolor: 'action.hover',
                    borderRadius: '20px',
                }}
            >
                {/* Animated background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        width: 'calc(50% - 4px)',
                        height: 'calc(100% - 8px)',
                        bgcolor: 'primary.main',
                        borderRadius: '16px',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: `translateX(${activeTab === tabs[1].value ? '100%' : '0%'})`,
                        zIndex: 0,
                    }}
                />

                {/* Tabs */}
                {tabs.map((tab) => (
                    <Chip
                        key={tab.value}
                        label={tab.label}
                        onClick={() => onTabChange(tab.value)}
                        sx={{
                            flex: 1,
                            height: '32px',
                            zIndex: 1,
                            transition: 'color 0.3s ease',
                            color: activeTab === tab.value ? 'white' : 'text.primary',
                            bgcolor: 'transparent !important',
                            borderColor: 'transparent',
                            '&:hover': {
                                bgcolor: 'transparent !important',
                            },
                            '& .MuiChip-label': {
                                fontSize: '0.875rem',
                                fontWeight: activeTab === tab.value ? 500 : 400,
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default AnimatedTabs;