import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

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
        { name: 'شناسه', show: true, value:'id', order: false},
        { name: 'عنوان', show: true, value:'label', order: false},
        { name: 'اولویت', show: true, value:'priority', order: false},
        { name: 'وضعیت', show: true, value:'status', order: false},
        { name: 'ایجاد کننده', show: true, value:'user_name', order: false},
        { name: 'موبایل', show: true, value:'mobile', order: false},
        { name: 'تاریخ ایجاد', show: true, value:'created_at', order: true},
    ]);

    const filterField = [
        { name:'شناسه' , type:'text', value:'id'},
        { name: 'شماره تیکت', type:'text', value:'code'},
        { name: 'عنوان تیکت', type:'text', value:'title'},
        { name: 'کاریر', type:'select', value:'user_id'},
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
    async function getTicketList() {
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
        AxiosMethod.end_point = `ticket/admin/crud/index/`

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
    }

    return {oneTicket,header, item, loading, dataTableLength, pageLength, page,filterField, ticket, getTicket, allTickets, getTicketList }
}

