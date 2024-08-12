import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const attributes = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const route = useRoute()

    const header = ref([
        {name:'ردیف',title:'ردیف' , show:true , key:'row',align:'center', sortable: false},
        {name:'شناسه',title:'شناسه' , show:true , key:'id'},
        {name:'نام انگلیسی',title:'نام انگلیسی' , show:true , key:'name'},
        {name:'نام فارسی',title:'نام فارسی' , show:true,  key:'label',},
        {name:'نوع' ,title:'نوع' , show:true, key:'type', align:'center', sortable: false},
        {name:'مقدار ویژگی',title:'مقدار ویژگی' , show:true, key:'custom', align:'center', sortable: false},
        {name:'فیلتر',title:'فیلتر' , show:true, key:'is_active', align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true}
    ]);

    const filterField =  [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'شناسه ویژگی', type: 'text', value: 'id' },
        { name: 'نوع ', type: 'select', value: 'type' },
        {name:'فعال سازی ' , type:'select', value:'is_filterable'},
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getAttributes () {
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
        AxiosMethod.end_point = `product/attribute/crud/index`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            attributes.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
        else {
            loading.value = false

        }
    };

    async function getAllAttributes () {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/index?per_page=100000`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            attributes.value = data.data
        }
        else {
            loading.value = false
        }
    };
    async function getProductAttributes (id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/product-index/${id}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            attributes.value = data
        }
        else {
            loading.value = false
        }
    }

    return {pageLength, attributes, getAttributes ,getAllAttributes, getProductAttributes , dataTableLength , page  , header , item , filterField , loading}
}

