import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const orders = ref([]);
    const pickUpShps = ref([])
    const pickUpIsNull = ref(false)
    const pickUpCount = ref(0)
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
        AxiosMethod.end_point = `warehouse/order/sorting/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            orders.value = data.data
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
        AxiosMethod.end_point = `warehouse/order/pickup/my-tasks`
        let data = await AxiosMethod.axios_get()
        if (data) {
            loading.value = false
            if (data.data.length === 0) pickUpIsNull.value=true
            pickUpShps.value = data.data
            pickUpCount.value = parseInt(data.data.count) - parseInt(data.data.picked_count)
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
        getPickUpShps , pickUpShps ,pickUpIsNull , pickUpCount}
}

