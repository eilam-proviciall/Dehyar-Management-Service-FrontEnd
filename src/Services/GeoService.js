import api from '@/utils/axiosInstance';
import { getGeoDetails } from './CountryDivision';

class GeoService {
    static async translateGeoData(usersData) {
        // جمع‌آوری کدهای جغرافیایی
        const geoStates = [];
        const geoCities = [];
        const geoRegions = [];

        // پردازش داده‌های کاربران و استخراج کدهای جغرافیایی
        usersData.forEach(user => {
            if (user.geo_state) {
                geoStates.push({
                    geo_type: 'state',
                    geo_code: user.geo_state.toString(),
                });
            }
            if (user.geo_city) {
                geoCities.push({
                    geo_type: 'city',
                    geo_code: user.geo_city.toString(),
                });
            }
            if (user.geo_region) {
                const regions = Array.isArray(user.geo_region) ? user.geo_region : [user.geo_region];
                regions.forEach(region => {
                    if (region) {
                        geoRegions.push({
                            geo_type: 'region',
                            geo_code: region.toString(),
                        });
                    }
                });
            }
        });

        // ترکیب همه کدهای جغرافیایی
        const geoDetails = [
            ...geoStates,
            ...geoCities,
            ...geoRegions,
        ];

        // دریافت اطلاعات ترجمه شده
        const geoResponse = await api.post(getGeoDetails(), { geo_data: geoDetails }, { requiresAuth: true });
        const geoData = geoResponse.data;

        // ترجمه داده‌های کاربران
        return usersData.map(user => {
            const stateInfo = geoData.find(geo => geo.info.length && geo.info[0].hierarchy_code === user.geo_state);
            const cityInfo = geoData.find(geo => geo.info.length && geo.info[0].hierarchy_code === user.geo_city);

            let regionNames = [];
            if (Array.isArray(user.geo_region)) {
                regionNames = user.geo_region
                    .filter(region => region)
                    .map(region => {
                        const regionInfo = geoData.find(geo =>
                            geo.info.length && geo.info[0].hierarchy_code === region
                        );
                        return regionInfo?.info[0]?.approved_name || region;
                    });
            } else if (user.geo_region) {
                const regionInfo = geoData.find(geo =>
                    geo.info.length && geo.info[0].hierarchy_code === user.geo_region
                );
                regionNames = [regionInfo?.info[0]?.approved_name || user.geo_region];
            }

            return {
                ...user,
                geo_state_name: stateInfo?.info[0]?.approved_name || user.geo_state || '-',
                geo_city_name: cityInfo?.info[0]?.approved_name || user.geo_city || '-',
                geo_region_name: regionNames.length ? regionNames.join(' - ') : '-',
            };
        });
    }
}

export default GeoService;