import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_lost.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const luckyWheel = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'اسم گردونه', show: true , value:'label', order: false},
        { name: 'لیبل', show: true, value:'name' , order: false},
        { name: 'تاریخ شروع', show: true , value:'start_date', order: true},
        { name: 'تاریخ پایان', show: true , value:'end_date', order: true},
        { name: 'تعداد شانس', show: true , value:'chance', order: false},
        { name: 'وضعیت', show: true , value:'is_active', order: false},
    ]);
    const prizesHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'کد تخفیف', show: true , value:'voucher', order: false},
        { name: 'نام کد تخفیف', show: true, value:'name' , order: false},
        { name: 'لیبل کد تخفیف', show: true , value:'label', order: true},
        { name: 'میزان درصد شانس', show: true , value:'chance', order: true},
        { name: 'مدت زمان استفاده', show: true , value:'time', order: false},
    ]);
    const filterField = [
        { name: 'شناسه بسته', type:'text', value:'package_id'},
        { name: 'نوع بسته', type:'select', value:'type_package'},
        { name:'نوع محموله', type: 'select', value:'shipment_type'},
        { name: 'نام فروشگاه', type:'text', value:'shopping_name'},
        { name: 'تامین کننده', type:'select', value:'supplier_id'},
        { name: 'سریال کالا', type:'text', value:'shps_s'},
        { name: 'نام کالا', type:'text', value:'sku_label'},
        { name: 'نام ایجاد کننده', type:'select', value:'creator_id'},
        { name: 'تاریخ افزودن به لیست', type:'date', value:'created_at'},
    ];
    const filterFieldLuckyWheel = [
        { name: 'اسم گردونه', type:'text', value:'name'},
        { name: 'لیبل', type:'text', value:'label'},
        { name: 'تاریخ شروع', type:'date', value:'start_time'},
        { name: 'تاریخ پایان', type:'date', value:'end_time'},
        { name: 'تعداد شانس', type:'text', value:'turn_per_user'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getLuckyWheelList() {
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
        AxiosMethod.end_point = 'game/lucky-wheel/crud/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            luckyWheel.value = data.data.data
            console.log(luckyWheel.value, 'luckyWheel.value')
            loading.value = false
        }
    }


    return {pageLength, luckyWheel , getLuckyWheelList, dataTableLength, page, header,loading , filterField , prizesHeader, filterFieldLuckyWheel }
}

