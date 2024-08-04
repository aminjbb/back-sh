import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const supplierList = ref([]);
    const allSuppliers = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()

    const header =ref([
        {name:'ردیف' ,title:'ردیف', show:true, sortable: false,  align:'center',  key:'row'},
        {name:'شناسه پنل' ,title:'شناسه پنل', show:true, align:'center',  key:'id'},
        {name:'شناسه کوثر' ,title:'شناسه کوثر', show:true, align:'center',  key:'kosar_id'},
        {name:'نام و نام خانوادگی' ,title:'نام و نام خانوادگی', show:false, sortable: false, align:'center',  key:'full_name'},
        {name:'نام فروشگاه' ,title:'نام فروشگاه', show:true, sortable: false, align:'center',  key:'shopping_name'},
        {name:'نوع تامین‌کننده' ,title:'نوع تامین‌کننده', show:true, sortable: false, align:'center',  key:'supplier_type'},
        {name:'استان' ,title:'استان', show:false, sortable: false, align:'center',  key:'state_label'},
        {name:'شهر' ,title:'شهر', show:false, sortable: false, align:'center',  key:'city_label'},
        {name:'شماره ثابت' ,title:'شماره ثابت', show:true, sortable: false, align:'center',  key:'phone'},
        {name:'بازده پرداخت' ,title:'بازده پرداخت' ,show:true, sortable: false, align:'center',  key:'payment_period'},
        {name:'تاریخ ایجاد' ,title:'تاریخ ایجاد' ,show:true, align:'center',  key:'created_at'},
        {name:'وضعیت' ,title:'وضعیت', show:true, sortable: false, align:'center',  key:'is_active'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
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
    
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    
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