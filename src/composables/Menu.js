import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_menu.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const menus =ref([])
    const allMenu =ref([])
    const menu = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام فارسی', show: true , value:'label', order: false},
        { name: 'نام انگلیسی', show: true , value:'name', order: false},
        { name: 'سطح', show: true, value:'level' , order: false},
        { name: 'منو مادر', show: true , value:'menu', order: false},
        { name: 'اولویت', show: true, value:'priority', order: true },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);


    const filterField = [
        {name:'نام فارسی' , type:'text', value:'label'},
        { name:'نام انگلیسی' , type: 'text', value:'name'},
        { name: 'منو مادر', type:'select', value:'menu_id'},
        { name: 'آیکون', type:'select', value:'icon'},
        { name: 'تصویر', type:'select', value:'image_id'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getMenus() {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.form = {...route.query}
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/menu/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            menus.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };
    async function getAllMenu() {
        const filter = {
            per_page:10000
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.form  = filter
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/menu/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            allMenu.value = data.data.data

        }

        else {
        }
    };
    async function getMenu(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `system/menu/crud/get/${route.params.menuId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            menu.value = data.data
        }

        else {
        }
    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/menu/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/menu/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {allMenu, getAllMenu,getMenus , getMenu , menu , menus , pageLength, filterField ,addPerPage, dataTableLength, page, header, loading }
}

