import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const cargoList = ref([]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)

    const header = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه کارگو' , show:true , value:'created_at', order: false},
        {name:'نوع خودرو' , show:true , value:'name', order: false},
        {name:'شماره پلاک' , show:true ,  value:'label', order: false},
        {name:'نام راننده ' , show:true, value:'is_active', order: false},
        {name:'شماره موبایل راننده' , show:true, value:'is_active', order: false},
        {name:'تعداد بسته' , show:true, value:'is_active', order: false},
        {name:'تاریخ ساخت' , show:true, value:'is_active', order: false},
        {name:'تاریخ ویرایش' , show:true, value:'is_active', order: true},
        {name:'تاریخ ویرایش' , show:true, value:'is_active', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: false},
    ]);

    const packageHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'created_at', order: false},
        {name:'نوع بسته' , show:true , value:'name', order: false},
        {name:'تعداد کالا' , show:true ,  value:'label', order: false},
        {name:'وضعیت ' , show:true, value:'is_active', order: false},
    ]);

    const cargoReceivingHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'created_at', order: false},
        {name:'نام فروشگاه' , show:true , value:'name', order: false},
        {name:'نوع بسته' , show:true ,  value:'label', order: false},
        {name:'تعداد آیتم ' , show:true, value:'is_active', order: false},
        {name:'تعداد کالا ' , show:true, value:'is_active', order: false},
        {name:'وضعیت ' , show:true, value:'is_active', order: false},
    ]);



    const filterField = [
        {name:'شناسه کارگو' , type:'text', value:'name'},
        {name:'نوع خودرو' , type:'text', value:'label'},
        {name:'شماره پلاک ' , type:'text', value:'active'},
        { name:'نام راننده' , type: 'text', value:'created_at'},
        { name:'تعداد بسته(از)' , type: 'text', value:'updated_at'},
        { name:'تعداد بسته(تا)' , type: 'text', value:'updated_at'},
        { name:'تاریخ ساخت' , type: 'text', value:'updated_at'},
        { name:'تاریخ ویرایش' , type: 'date', value:'updated_at'},
        { name:'وضعیت' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getCargoList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `category/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            categoreis.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };


    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/categories/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/categories/index'+ filter.params_generator(route.query))
    }


    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getCategories(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , header , item , filterField ,
        loading , packageHeader , cargoReceivingHeader}
}

