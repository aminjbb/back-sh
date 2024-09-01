import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const subTitleTicket = ref([]);
    const subTitleEdit =ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', title: 'ردیف', show: true, align:'center', sortable: false, key: 'row'},
        { name: 'شناسه', title: 'شناسه', show: true, align:'center', key: 'id'},
        { name: 'عنوان موضوع', title: 'عنوان موضوع', show: true, align:'center', key: 'title'},
        { name: 'سازنده', title: 'سازنده', show: true, align:'center', key: 'creator'},
        { name: 'تاریخ ساخت', title: 'تاریخ ساخت', show: true, align:'center', key: 'created_at'},
        { name: 'نمایش', title: 'نمایش', show: true, align:'center', key: 'show'},
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center'},
        { name: 'عملیات',title: 'عملیات', show: true, align:'center', sortable: false, key:'action',minWidth:'50', fixed: true}
    ]);

    const filterField = [
        { name:'شناسه' , type:'text', value:'id'},
        { name: 'عنوان موضوع', type:'text', value:'title'},
        { name: 'سازنده', type:'auto-complete', value:'creator_id'},
        { name:'تاریخ ساخت', type: 'date', value:'created_at'},
        { name:'تاریخ به روزرسانی', type: 'date', value:'updated_at'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

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
        AxiosMethod.end_point = 'ticket/topic/crud/index'

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

    async function getSubTitle () {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `ticket/topic/crud/get/${route.params.id}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            subTitleEdit.value = data.data
        }

    }

    return {
        header,
        filterField,
        dataTableLength,
        page,
        subTitleTicket,
        getAllSubTitleTicket,
        getSubTitle,
        subTitleEdit
    }
}

