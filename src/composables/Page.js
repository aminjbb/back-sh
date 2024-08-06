import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const pageList = ref([]);
    const templates =ref([])
    const pageSingle = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    //sliders variables
    const sliderList = ref([]);
    const skuList = ref([]);

    // Page table header
    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', align:'center', sortable: false},
        {name: 'عنوان', title: 'عنوان', show: true , key:'label', align:'center', sortable: false},
        {name: 'نوع صفحه ', title: 'نوع صفحه ', show: true, key:'type' , align:'center', sortable: false},
        {name: 'شناسه صفحه', title: 'شناسه صفحه', show: true , key:'id', align:'center', sortable: false},
        {name: 'تاریخ ساخت ',  title: 'تاریخ ساخت ', show: true, key:'created_at', align:'center'},
        {name: 'تاریخ ویرایش ', title: 'تاریخ ویرایش ', show: true, key:'updated_at', align:'center'},
        {name: 'ایندکس', title: 'ایندکس', show: true, key:'switch', align:'center', sortable: false},
        {name: 'follow', title: 'follow', show: true, key:'custom', align:'center', sortable: false},
        {name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        {name:'عنوان' , type:'text', value:'label'},
        { name: 'شناسه صفحه', type: 'text', value: 'id' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name: 'نوع صفحه', type:'select', value:'type'},
        { name: 'ایندکس', type:'select', value:'is_index'},
        { name: 'follow', type:'select', value:'is_follow'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

     // image table header
    const imageHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'تصویر', show: true , value:'label', order: false},
        { name: 'دستگاه', show: true, value:'type' , order: false},
        { name: 'موقعیت', show: true , value:'id', order: false},
        { name: 'ترتیب نمایش ', show: true, value:'created_at', order: true },
        { name: 'ذخیره ', show: true, value:'updated_at', order: true },
    ]);

    // slider table header
    const SliderHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام انگلیسی', show: true , value:'name', order: false},
        { name: 'نام فارسی', show: true, value:'label' , order: false},
        { name: 'جایگاه', show: true , value:'position', order: false},
        { name: 'آیکن', show: true, value:'icon', order: false },
        //{ name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);

     // slider skus table header
     const SliderSkuHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'SHPS', show: true, value:'shps' , order: false},
        { name: 'ترتیب نمایش', show: true , value:'sort', order: false},
        { name: 'ذخیره', show: true, value:'save' , order: false},
    ]);
    
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    /**
     * Get page list
     * @param {*} query 
     */
    async function getPageList() {
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
        AxiosMethod.end_point = `page/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            pageList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    /**
     * Get Single page
     */
    async function getPage(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/crud/get/${route.params.pageId}`;
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageSingle.value = data.data;
        }
    }

    /**
     * Get page template
     */
    async function getTemplates(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/template/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            templates.value = data.data.data
        }
    }

    /**
     * Get slider list
     * @param {*} query 
     */
    async function getSliderList() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
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
        AxiosMethod.end_point = `page/slider/crud/index/?page_id=${route.params.pageId}`
        let data = await AxiosMethod.axios_get()

        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            sliderList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };

    /**
     * Get slider's sku list
     * @param {*} query 
     */
    async function getSliderSkuList() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
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
        AxiosMethod.end_point = `page/slider/crud/get/${route.params.sliderId}`
        let data = await AxiosMethod.axios_get()
        
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            skuList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    return {
        templates,
        getTemplates,
        pageSingle ,
        getPage ,
        imageHeader ,
        pageLength,
        filterField,
        pageList ,
        getPageList,
        dataTableLength,
        page,
        header,
        loading,
        SliderHeader,
        getSliderList,
        sliderList,
        SliderSkuHeader,
        getSliderSkuList,
        skuList
    }
}

