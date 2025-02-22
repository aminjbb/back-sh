import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const menus =ref([])
    const allMenu =ref([])
    const menu = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    // const header =ref([
    //     { name: 'ردیف', show: true , value:null, order:false},
    //     { name: 'نام فارسی', show: true , value:'label', order: false},
    //     { name: 'نام انگلیسی', show: true , value:'name', order: false},
    //     { name: 'سطح', show: true, value:'level' , order: false},
    //     { name: 'منو مادر', show: true , value:'menu', order: false},
    //     { name: 'اولویت', show: true, value:'priority', order: true },
    //     { name: 'وضعیت', show: true, value:'is_active', order: false },
    // ]);
    const header =ref([
        { name: 'ردیف',  title: 'ردیف', show: true , key:'row', sortable: false, align: 'right'},
        { name: 'نام فارسی',  title: 'نام فارسی', show: true , key:'label', sortable: false, align: 'right'},
        { name: 'نام انگلیسی',  title: 'نام انگلیسی', show: true , key:'name', sortable: false, align: 'right'},
        { name: 'سطح', title: 'سطح', show: true, key:'level' , sortable: false, align: 'right'},
        { name: 'منو مادر', title: 'منو مادر', show: true , key:'menu', sortable: false, align: 'right'},
        { name: 'اولویت', title: 'اولویت', show: true, key:'priority', align: 'right' },
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'custom', sortable: false, align: 'right' },
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);


    const filterField = [
        {name:'نام فارسی' , type:'text', value:'label'},
        { name:'نام انگلیسی' , type: 'text', value:'name'},
        { name: 'منو مادر', type:'select', value:'menu_id'},
        { name: 'آیکون', type:'select', value:'icon'},
        { name: 'تصویر', type:'select', value:'image_id'},
        {name:'سطح' , type:'text', value:'level'},
        {name:'اولویت' , type:'text', value:'priority'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getMenus() {
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

    return {allMenu, getAllMenu,getMenus , getMenu , menu , menus , pageLength, filterField , dataTableLength, page, header, loading }
}

