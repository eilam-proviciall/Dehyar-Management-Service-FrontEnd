"use client";
import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import api from '@/utils/axiosInstance';
import { getGeoDetails } from "@/Services/CountryDivision";

const UserDivisionChip = ({ workGroup, geoState, geoCity, geoRegion }) => {
    const [geoNames, setGeoNames] = useState({
        stateName: '',
        cityName: '',
        regionName: ''
    });

    useEffect(() => {
        const fetchGeoDetails = async () => {
            if (!geoState && !geoCity && !geoRegion) return;            
            try {
                const geoDetails = [
                    { geo_type: 'state', geo_code: `${geoState}` },
                    { geo_type: 'city', geo_code: `${geoCity}` },
                    { geo_type: 'region', geo_code: `${geoRegion}` }
                ].filter(item => item.geo_code !== 'undefined');

                const geoResponse = await api.post(getGeoDetails(), { geo_data: geoDetails }, { requiresAuth: true });
                const geoData = geoResponse.data;

                const stateInfo = geoData.find(geo => geo.info.length && geo.info[0].hierarchy_code === geoState);
                const cityInfo = geoData.find(geo => geo.info.length && geo.info[0].hierarchy_code === geoCity);
                const regionInfo = geoData.find(geo => geo.info.length && geo.info[0].hierarchy_code === geoRegion);

                setGeoNames({
                    stateName: stateInfo?.info[0]?.approved_name || '',
                    cityName: cityInfo?.info[0]?.approved_name || '',
                    regionName: regionInfo?.info[0]?.approved_name || ''
                });
            } catch (error) {
                console.error("Error fetching geo details:", error);
            }
        };

        fetchGeoDetails();
    }, [geoState, geoCity, geoRegion]);

    const getLocationLabel = () => {
        const parts = [];
        if (geoNames.stateName) parts.push(geoNames.stateName);
        if (geoNames.cityName) parts.push(geoNames.cityName);
        if (geoNames.regionName) parts.push(geoNames.regionName);
        return parts.length > 0 ? parts.join(' - ') : 'اطلاعاتی یافت نشد!';
    };

    return (
        <Chip
            className='mx-2 gap-1'
            sx={{
                height: 'auto',
                '& .MuiChip-avatar': {
                    width: 'auto',
                    height: 'auto',
                },
                '& .MuiChip-label': {
                    display: 'block',
                    padding: '8px',
                    paddingLeft: '12px'
                }
            }}
            avatar={
                <p className={`flex items-center rounded-full bg-backgroundPaper p-1 text-textPrimary`}>
                    {workGroup || ''}
                </p>
            }
            label={<p>{getLocationLabel()}</p>}
            onClick={() => { }}
            style={{ textAlign: 'right' }}
        />
    );
};

export default UserDivisionChip;