import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const luckyWheel = ref([]);
    const luckyWheelPrize = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true ,sortable:false,align:'center', key:'row'},
        { name: 'اسم گردونه',title: 'اسم گردونه', show: true,sortable: false,align:'center', key:'name'},
        { name: 'لیبل',title: 'لیبل', show: true,sortable: false,align:'center', key:'label'},
        { name: 'تاریخ شروع',title: 'تاریخ شروع', show: true ,align:'center', key:'start_time_fa'},
        { name: 'تاریخ پایان',title: 'تاریخ پایان', show: true ,align:'center', key:'end_time_fa'},
        { name: 'تعداد شانس',title: 'تعداد شانس', show: true ,sortable: false,align:'center', key:'turn_per_user'},
        { name: 'وضعیت',title: 'وضعیت', show: true ,sortable: false,align:'center', key:'is_active'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true ,align:'center', sortable: false, fixed: true},
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
        { name: 'نام', type:'text', value:'name'},
        {name:'لیبل' , type:'text', value:'label'},
        {name:'تاریخ شروع ' , type:'date', value:'start_time'},
        {name:'تاریخ پایان ' , type:'date', value:'end_time'},
        {name:'وضعیت' , type:'select', value:'is_active'},
        {name:'تعداد شانس' , type:'text', value:'turn_per_user'},
    ];
    const loading = ref(false)

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
            loading.value = false
        }
    }
    async function getLuckyWheelPrize() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `game/lucky-wheel/crud/get/${route.params.luckyWheelId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            luckyWheelPrize.value = data.data
        }
    }



    return {pageLength, luckyWheel , getLuckyWheelList, dataTableLength, page, header,loading , filterField ,
        prizesHeader , getLuckyWheelPrize , luckyWheelPrize}
}

