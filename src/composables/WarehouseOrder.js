import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
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
    const pickUpShps = ref([])
    const pickUpIsNull = ref(false)
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
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/pickup`
        let data = await AxiosMethod.axios_get()
        if (data) {
            loading.value = false
            if (data.data.length === 0) pickUpIsNull.value=true
            pickUpShps.value = data.data
        }

        else {
            loading.value = false
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/orders/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/orders/index'+ filter.params_generator(route.query))
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
        getPickUpShps , pickUpShps ,pickUpIsNull}
}

