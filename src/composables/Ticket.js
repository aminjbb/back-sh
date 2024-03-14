import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {da} from "vuetify/locale";

export default function setup() {
    const ticket = ref([]);
    const oneTicket =ref(null)
    const allTickets = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true, value:null, order:false},
        { name: 'شماره', show: true, value:'ticket_number', order: false},
        { name: 'عنوان', show: true, value:'label', order: false},
        { name: 'اولویت', show: true, value:'priority', order: false},
        { name: 'وضعیت', show: true, value:'status', order: false},
        { name: 'ایجاد کننده', show: true, value:'user_name', order: false},
        { name: 'موبایل', show: true, value:'mobile', order: false},
        { name: 'تاریخ ایجاد', show: true, value:'created_at', order: true},
    ]);

    const filterField = [
        { name: 'شماره تیکت', type:'text', value:'code'},
        { name: 'عنوان تیکت', type:'text', value:'title'},
        { name:'تاریخ ایجاد', type: 'date', value:'created_at'},
        { name: 'وضعیت', type:'select', value:'status'},
        { name: 'اولویت', type:'select', value:'priority'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    /**
     * Get All tickets 
     * Can filter by `user_id`
     * @param {*} query 
     */
    async function getTicketList(query) {
        let paramsQuery = null
        loading.value = true
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')

        AxiosMethod.end_point = `ticket/admin/crud/index/${paramsQuery}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            allTickets.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    /**
     * Get a ticket information
     * @param {*} query 
     */
    async function getTicket() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `ticket/admin/crud/get/${route.params.ticketId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            oneTicket.value = data.data
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push(route.path + filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push(route.path + filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getTicketList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {oneTicket,header, item, loading, dataTableLength, pageLength, page, addPerPage,filterField, ticket, getTicket, allTickets, getTicketList }
}

