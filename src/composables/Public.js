import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const dashboardData = ref([]);
    const cookies = useCookies()
    const showChart =ref(false)

    let dataChartCurrentSale = {
        labels: [ 'ماه', 'روز'],
        datasets: [
            {
                label: 'ماه',
                data: [],
                borderColor: ['#673AB7' , '#D72685'],
                backgroundColor: ['#673AB7' , '#D72685'],
                axis: 'x',
            }
        ]
    };

    let dataChartBusinessProfit = {
        labels: ['ماه', 'روز'],
        datasets: [
            {
                label: 'ماه',
                data: [],
                borderColor: ['#E02D2D' , '#43A047'],
                backgroundColor: ['#E02D2D' , '#43A047'],
                axis: 'x',
            }
        ]
    };

    let dataChartLastMonth = {
        labels: [],
        datasets: [
            {
                label: 'مبلغ سفارش',
                data: [],
                borderColor: '#D72685',
                backgroundColor: '#D72685',
                yAxisID: 'y',
            },
            {
                label: 'تعداد سفارش',
                data: [],
                borderColor: '#2196F3',
                backgroundColor: '#2196F3',
                yAxisID: 'y1',
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

            dataChartCurrentSale.datasets[0].data = [data?.data?.sale?.day, data?.data?.sale?.month]

            dataChartBusinessProfit.datasets[0].data = [data?.data?.profit?.day, data?.data?.profit?.month]

            data?.data?.diagram?.forEach(sale=>{
                dataChartLastMonth.labels?.push(sale?.persian_date)
                dataChartLastMonth.datasets[0].data.push(sale?.total_amount)
                dataChartLastMonth.datasets[1].data.push(sale?.order_count)
            })
            showChart.value = true
        }
    }

    return {
        dashboardData,
        getDashboardData,
        dataChartCurrentSale,
        dataChartBusinessProfit,
        dataChartLastMonth,
        showChart
    }
}

