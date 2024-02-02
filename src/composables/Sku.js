import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { SkuPanelFilter } from '@/assets/js/filter_sku.js'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from "vue3-cookies";
export default function setup() {
    const skues = ref([]);
    const skuGroups =ref([])
    const skuGroup =ref(null)
    const shpssDetail =ref(null)
    const allSkus =ref([])
    const allSkuGroups =ref([])
    const skuGroupDetail =ref([])
    const sku = ref(null)
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

    const header = ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'شناسه', show: true, value: 'id', order:false },
        { name:'نام انگلیسی' , show:true , value:'name', order:true},
        { name:'نام فارسی' , show:true ,  value:'label', order:true},
        { name: 'گروه', show: true, value: 'sku_group', order:false },
        { name: 'دسته‌بندی', show: true, value: 'category', order:true },
        { name: ' برند', show: true, value: 'brand', order:true },
        { name: ' اندازه', show: true, value: 'volume', order:false },
        { name: ' رنگ', show: true, value: 'color', order:false },
        { name: 'فعال سازی', show: true , value:'is_active', order:false},
        { name: 'قابل فروش', show: true , value:'is_sellable', order:false},
        { name: 'محصول', show: true , value:'product', order:true},
    ]);

    const skuGroupsHeader = ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'شناسه', show: true, value: 'id', order:false },
        { name:'نام انگلیسی' , show:true , value:'name', order:true},
        { name:'نام فارسی' , show:true ,  value:'label', order:true},
        { name:'ساخت کالا' , show:true ,  value:'create_sku', order:false},
        { name:'مشاهده کالا' , show:true ,  value:'sku_list', order:false},
    ]);

    const skuGroupLoading =ref(false)

    const filterField = [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: ' رنگ', type: 'auto-complete', value: 'color' },
        { name: ' برند', type: 'auto-complete', value: 'brand' },
        { name: ' دسته بندی', type: 'auto-complete', value: 'category' },
        { name: 'فعال سازی ', type: 'select', value: 'active' },
        { name: 'قابل فروش', type: 'select', value: 'sellable' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new SkuPanelFilter()

    async function getSkues(query) {
        let paramsQuery = null
        loading.value = true
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')

        if(route.name === 'groupSkuList'){
            AxiosMethod.end_point = `product/sku/crud/index/${paramsQuery}&sku_group_id=${route.params.skuGroupId}`
        }
        else if(route.name === 'productSkuList'){
            AxiosMethod.end_point = `product/sku/crud/index/${paramsQuery}&product_id=${route.params.productId}`
        }
        else{
            AxiosMethod.end_point = `product/sku/crud/index/${paramsQuery}`
        }

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            skues.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getSkue() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'product/sku/crud/get/' + route.params.skuId
        let data = await AxiosMethod.axios_get()
        if (data) {
            sku.value = data.data
        }
    };
    async function getShpssDetail(id,) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'shps/item/detail?barcode=' + id
        let data = await AxiosMethod.axios_get()
        if (data) {
            shpssDetail.value = data.data
        }
    };
    async function getSkuGroup(skuGroupId) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/sku/group/crud/get/${skuGroupId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            skuGroup.value = data.data
        }
        else {
        }
    };
    async function getSkuGroups(productId) {
        skuGroupLoading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')

        AxiosMethod.end_point = `product/sku/group/crud/index?per_page=10000&product_id=${productId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            skuGroupLoading.value = false
            skuGroups.value = data.data
        }
        else {
            skuGroupLoading.value = false
        }
    };

    async function getAllSkuGroups(query) {
        let paramsQuery = null
        skuGroupLoading.value = true
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        

        if(route.name === 'productSkuGroupList'){
            AxiosMethod.end_point = `product/sku/group/crud/index/${paramsQuery}&product_id=${route.params.productId}`
        }
        else{
            console.log(paramsQuery)
            AxiosMethod.end_point = `product/sku/group/crud/index/${paramsQuery}`
        }

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            allSkuGroups.value = data.data
            skuGroupLoading.value = false
        }
        else {
            skuGroupLoading.value = false
        }
        setTimeout(()=>{
            isFilter.value =false
            isFilterPage.value = false
        } , 2000)
    };

    async function getSkuGroupDetail(skuGroupId ) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/sku/group/crud/get/statistics/${skuGroupId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            skuGroupDetail.value = data.data
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push(route.path + filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push(route.path + filter.params_generator(route.query))
    }


    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }

        if(route.name === 'groupSkuList' || route.name === 'productSkuList' || route.name === 'skuList'){
            await getSkues(to)
        }else if(route.name === 'productSkuGroupList' || route.name === 'skuGroupList'){
            await getAllSkuGroups(to)
        }
        
    })

    watch(page, function (val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })


    return { pageLength, skues, sku, getSkue, addPerPage, getSkues, allSkus, skuGroupLoading, getSkuGroups, skuGroups ,getSkuGroup, skuGroup,
        getSkuGroupDetail, skuGroupDetail, dataTableLength, page, header, item, filterField, loading, skuGroupsHeader, getAllSkuGroups, allSkuGroups ,
        getShpssDetail ,shpssDetail}
}

