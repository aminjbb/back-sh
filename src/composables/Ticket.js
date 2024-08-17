import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const ticket = ref([]);
    const subTitleTicket = ref([]);
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
        { name: 'عنوان', title: 'عنوان', show: true, key:'title', align:'center', sortable: false},
        { name: 'اولویت', title: 'اولویت', show: true, key:'priority', align:'center', sortable: false,},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'custom', align:'center', sortable: false},
        { name: 'ایجاد کننده', title: 'ایجاد کننده', show: true, key:'user_name', align:'center', sortable: false,},
        { name: 'موبایل', title: 'موبایل', show: true, key:'mobile', align:'center', sortable: false},
        { name: 'تاریخ ایجاد', title: 'تاریخ ایجاد', show: true, key:'created_at', align:'center'},
        { name: 'تاریخ آخرین پیام', title: 'تاریخ آخرین پیام', show: true, key:'latest_date', align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'show', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const headerSubTicket =ref([
        { name: 'ردیف', title: 'ردیف', show: true, key:'row', sortable: false, align: 'center'},
        { name: 'شناسه', title: 'شناسه', show: true, key:'id', sortable: false, align: 'center'},
        { name: 'عنوان موضوع', title: 'عنوان موضوع', show: true, key:'subject', sortable: false, align: 'center'},
        { name: 'سازنده', title: 'سازنده', show: true, key:'creator', sortable: false, align: 'center'},
        { name: 'تاریخ ساخت', title: 'تاریخ ساخت', show: true, key:'created_at', align: 'center'},
        { name: 'نمایش', title: 'نمایش', show: true, key:'show', sortable: false, align: 'center'},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center'},
    ]);

    const filterField = [
        { name:'شناسه' , type:'text', value:'id'},
        { name: 'شماره تیکت', type:'text', value:'code'},
        { name: 'عنوان تیکت', type:'text', value:'title'},
        { name: 'کاربر', type:'select', value:'user_id'},
        { name:'تاریخ ایجاد', type: 'date', value:'created_at'},
        { name: 'وضعیت', type:'select', value:'status'},
        { name: 'اولویت', type:'select', value:'priority'},
    ];

    const filterFieldSubTitleTicket = [
        { name:'شناسه' , type:'text', value:'id'},
        { name: 'عنوان موضوع', type:'text', value:'title'},
        { name: 'سازنده', type:'select', value:'creator'},
        { name:'تاریخ ساخت', type: 'date', value:'created_at'},
        { name:'تاریخ به روزرسانی', type: 'date', value:'updated_at'},
        { name: 'وضعیت', type:'select', value:'status'},
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

    async function getAllSubTitleTicket() {
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
            subTitleTicket.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

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
        getTicketList,
        headerSubTicket,
        subTitleTicket,
        getAllSubTitleTicket,
        filterFieldSubTitleTicket
    }
}

