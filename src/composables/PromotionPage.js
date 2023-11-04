import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_menu.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const promotions =ref([])
    const promotion = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام انگلیسی', show: true , value:'name', order: false},
        { name: 'نام فارسی', show: true , value:'label', order: false},
        { name: 'شناسه صفحه', show: true, value:'id' , order: false},
        { name: 'تاریخ ساخت', show: true , value:'created_at', order: true},
        { name: 'تاریخ ویرایش', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);
    const skuGroupHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام کالا', show: true , value:'name', order: false},
        { name: 'شناسه کالا', show: true , value:'label', order: false},
        { name: 'ترتیب نمایش', show: true, value:'id' , order: false},
    ]);


    const filterField = [
        {name:'نام فارسی' , type:'text', value:'label'},
        { name:'نام انگلیسی' , type: 'text', value:'name'},
        { name: 'منو مادر', type:'select', value:'menu'},
        { name: 'آیکون', type:'select', value:'has_icon'},
        { name: 'تصویر', type:'select', value:'has_image'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getPromotions(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/promotion/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            promotions.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };
    async function getPromotion(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/menu/crud/get/${route.params.menuId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            promotion.value = data.data
        }

        else {
        }
    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/promotion-page/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/promotion-page/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getPromotions(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {promotion , promotions , getPromotion ,getPromotions, pageLength, filterField ,addPerPage, dataTableLength, page, header,skuGroupHeader , loading }
}

