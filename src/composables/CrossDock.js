import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const crossDock =ref([])
    const orders =ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'شناسه محموله',title: 'شناسه محموله', show: true , key:'id', sortable: false, align:'center'},
        { name: 'شناسه فاکتور',title: 'شناسه فاکتور', show: true , key:'type', sortable: false, align:'center'},
        { name: 'تعداد آیتم',title: 'تعداد آیتم', show: true, key:'shps_count' , sortable: false, align:'center'},
        { name: 'تنوع آیتم',title: 'تنوع آیتم', show: true , key:'shps_variety', sortable: false, align:'center'},
        { name: 'نام سازنده',title: 'نام سازنده', show: true, key:'creator', sortable: false, align:'center' },
        { name: 'تاریخ ساخت',title: 'تاریخ ساخت', show: true, key:'created_at_fa', align:'center'},
        { name: 'تاریخ ویرایش',title: 'تاریخ ویرایش', show: true, key:'updated_at_fa', align:'center'},
        { name: 'وضعیت',title: 'وضعیت', show: true, key:'custom', sortable: false, align:'center' },
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const headerShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'order', order: false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: 'تاریخ ثبت سفارش', show: true , value:'order_date', order: true},
        { name: 'تاریخ ارسال', show: true, value:'send_date', order: true },
    ]);

    const headerSumShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'order', order: false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: 'تاریخ ارسال', show: true, value:'send_date', order: true },
    ]);

    const filterFieldAllRetail = [
        {name:'شناسه محموله' , type:'text', value:'retail_id' , place:'شناسه محموله'},
        { name: 'نام سازنده', type:'auto-complete', value:'admin', place:'نام سازنده'},
        { name: 'تاریخ ساخت', type:'date', value:'created_at', place:'تاریخ ساخت'},
        { name: 'تاریخ ارسال', type:'date', value:'shipment_at', place:'تاریخ ارسال'},
        { name:'کمترین تعداد آیتم' , type: 'text', value:'count_from' , place:'از'},
        { name: 'بیشترین تعداد آیتم', type:'text', value:'count_to' , place:'تا'},
        { name: 'کمترین تنوع آیتم', type:'text', value:'number_from', place:'از'},
        { name: 'بیشترین تنوع آیتم', type:'text', value:'number_to', place:'تا'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    async function getCrossDockListing(query) {
        filter.factor = route.params.factorId
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.form = {...route.query}
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/crossdock/crud/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            crossDock.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };
    async function getOrders(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/orders/shipment/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            orders.value = data.data.data
        }
    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/cross-dock/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/cross-dock/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {filterFieldAllRetail, getCrossDockListing,crossDock, pageLength ,addPerPage, dataTableLength, page, header,
        loading ,headerShps , headerSumShps , getOrders , orders}
}

