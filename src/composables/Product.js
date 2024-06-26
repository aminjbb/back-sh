import {ref, watch} from 'vue';
import { onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter.js'
import {useRouter, useRoute} from 'vue-router'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
export default function setup() {
    const product = ref([]);
    const oneProduct = ref('');
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)
    const cookies = useCookies()
    const header = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه', show: true, value: 'created_at', order: true},
        {name: 'نام انگلیسی', show: true, value: 'name', order: true},
        {name: 'نام فارسی', show: true, value: 'label', order: true},
        {name: ' ساخت کالا', show: true, order: false},
        {name: ' کالا ها', show: true, order: false},
        {name: 'فعال سازی ', show: true, value: 'is_active', order: false},
       
    ]);

    const filterField = [
        {name:'شناسه' , type:'text', value:'id'},
        {name: 'نام انگلیسی', type: 'text', value: 'name'},
        {name: 'نام فارسی', type: 'text', value: 'label'},
        {name: 'فعال سازی ', type: 'select', value: 'is_active'},
        {name: 'تاریخ ایجاد', type: 'date', value: 'created_at'},
        {name: 'تاریخ بروز‌رسانی', type: 'date', value: 'updated_at'},
    ];
    
    const item = []
    const loading = ref(false)
    const isFilter = ref(false)
    const isFilterPage = ref(false)
    const filter = new PanelFilter()

    async function getProduct() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.token = cookies.cookies.get('adminToken')
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
        AxiosMethod.end_point = `product/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            product.value = data.data
            loading.value = false
            setTimeout(() => {
                isFilter.value = false
                isFilterPage.value = false
            }, 2000)
        } else {
            loading.value = false
        }
    };

    async function getOneProduct(id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `product/crud/get/${id}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            oneProduct.value = data.data
        } else {
            loading.value = false
        }
    };

    async function searchProduct(search) {
        loading.value = true
        product.value = []
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/crud/index?label=${search}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            product.value = data.data
            loading.value = false
        } else {
            loading.value = false
        }
    };

    return {
        pageLength,
        product,
        getProduct,
        searchProduct,
        dataTableLength,
        page,
        header,
        item,
        filterField,
        loading,
        getOneProduct,
        oneProduct
    }
}

