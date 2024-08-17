import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const bestSellCategories = ref([]);
    const bestSellCategory = ref(null);
    const bestSelling = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()
    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row',sortable: false, align:'center'},
        {name: 'عنوان', title: 'عنوان', show: true , key:'label', sortable: false, align:'center'},
        {name: 'تصویر', title: 'تصویر', show: true, key:'image' , sortable: false, align:'center'},
        {name: 'دستگاه', title: 'دستگاه', show: true , key:'device', sortable: false, align:'center'},
        {name: 'لینک', title: 'لینک', show: true , key:'link', sortable: false, align:'center'},
        {name: 'سازنده', title: 'سازنده', show: true , key:'creator_id', sortable: false, align:'center'},
        {name: 'وضعیت', title: 'وضعیت', show: true , key:'is_active', sortable: false, align:'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const filterField = [
        { name: 'عنوان', type:'text', value:'label'},
        { name:'دستگاه' , type:'select', value:'device'},
        { name:'سازنده ' , type:'select', value:'creator_id'},

    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getAllBestSellCategories() {
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
        AxiosMethod.end_point = 'category/best_selling/crud/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            bestSellCategories.value = data.data.data
            loading.value = false
        }
    }

    async function getBestSellCategories() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'category/best_selling/crud/get/' + this.$route.params.categoryId
        let data = await AxiosMethod.axios_get()
        if (data) {
            bestSelling.value = data.data
            loading.value = false
        }
    }


    return {
        pageLength,
        bestSellCategories ,
        getAllBestSellCategories,
        dataTableLength,
        page,
        header,
        loading ,
        filterField ,
        bestSellCategory,
        getBestSellCategories,
        bestSelling
    }
}

