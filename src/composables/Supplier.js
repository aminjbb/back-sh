import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { SupplierPanelFilter } from "@/assets/js/filter_supplier";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

export default function setup() {
    const supplierList = ref([]);
    const allSuppliers = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()

    const header =ref([
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسه پنل' , show:true, value:'id', order: true},
        {name:'شناسه کوثر' , show:true, value:'kosar_id', order: false},
        {name:'نام و نام خانوادگی' , show:false, value:'full_name', order: false},
        {name:'نام فروشگاه' , show:true, value:'shopping_name', order: false},
        {name:'نوع تامین‌کننده' , show:true, value:'type', order: false},
        {name:'استان' , show:false, value:'state_label', order: false},
        {name:'شهر' , show:false, value:'city_label', order: false},
        {name:'شماره ثابت' , show:true, value:'phone', order: false},
        {name:'بازده پرداخت' , show:true, value:'payment_period', order: false},
        {name:'تاریخ ایجاد' , show:true, value:'created_at', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: false},
    ]);

    const filterField = [
        { name: 'نام و نام خانوادگی', type:'text', value:'full_name'},
        { name: 'نام فروشگاه', type:'text', value:'shopping_name'},
        { name:'نوع تامین‌کننده', type: 'select', value:'type'},
        { name: 'ایمیل', type:'text', value:'email'},
        { name: 'استان', type:'select', value:'state_id'},
        { name: 'شهر', type:'select', value:'city_id'},
        { name: 'شناسه پنل', type:'text', value:'id'},
        { name: 'شناسه کوثر', type:'text', value:'kosar_id'},
        { name: 'شماره ثابت', type:'number', value:'phone'},
        { name: 'تلفن همراه', type:'number', value:'phone_number'},
        { name: 'نوع پرداخت', type:'select', value:'payment_type'},
        { name: 'بازده پرداخت', type:'text', value:'payment_period'},
        {name: 'وضعیت ', type: 'select', value: 'is_active'},
    ];
    
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new SupplierPanelFilter()
    
    async function getSupplierList() {
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
        AxiosMethod.end_point = `supplier/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            supplierList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };

    async function getAllSuppliers ( query) {
        const filter = {
            per_page : 100000,
          }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'supplier/crud/index'
        AxiosMethod.form = filter
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            allSuppliers.value = data.data
        }
        else {
        }
    }

    return {pageLength, getSupplierList, supplierList, filterField, dataTableLength, page, header, loading,getAllSuppliers,allSuppliers}
}