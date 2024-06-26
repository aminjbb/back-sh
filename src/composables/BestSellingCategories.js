import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const bestSellCategories = ref([]);
    const bestSellCategory = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'عنوان', show: true , value:'label', order: false},
        { name: 'تصویر', show: true, value:'name' , order: false},
        { name: 'دستگاه', show: true , value:'start_date', order: false},
        { name: 'لینک', show: true , value:'end_date', order: false},
        { name: 'سازنده', show: true , value:'chance', order: false},
        // { name: 'عملیات', show: true , value:'is_active', order: false},
    ]);
    const filterField = [
        { name: 'عنوان', type:'text', value:'name'},
        {name:'دستگاه' , type:'text', value:'device'},
        {name:'سازنده ' , type:'select', value:'creator_id'},

    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getBestSellCategories() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'game/lucky-wheel/crud/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            luckyWheel.value = data.data.data
            loading.value = false
        }
    }


    return {pageLength, bestSellCategories , getBestSellCategories, dataTableLength, page, header,loading , filterField , bestSellCategory}
}

