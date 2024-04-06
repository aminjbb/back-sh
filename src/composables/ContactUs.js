import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {PanelFilter} from "@/assets/js/filter";


export default function setup() {
    const contactUsList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: ' نام و نام خانوادگی', show: true , value:'full_name', order: false},
        { name: '  شماره موبایل', show: true , value:'phone_number', order: false},
        { name: ' عنوان', show: true, value:'subject' , order: false},
        { name: ' تاریخ ایجاد', show: true, value:'created_at' , order: true},

    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    /**
     * Get page list
     * @param {*} query
     */
    async function getContactUs(query) {

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
            contactUsList.value = data.data.data

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
        pageLength, contactUsList ,addPerPage, getContactUs,
        dataTableLength, page, header, loading
    }
}

