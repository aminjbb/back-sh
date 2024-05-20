import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { SkuPanelFilter } from '@/assets/js/filter_sku.js'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
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
        { name: 'شناسه', show: true, value: 'id', order:true },
        { name:'نام انگلیسی' , show:true , value:'name', order:true},
        { name:'نام فارسی' , show:true ,  value:'label', order:true},
        { name: 'گروه', show: true, value: 'sku_group', order:false },
        { name: 'دسته‌بندی', show: true, value: 'category', order:false },
        { name: ' برند', show: true, value: 'brand', order:false },
        { name: ' اندازه', show: true, value: 'volume', order:false },
        { name: ' رنگ', show: true, value: 'color', order:false },
        { name: 'فعال سازی', show: true , value:'is_active', order:false},
        { name: 'قابل فروش', show: true , value:'is_sellable', order:false},
        { name: 'محصول', show: true , value:'product', order:false},
    ]);

    const skuGroupsHeader = ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'شناسه', show: true, value: 'id', order:true },
        { name:'نام انگلیسی' , show:true , value:'name', order:true},
        { name:'نام فارسی' , show:true ,  value:'label', order:true},
        { name:'ساخت کالا' , show:true ,  value:'create_sku', order:false},
        { name:'مشاهده کالا' , show:true ,  value:'sku_list', order:false},
    ]);

    const skuGroupLoading =ref(false)

    const filterField = [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'گروه', type: 'text', value: 'group' },
        { name: 'شناسه کالا', type: 'text', value: 'id' },
        { name: 'محصول', type: 'auto-complete', value: 'product_id' },
        { name: ' دسته بندی', type: 'auto-complete', value: 'category_id' },
        { name: ' برند', type: 'auto-complete', value: 'brand_id' },
        { name: ' رنگ', type: 'auto-complete', value: 'color_id' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
        { name: 'فعال سازی ', type: 'select', value: 'is_active' },
        // { name: 'قابل فروش', type: 'select', value: 'sellable' },
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new SkuPanelFilter()

    async function getSkues() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')

        if(route.name === 'groupSkuList'){
            // AxiosMethod.end_point = `product/sku/crud/index/${paramsQuery}&sku_group_id=${route.params.skuGroupId}`
            AxiosMethod.end_point = `product/sku/crud/index/`
        }
        else if(route.name === 'productSkuList'){
            // AxiosMethod.end_point = `product/sku/crud/index/${paramsQuery}&product_id=${route.params.productId}`
            AxiosMethod.end_point = `product/sku/crud/index/`
        }
        else{
            AxiosMethod.end_point = `product/sku/crud/index/`
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
    async function getShpssDetail(id) {
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

    async function getAllSkuGroups() {
        skuGroupLoading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        

        if(route.name === 'productSkuGroupList'){
            // AxiosMethod.end_point = `product/sku/group/crud/index/${paramsQuery}&product_id=${route.params.productId}`
            AxiosMethod.end_point = `product/sku/group/crud/index/`
        }
        else{
            AxiosMethod.end_point = `product/sku/group/crud/index/`
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
    }

    return { pageLength, skues, sku, getSkue, getSkues, allSkus, skuGroupLoading, getSkuGroups, skuGroups ,getSkuGroup, skuGroup,
        getSkuGroupDetail, skuGroupDetail, dataTableLength, page, header, item, filterField, loading, skuGroupsHeader, getAllSkuGroups, allSkuGroups ,
        getShpssDetail ,shpssDetail}
}

