import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {splitChar} from "@/assets/js/functions";

export default function setup() {
    const dashboardData = ref([]);
    const cookies = useCookies()
    const showChart =ref(false)
    let chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#AD1457', '#880E4F', '#C51162', '#EC407A', '#FCE4EC','#AD1457', '#880E4F', '#C51162', '#EC407A', '#FCE4EC'],
            },
        ],
    };
    async function getDashboardData(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/statics/home`
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_get()
        if (data) {
            dashboardData.value = data.data

            data?.data?.sale?.day_ago.forEach(sale=>{
                chartData.labels.push(splitChar(sale))
                chartData.datasets[0].data.push(sale)
            })
            showChart.value = true
        }
    };

    return {
        dashboardData,
        getDashboardData,
        chartData,
        showChart
    }
}

