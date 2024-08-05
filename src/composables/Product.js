import {ref} from 'vue';
import {useRoute} from 'vue-router'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
export default function setup() {
    const product = ref([]);
    const oneProduct = ref('');
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const route = useRoute()
    const page = ref(1)
    const cookies = useCookies()
    const header = ref([
        {name: 'ردیف', title: 'ردیف', show: true, key: 'row', align:'center', sortable: false},
        {name: 'شناسه', title: 'شناسه', show: true, key: 'id', align:'center'},
        {name: 'نام انگلیسی', title: 'نام انگلیسی', show: true, key: 'name', align:'center'},
        {name: 'نام فارسی', title: 'نام فارسی', show: true, key: 'label', align:'center'},
        {name: ' ساخت کالا', title: ' ساخت کالا', show: true, key:'custom', align:'center', sortable: false},
        {name: ' کالا ها', title: ' کالا ها', show: true, key:'show', align:'center', sortable: false},
        {name: 'فعال سازی ', title: 'فعال سازی ', show: true, key:'is_active', align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true, align:'center', sortable: false, fixed: true}
       
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

