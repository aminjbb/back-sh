import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

export default function setup() {
    const pickUpTask = ref([]);
    const warehouseList = ref([]);
    const warehouseExitCapacityList = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const exitCapacityPageLength =ref(1)
    const cookies = useCookies()

    const header = [
        {name:'ردیف' , title:'ردیف' , show:true, key:'row', sortable: false, align: 'center'},
        {name:'نام انبار' , title:'نام انبار' , show:true, key:'name', sortable: false, align: 'center'},
        {name:'آدرس' , title:'آدرس' , show:true, key:'address', sortable: false, align: 'center'},
        {name:'شماره تماس' , title:'شماره تماس' , show:true, key:'phone_number', sortable: false, align: 'center'},
        {name:'نوع انبار' , title:'نوع انبار' , show:true, key:'custom', sortable: false, align: 'center'},
        {name:'ظرفیت مارکت' , title:'ظرفیت مارکت' , show:true, key:'market_storage_count', sortable: false, align: 'center'},
        {name:'ظرفیت Retail' , title:'ظرفیت Retail' , show:true, key:'retail_storage_count', sortable: false, align: 'center'},
        {name:'وضعیت' , title:'وضعیت' , show:true, key:'is_active', sortable: false, align: 'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ];
    const pickupHeader = [
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسهshps' , show:true, value:'shps', order: false},
        {name:'جایگاه' , show:true, value:'placement', order: false},
        {name:'وضعیت' , show:true, value:'status', order: false},
        {name:'شماره نوبت' , show:true, value:'turn', order: false},
        {name:'تعداد' , show:true, value:'count', order: false},
        {name:'اولویت' , show:true, value:'priority', order: false},
        {name:'ذخیره' , show:true, value:'save', order: false},
        {name:'سفارشات' , show:true, value:'orders', order: false},

    ];
    
    const SpecialCapacityHeader = [
        {name:'تاریخ ' , show:true},
        {name:'ظرفیت مارکت' , show:true},
        {name:'ظرفیت Retail', show:true} ,
    ];

    const route = useRoute()

    const filterField = [
        { name: 'نام', type:'text', value:'first_name'},
        { name: 'نام خانوادگی', type:'text', value:'last_name'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        { name: 'ایمیل', type:'select', value:'email'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getWarehouseList(query) {
        loading.value = true

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
        AxiosMethod.end_point = `warehouse/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            warehouseList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };
    async function getWarehouseExitCapacityList(page) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/exit/storage/exception/crud/index/${route.params.warehouseId}?page=${page}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            exitCapacityPageLength.value = data.data.last_page
            warehouseExitCapacityList.value = data.data
            loading.value = false
        }
    };
    async function getPickUpTask(form) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.form = form
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/order/pickup/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pickUpTask.value = data.data.data
            pageLength.value = data.data.last_page
        }
    };

    // function addPagination(page){
    //     filter.page = page
    //     filter.per_page = dataTableLength.value
    //     router.push('/warehouse/index/'+ filter.params_generator(route.query))
    //
    // }
    // function addPerPage(number){
    //     filter.page = 1
    //     filter.per_page =number
    //     router.push('/warehouse/index'+ filter.params_generator(route.query))
    // }
    // onBeforeRouteUpdate(async (to, from) => {
    //
    //     if (!isFilterPage.value) {
    //         isFilter.value =true
    //         page.value = 1
    //         filter.page = 1
    //     }
    //     await getWarehouseList(to)
    // })
    //
    // watch(page, function(val) {
    //     if (!isFilter.value){
    //         isFilterPage.value = true
    //         addPagination(val)
    //     }
    // })

    return {
        pageLength,
        getWarehouseList,
        warehouseList,
        filterField,
        dataTableLength,
        page,
        header,
        SpecialCapacityHeader,
        loading,
        getWarehouseExitCapacityList,
        warehouseExitCapacityList,
        exitCapacityPageLength ,
        pickupHeader ,
        getPickUpTask ,
        pickUpTask
    }
}