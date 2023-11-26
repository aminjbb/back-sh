import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import {useCookies } from 'vue3-cookies'
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'

export default function setup(posts) {
    const exports = ref([]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const date = ref()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header = [
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'شناسه' , show:true, value:'created_at', order:false},
        {name:'عنوان' , show:true, value:'model', order:false},
        {name:' تاریخ ساخت' , show:true, value:'created_at', order:false},
        {name:'دریافت خروجی' , show:true, value:'download', order:false},
    ];

    const filterField = [
        {name:' تاریخ ساخت' , type:'text', value:'name'},
        {name:'نام ' , type:'text', value:'label'},
    ];

    const item = []
    const loading = ref(false)

    function addPagination(page){
        const filter = new ExportPanelFilter()

        if (route.query.from_date) {
            filter.fromDate =route.query.to_date
        }
        if (route.query.to_date) {
            filter.toDate =route.query.to_date
        }
        if (route.query.model) {
            filter.model =route.query.model
        }
        filter.page = page
        filter.per_page = dataTableLength.value
       router.push('/exports/index'+ filter.query_maker())
    }

    async function  getOneExports() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'export/crud/get/' + this.$route.params.id
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            window.open(data.data.download_url);
            this.$router.go(-1)
        }
    };

    async function  getExports(query ) {
        loading.value = true
        var formdata  ={}
        if (query) {
            var formdata  = query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'export/crud/index'
        AxiosMethod.form = formdata
        AxiosMethod.using_auth =  true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            exports.value = data.data
            loading.value = false
        }
        else {
            loading.value = false
        }
    };

    function addPerPage(number){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }

        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = 1;
        page.value = 1;
        filter.per_page = number
        router.push('/exports/index/'+ filter.query_maker())

    }
    
    watch(page, function(val) {
        addPagination(val)
    })
    
    return {date, pageLength, exports, getOneExports,addPerPage,  getExports , dataTableLength , page  , header , item , filterField , loading}
}

