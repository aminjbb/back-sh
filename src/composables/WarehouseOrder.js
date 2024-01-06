import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const orders = ref([
        {
            id: 2,
            user: {
                first_name: "اویس",
                last_name: "اویس"
            },
            shps_count: 20,
            status: "paid",
            payment_status: "successful",
            payment_method: "saman",
            packed_status: 0,
            total_price: 1800000,
            paid_price: 1400000,
            submit_date: "2024-01-06 11:37:58",
            submit_date_fa: "1402/10/16",
            receive_date: "2024-01-11 11:37:58",
            receive_date_fa: "1402/10/21",
            total_discount: 400000,
            invitation_code: "Hanie",
            bank_number: 32339202,
            paid_by_wallet: 320000,
            paid_by_bank: 1280000,
            paid_by_snapp: null,
            sending_price: 350000,
            sorting_placement_id: 5987,
            sorted: true,
            contradicted: 0,
            state: {
                id: 1,
                labe: "فارس"
            },
            city: {
                id: 1,
                label: "شیراز"
            }
        },
        {
            id: 1,
            user: {
                first_name: "اویس",
                last_name: "اویس"
            },
            shps_count: 20,
            status: "paid",
            payment_status: "successful",
            payment_method: "saman",
            packed_status: 0,
            total_price: 1800000,
            paid_price: 1400000,
            submit_date: "2024-01-06 11:37:58",
            submit_date_fa: "1402/10/16",
            receive_date: "2024-01-11 11:37:58",
            receive_date_fa: "1402/10/21",
            total_discount: 400000,
            invitation_code: "Hanie",
            bank_number: 32339202,
            paid_by_wallet: 320000,
            paid_by_bank: 1280000,
            paid_by_snapp: null,
            sending_price: 350000,
            sorting_placement_id: null,
            sorted: null,
            contradicted: 0,
            state: {
                id: 1,
                labe: "فارس"
            },
            city: {
            id: 1,
                label: "شیراز"
                }
            },

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
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            // orders.value = data.data
            loading.value = false
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

