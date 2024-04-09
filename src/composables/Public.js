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
                borderColor: [],
                backgroundColor: [],
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
                yAxisID: 'left-y-axis',
                borderColor:'rgba(215, 38, 133, 1)',
                backgroundColor: 'rgba(252, 228, 236, 1)'
            },
            {
                label: 'تعداد سفارش',
                data: [],
                yAxisID: 'right-y-axis',
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 1)'
            }
        ]
    }

    async function getDashboardData(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/statics/home`
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_get()
        if (data) {
            dashboardData.value = data.data

            dataChartCurrentSale.datasets[0].data = [data?.data?.sale?.month, data?.data?.sale?.day]

            dataChartBusinessProfit.datasets[0].data = [data?.data?.profit?.month, data?.data?.profit?.day]
            dataChartBusinessProfit.datasets[0].backgroundColor = dataChartBusinessProfit.datasets[0].data.map(value => {
                return value < 0 ? '#E02D2D' : '#43A047'
            })
            dataChartBusinessProfit.datasets[0].borderColor = dataChartBusinessProfit.datasets[0].backgroundColor

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

