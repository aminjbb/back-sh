import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {RetailShipmentFilter} from "@/assets/js/filter_request_shipment";


export default function setup() {
    const ShipmentRequestsList = ref([]);
    const shipmentRequest = ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: ' نام و نام خانوادگی', show: true , value:'label', order: false},
        { name: '  شماره موبایل', show: true , value:'label', order: false},
        { name: ' عنوان', show: true, value:'type' , order: false},
        { name: ' تاریخ ایجاد', show: true, value:'type' , order: false},

    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new RetailShipmentFilter()

    /**
     * Get page list
     * @param {*} query
     */
    async function getShipmentRequestsList(query) {

        let paramsQuery = null
        loading.value = true
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `user/contact-us/index/${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            ShipmentRequestsList.value = data.data



            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/contact-us/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/contact-us/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {
        pageLength, ShipmentRequestsList ,addPerPage, getShipmentRequestsList,
        dataTableLength, page, header, loading, shipmentRequest
    }
}

