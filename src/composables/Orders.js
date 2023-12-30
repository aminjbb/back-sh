import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const orderList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'id', order: false},
        { name: 'نام مشتری', show: true, value:'user' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'وضعیت سفارش', show: true, value:'status', order: false },
        { name: 'وضعیت پرداخت', show: true, value:'payment_status', order: false },
        { name: 'روش پرداخت', show: true, value:'payment_method', order: false },
        { name: 'مبلغ پرداختی', show: true, value:'paid_price', order: false },
        { name: 'وضعیت بارگیری', show: true, value:'packed_status', order: false },
        { name: 'تاریخ ثبت سفارش', show: true, value:'submit_date', order: true },
        { name: 'تاریخ ارسال سفارش', show: true, value:'receive_date', order: true },
    ]);

    const filterField = [
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'نام مشتری' , type:'text', value:'user-id'},
        {name:'وضعیت سفارش' , type:'text', value:'status'},
        {name:'وضعیت پرداخت' , type:'text', value:'payment_status'},
        {name:'روش پرداخت' , type: 'text', value:'payment_method'},
        {name:'وضعیت بارگیری' , type:'text', value:'packed_status'},
        {name:'کد معرف' , type:'text', value:'identification_code'},
        {name:'شناسه بانکی' , type:'text', value:'bank_id'},
        {name:'تاریخ ثبت سفارش' , type:'text', value:'submit_date'},
        {name:'تاریخ ارسال سفارش' , type:'text', value:'receive_date'},
        {name:'استان' , type:'text', value:'state_id'},
        {name:'شهر' , type:'text', value:'city_id'},
        {name:'کمترین مبلغ پرداختی ' , type:'text', value:'lower_payment'},
        {name:'بیشترین مبلغ پرداختی ' , type:'text', value:'highest_payment'},
    ];


    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getOrderList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `order/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            orderList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/orders/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/orders/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getOrderList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength,filterField, orderList ,addPerPage, getOrderList, dataTableLength, page, header,loading}
}
