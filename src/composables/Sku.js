import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
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
    const route = useRoute()

/*    const header = ref([
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
        { name: 'قابل فروش', show: true , value:'switch', order:false},
        { name: 'محصول', show: true , value:'product', order:false},
    ]);*/

    const header = ref([
        { name: 'ردیف', title: 'ردیف', show: true, align:'center', sortable: false, key: 'row',minWidth:'50'},
        { name: 'شناسه', title: 'شناسه', show: true, align:'center', key: 'id',minWidth:'50'},
        { name:'نام انگلیسی', title:'نام انگلیسی' , show:true, align:'center', key:'name', minWidth:'200'},
        { name:'نام فارسی', title:'نام فارسی' , show:true, align:'center', key:'label', minWidth:'200'},
        { name: 'گروه', title: 'گروه', show: true, align:'center', sortable:false, key: 'sku_group', minWidth:'200'},
        { name: 'دسته‌بندی', title: 'دسته‌بندی', show: true, align:'center', sortable:false, key: 'category',  minWidth:'100'},
        { name: ' برند', title: ' برند', show: true, align:'center', sortable:false, key: 'brand', minWidth:'100'},
        { name: ' اندازه', title: ' اندازه', show: true, align:'center', sortable:false,  key: 'custom', minWidth:'100'},
        { name: ' رنگ', title: ' رنگ', show: true, align:'center', sortable:false, key: 'color', minWidth:'100'},
        { name: 'فعال سازی', title: 'فعال سازی', show: true , align:'center', sortable:false, key: 'is_active', minWidth:'150'},
        { name: 'قابل فروش', title: 'قابل فروش', show: true , align:'center', sortable:false, key: 'switch', minWidth:'150'},
        { name: 'محصول', title: 'محصول', show: true, align:'center', sortable:false, key :'product',  minWidth:'150'},
        { name: 'عملیات',title: 'عملیات', show: true, align:'center', sortable: false, key:'action',minWidth:'50', fixed: true},

    ]);

    const skuGroupsHeader = ref([
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row', align:'center', sortable: false},
        { name: 'شناسه',title: 'شناسه', show: true, key: 'id', align:'center'},
        { name:'نام انگلیسی',title:'نام انگلیسی' , show:true , key:'name', align:'center'},
        { name:'نام فارسی' ,title:'نام فارسی' , show:true ,  key:'label', align:'center'},
        { name:'ساخت کالا' ,title:'ساخت کالا' , show:true ,  key:'custom',align:'center', sortable: false,},
        { name:'مشاهده کالا' ,title:'مشاهده کالا' , show:true ,  key:'show', align:'center', sortable: false,},
        { name: 'عملیات',title: 'عملیات', show: true, align:'center', sortable: false, key:'action',minWidth:'50', fixed: true},
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

    async function getSkues() {
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

