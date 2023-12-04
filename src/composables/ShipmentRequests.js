import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_page.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const ShipmentRequestsList = ref([]);
    const templates =ref([])
    const pageSingle = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    //sliders variables
    const sliderList = ref([]);
    const skuList = ref([]);
    const sku = ref([]);

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه محموله', show: true , value:'label', order: false},
        { name: 'نوع محموله', show: true, value:'type' , order: false},
        { name: ' تعداد آیتم', show: true , value:'id', order: false},
        { name: 'تنوع آیتم', show: true, value:'created_at', order: true },
        { name: 'نام فروشگاه ', show: true, value:'updated_at', order: true },
        { name: 'نام سازنده', show: true, value:'is_index', order: false },
        { name: 'تاریخ ارسال', show: true, value:'sent_at', order: false },
        { name: 'تاریخ ویرایش ', show: true, value:'updated_at', order: false },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);

    const filterField = [
        { name:' شناسه محموله' , type: 'text', value:'id'},
        { name:' تعداد آیتم' , type: 'number', value:'shps_count_from'},
        { name:' تعداد آیتم' , type: 'number', value:'shps_count_to'},
        { name: ' نام سازنده', type:'select', value:'creator'},
        { name: 'تنوع آیتم', type:'number', value:'shps_variety_from'},
        { name: 'تنوع آیتم', type:'number', value:'shps_variety_to'},
        { name: 'نوع محموله', type:'select', value:'type'},
        { name: ' تاریخ ارسال', type:'date', value:'sent_to_warehouse_at'},
        { name: 'وضعیت', type:'select', value:'status'},
    ];

     // image table header
    // const imageHeader =ref([
    //     { name: 'ردیف', show: true , value:null, order:false},
    //     { name: 'تصویر', show: true , value:'label', order: false},
    //     { name: 'دستگاه', show: true, value:'type' , order: false},
    //     { name: 'موقعیت', show: true , value:'id', order: false},
    //     { name: 'ترتیب نمایش ', show: true, value:'created_at', order: true },
    //     { name: 'ذخیره ', show: true, value:'updated_at', order: true },

    // ]);

    // slider table header
    // const SliderHeader =ref([
    //     { name: 'ردیف', show: true , value:null, order:false},
    //     { name: 'نام انگلیسی', show: true , value:'name', order: false},
    //     { name: 'نام فارسی', show: true, value:'label' , order: false},
    //     { name: 'جایگاه', show: true , value:'position', order: false},
    //     { name: 'آیکن', show: true, value:'icon', order: false },
    //     //{ name: 'وضعیت', show: true, value:'is_active', order: false },
    // ]);

     // slider skus table header
    //  const SliderSkuHeader =ref([
    //     { name: 'ردیف', show: true , value:null, order:false},
    //     { name: 'نام کالا', show: true , value:'label', order: false},
    //     { name: 'SHPS', show: true, value:'shps' , order: false},
    //     { name: 'ترتیب نمایش', show: true , value:'sort', order: false},
    //     { name: 'ذخیره', show: true, value:'save' , order: false},

    // ]);
    
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    /**
     * Get page list
     * @param {*} query 
     */
    async function getShipmentRequestsList(query) {
        loading.value = true
        // const customQueryParams = {
        //     status: 'in_review',
        //     id: 1,
        //     factor_id: 2,
        //     creator_id: 4,
        //     created_at_from_date: '2024-09-07',
        //     // Add 'created_at_to_date' with a value if needed
        // };
    
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `cargo/crud/index?${paramsQuery}`

        let data = await AxiosMethod.axios_get()
        console.log("API Response1:", data)
        console.log("Requesting URL:", AxiosMethod.end_point); // Log the full URL

        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            ShipmentRequestsList.value = data.data
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
        AxiosMethod.end_point = `cargo/crud/get/${route.params.pageId}`
        let data = await AxiosMethod.axios_get()
        AxiosMethod.end_point = `cargo/crud/get/${route.params.pageId}`; 
        console.log("API Response2:", data)

        if (data) {
            pageSingle.value = data.data
        }

        else {
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

        else {
        }
    }

    /**
     * Get page image
     */
    async function getPageImages(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            ShipmentRequestsList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    }

    /**
     * Get slider list
     * @param {*} query 
     */
    async function getSliderList(query) {
        loading.value = true
        let endPoint = ''
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        if (paramsQuery){
            endPoint= `page/slider/crud/index/${paramsQuery}&page_id=${route.params.pageId}`
        }
        else {
            endPoint= `page/slider/crud/index/?page_id=${route.params.pageId}`
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = endPoint
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

        else {
        }
    };

    /**
     * Get slider's sku list
     * @param {*} query 
     */
    async function getSliderSkuList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
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

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/page/index'+ filter.params_generator(route.query))
    }
    function addPerPageSlider(number){
        filter.page = 1
        filter.per_page =number
        router.push('/page/' +route.params.pageId+ '/sliders/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/page/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        if (route.name === 'pageSliders') await getSliderList(to)
        else await getPageList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {templates, getTemplates,pageSingle , getPageImages, getPage ,
         pageLength, filterField, ShipmentRequestsList ,addPerPage, getShipmentRequestsList,
        dataTableLength, page, header, loading,getSliderList, sliderList,
         getSliderSkuList, skuList, addPerPageSlider }
}

