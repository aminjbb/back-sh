import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const ticket = ref([]);
    const oneTicket =ref(null)
    const allTickets = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', title: 'ردیف', show: true, key:'row', align:'center', sortable: false},
        { name: 'شماره', title: 'شماره', show: true, key:'ticket_number', align:'center', sortable: false},
        { name: 'شناسه', title: 'شناسه', show: true, key:'id', align:'center', sortable: false},
        { name: 'موضوع', title: 'موضوع', show: true, key:'title', align:'center', sortable: false},
        { name: 'زیر موضوع', title: 'زیر موضوع', show: true, key:'sub_title', align:'center', sortable: false},
        { name: 'اولویت', title: 'اولویت', show: true, key:'priority', align:'center', sortable: false,},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'custom', align:'center', sortable: false},
        { name: 'کاربر', title: 'کاربر', show: true, key:'user_name', align:'center', sortable: false,},
        { name: 'موبایل', title: 'موبایل', show: true, key:'mobile', align:'center', sortable: false},
        { name: 'ادمین', title: 'ادمین', show: true, key:'admin', align:'center', sortable: false,},
        { name: 'امتیاز کاربر', title: 'امتیاز کاربر', show: true, key:'custom2', align:'center', sortable: false,},
        { name: 'تاریخ ایجاد', title: 'تاریخ ایجاد', show: true, key:'created_at', align:'center'},
        { name: 'تاریخ آخرین پیام', title: 'تاریخ آخرین پیام', show: true, key:'latest_date', align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'show', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        { name:'شناسه' , type:'text', value:'id'},
        { name: 'شماره تیکت', type:'text', value:'code'},
        { name: 'اولویت', type:'select', value:'priority'},
        { name: 'کاربر', type:'select', value:'user_id'},
        { name:'تاریخ ایجاد', type: 'date', value:'created_at'},
        { name: 'وضعیت', type:'select', value:'status'},
        { name: 'موضوع', type:'select', value:'parent_topic_id'},
        { name: 'زیر موضوع', type:'select', value:'topic_id'},
        { name: 'ادمین', type:'auto-complete', value:'admin_id'},
        { name: 'امتیاز کاربر', type:'select', value:'rate'}
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

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

    return {
        oneTicket,
        header,
        item,
        loading,
        dataTableLength,
        pageLength,
        page,
        filterField,
        ticket,
        getTicket,
        allTickets,
        getTicketList
    }
}

