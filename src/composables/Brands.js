import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const brand = ref([]);
    const allBrands = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', align:'center', sortable: false},
        {name: 'شناسه', title: 'شناسه', show: true , key:'id', align:'center'},
        {name: 'نام انگلیسی', title: 'نام انگلیسی', show: true, key:'name' , align:'center'},
        {name: 'نام فارسی', title: 'نام فارسی', show: true , key:'label', align:'center'},
        {name: 'فعال سازی ', title: 'فعال سازی ', show: true, key:'is_active', align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true}
    ]);

    const filterField = [
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'نام فارسی' , type:'text', value:'label'},
        { name: 'شناسه برند', type: 'text', value: 'id' },
        {name:'فعال سازی ' , type:'select', value:'is_active'},
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getBrands() {
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
        AxiosMethod.end_point = `brand/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            brand.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    async function getAllBrands() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `brand/crud/index?per_page=100000`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            allBrands.value = data.data
        }

        else {
        }
    };

    return {pageLength,filterField, brand , getBrands,getAllBrands, allBrands, dataTableLength, page, header, item,loading  }
}

