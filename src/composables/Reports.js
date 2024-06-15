import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const commercialReportData = ref([]);
    const cookies = useCookies()
    const loading = ref(true);

    async function getCommercialReportData(report_period, refresh_period) {
        try {
            this.loading = true
            const AxiosMethod = new AxiosCall()
            AxiosMethod.token = cookies.cookies.get('adminToken')
            AxiosMethod.end_point = `system/reports/commercial?report_period=${report_period ?? '24h'}&refresh_period=${refresh_period ?? '5m'}`
            AxiosMethod.using_auth = true
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                commercialReportData.value = data.data
            }
            this.loading = false
        } catch (e) {
            this.loading = false
        }
    }

    return {
        commercialReportData, getCommercialReportData, loading
    }
}

