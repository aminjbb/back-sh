import {ref} from "vue";
import {AxiosCall} from "@/assets/js/axios_call";
import {PanelFilter} from "@/assets/js/filter_order";

export default function setup() {
   const header =ref( [
       { name: 'ردیف', show: true , value:null, order:false},
       { name: 'شناسه سفارش', show: true , value:'id', order: false},
       { name: 'شماره سفارش', show: true , value:'order_number', order: false},
       { name: 'نام کاربر', show: true, value:'user' , order: false},
       { name: 'شماره کاربر', show: true, value:'phone_number' , order: false},
       { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
       { name: 'وضعیت سفارش', show: true, value:'status', order: false },
       { name: 'مبلغ پرداختی', show: true, value:'paid_price', order: false },
       { name: 'وضعیت بارگیری', show: true, value:'packed_status', order: false },
       { name: 'روش ارسال', show: true, value:'shipping_method', order: false },
       { name: 'تاریخ ثبت سفارش', show: true, value:'submit_date', order: true },
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

   const page = ref(1)
   const dataTableLength = ref(25)
   const pageLength = ref(1)
   const loading = ref(false)
   const manualOrderList = ref([
       {
           id:10,
           order_number: "52219210",
           user:{
                first_name: 'یسرا',
                last_name: 'فیلی',
                phone_number:'09391202557'
           }
       }
   ])
   const isFilterPage =ref(false)
   const isFilter =ref(false)

    async function getManualOrderList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }

        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index${paramsQuery}`
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

    async function getOrderList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }

        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index${paramsQuery}`
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

    async function getShpsList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }

        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index${paramsQuery}`
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
        getManualOrderList,
        getOrderList,
        getShpsList
   }
}