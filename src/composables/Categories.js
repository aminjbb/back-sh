import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const categoreis = ref([]);
    const allCategories = ref([]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const route = useRoute()
    const page = ref(1)

    const header = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه' , show:true , value:'id', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true ,  value:'label', order: true},
        {name:'فعال سازی ' , show:true, value:'is_active', order: false},
    ]);

    const filterField = [
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name: 'شناسه دسته‌بندی', type: 'text', value: 'id' },
        { name: ' دسته‌بندی مادر', type: 'auto-complete', value: 'category_id' },
        {name:'فعال سازی ' , type:'select', value:'is_active'},
        {name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        {name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getCategories() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
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
        AxiosMethod.end_point = `category/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            categoreis.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getAllCategories() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `category/crud/index?per_page=100000000`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            allCategories.value = data.data
        }
    };

    onMounted(function () {
        getCategories();
    })

    return { pageLength, categoreis, getCategories ,getAllCategories, allCategories, dataTableLength , page  , header , item , filterField ,loading}
}

