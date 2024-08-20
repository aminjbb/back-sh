import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const contactUsList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Page table header
    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', sortable: false, align: 'center'},
        {name: ' نام و نام خانوادگی', title: ' نام و نام خانوادگی', show: true , key:'full_name', sortable: false, align: 'center'},
        {name: '  شماره موبایل', title: '  شماره موبایل', show: true , key:'phone_number', sortable: false, align: 'center'},
        {name: ' عنوان', title: ' عنوان', show: true, key:'subject' , sortable: false, align: 'center'},
        {name: ' تاریخ ایجاد', title: ' تاریخ ایجاد', show: true, key:'created_at', align: 'center'},
        {name: 'مشاهده', title: 'مشاهده', show: true, key:'show', sortable: false, align: 'left'},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    /**
     * Get page list
     * @param {*} query
     */
    async function getContactUs() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
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
        AxiosMethod.end_point = `user/contact-us/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            contactUsList.value = data.data.data

            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/contact-us/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/contact-us/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {
        pageLength, contactUsList ,addPerPage, getContactUs,
        dataTableLength, page, header, loading
    }
}

