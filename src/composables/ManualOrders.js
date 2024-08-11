import {ref} from "vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {useRoute} from "vue-router";
import {useCookies} from "vue3-cookies";

export default function setup() {
   const header =ref( [
       { name: 'ردیف',title: 'ردیف', show: true , key:'row', sortable:false, align:'center'},
       { name: 'شناسه سفارش',title: 'شناسه سفارش', show: true , key:'id', sortable: false, align:'center'},
       { name: 'شماره سفارش',title: 'شماره سفارش', show: true , key:'order_number', sortable: false, align:'center'},
       { name: 'سازنده',title: 'سازنده', show: true , key:'creator', sortable: false, align:'center'},
       { name: 'نام کاربر',title: 'نام کاربر', show: true, key:'user' , sortable: false, align:'center'},
       { name: 'شماره کاربر',title: 'شماره کاربر', show: true, key:'phone_number' , sortable: false, align:'center'},
       { name: 'تعداد کالا',title: 'تعداد کالا', show: true , key:'shps_count', sortable: false, align:'center'},
       { name: 'وضعیت سفارش',title: 'وضعیت سفارش', show: true, key:'statusOrder', sortable: false, align:'center'},
       { name: 'مبلغ پرداختی',title: 'مبلغ پرداختی', show: true, key:'paid_price', sortable: false, align:'center'},
       { name: 'وضعیت بارگیری',title: 'وضعیت بارگیری', show: true, key:'packed_status', sortable: false, align:'center',   model:'icon'},
       { name: 'روش ارسال',title: 'روش ارسال', show: true, key:'sending_method', sortable: false, align:'center'},
       { name: 'تاریخ ثبت سفارش',title: 'تاریخ ثبت سفارش', show: true, key:'submit_date_fa', align:'center'},
       { name: 'عملیات',title: 'عملیات', show: true , align:'center', sortable: false, key:'action', fixed: true},
   ])
   const headerSelectProduct =ref( [
       { name: 'ردیف', show: true , value:null, order:false},
       { name: 'تصویر کالا', show: true , value:'image', order: false},
       { name: 'نام کالا', show: true, value:'product_name' , order: false},
       { name: 'قیمت مصرف کننده', show: true, value:'price' , order: false},
       { name: 'قیمت فروش', show: true, value:'price' , order: false},
       { name: 'موجودی سایت', show: true, value:'price' , order: false},
       { name: 'تعداد کالا', show: true, value:'price' , order: false},
    ])
   const filterField = [
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'نام کاربر' , type:'text', value:'creator_id'},
        {name:'شماره کاربر' , type:'text', value:'phone_number'},
        {name:'وضعیت سفارش' , type:'select', value:'status'},
        {name:'وضعیت پرداخت' , type:'select', value:'payment_status'},
        {name:'روش پرداخت' , type:'select', value:'payment_method'},
        {name:'وضعیت بارگیری' , type:'select', value:'packed_status'},
        {name:'روش ارسال' , type: 'select', value:'shipping_method'},
        {name:'تاریخ ثبت سفارش' , type:'date', value:'created_at'},
        {name:'تاریخ ارسال سفارش' , type:'date', value:'logistic_at'},
        {name:'استان' , type:'select', value:'receive_state_id'},
        {name:'شهر' , type:'select', value:'receive_city_id'},
        {name:'کد معرف' , type:'text', value:'identification_code'},
        {name:'شناسه بانکی' , type:'text', value:'bank_id'},
        {name:'کمترین مبلغ پرداختی ' , type:'text', value:'paid_price_from'},
        {name:'بیشترین مبلغ پرداختی ' , type:'text', value:'paid_price_to'},
        {name:'کمترین مبلغ تخفیف ' , type:'text', value:'paid_price_from'},
        {name:'بیشترین مبلغ تخفیف ' , type:'text', value:'paid_price_to'},
    ]

    const route = useRoute()
    const cookies = useCookies()
    const manualOrderList = ref([])

    const page = ref(1)
    const pageLength = ref(1)
    const dataTableLength = ref(25)

    const loading = ref(false)
    const isFilterPage =ref(false)
    const isFilter =ref(false)

    async function getManualOrderList() {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                is_admin_order:1,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                is_admin_order:1,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index`
        let data = await AxiosMethod.axios_get()

        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            manualOrderList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    async function getOrderList() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index`
        let data = await AxiosMethod.axios_get()

        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            // manualOrderList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    async function getShpsList() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index`
        let data = await AxiosMethod.axios_get()

        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            // manualOrderList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    return {
       header,
        filterField,
        page,
        dataTableLength,
        pageLength,
        loading,
        manualOrderList,
        headerSelectProduct,
        getManualOrderList,
        getOrderList,
        getShpsList
   }
}