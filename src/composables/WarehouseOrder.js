import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const orders = ref([
        {
            order_id:1,
            shelf_id:12,
            row_number:12,
            placement:12,
            step_number:12,
            shelf_number:12,
        }
    ]);
    const pickUpShps = ref({
        shps: {
            id: 36,
            barcode: "170409463932",
            barcode_image: "storage/barcode/170409463932.png",
            sku: {
                id: 3,
                label: "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  نرم کنندگی 1 عدد",
                image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/cosmetics-logo.png",
                brand: {
                    id: 1,
                    name: "Chanel",
                    label: "شانل",
                    is_active: 0,
                    priority: 4,
                    image_id: null,
                    created_at: "2023-11-02T12:00:37.000000Z",
                    updated_at: "2023-11-01T12:00:37.000000Z",
                    created_at_fa: "1402/08/11",
                    updated_at_fa: "1402/08/10"
                }
            }
        },
        placement: {
            id: 7416,
            row_numbe: 38,
            placement_number: 6,
            step_number: 6,
            shelf_number: 4,
            barcode: "5-7416-1703692912",
            barcode_image: "storage/shavaz/barcode/5-7416-1703692912.png",
            created_at: "2023-12-27T16:01:52.000000Z",
            updated_at: "2023-12-27T16:01:52.000000Z",
            created_at_fa: "1402/10/06",
            updated_at_fa: "1402/10/06"
        },
        count: 10
    })
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'order_id', order: false},
        { name: 'شناسه شلف', show: true, value:'shelf_id' , order: false},
        { name: 'شماره ردیف', show: true , value:'row_number', order: false},
        { name: 'شماره قفسه', show: true , value:'placement', order: false},
        { name: 'شماره طبقه', show: true , value:'step_number', order: false},
        { name: 'شماره شلف', show: true , value:'shelf_number', order: false},
    ]);

    const filterField = [
        {name:'شناسه shps' , type:'text', value:'id'},
        {name:'نام کالا' , type:'text', value:'type'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getWarehouseOrders(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse_inventory/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            orders.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };
    async function getPickUpShps(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/pickup${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            orders.value = data.data
        }

        else {
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/warehouse_inventory/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/warehouse_inventory/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getWarehouseInventoryList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength,filterField, orders ,addPerPage, getWarehouseOrders, dataTableLength, page, header,loading ,
        getPickUpShps , pickUpShps}
}

