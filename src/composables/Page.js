import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_page.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const pageList = ref([]);
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
        { name: 'عنوان', show: true , value:'label', order: false},
        { name: 'نوع صفحه ', show: true, value:'type' , order: false},
        { name: 'شناسه صفحه', show: true , value:'id', order: false},
        { name: 'تاریخ ساخت ', show: true, value:'created_at', order: true },
        { name: 'تاریخ ویرایش ', show: true, value:'updated_at', order: true },
        { name: 'ایندکس', show: true, value:'is_index', order: false },
        { name: 'follow', show: true, value:'is_follow', order: false },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
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
    const filter = new PanelFilter()

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
            pageList.value = data.data
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
    function addPerPageSlider(number){
        filter.page = 1
        filter.per_page =number
        router.push('/page/' +route.params.pageId+ '/sliders/index'+ filter.params_generator(route.query))
    }

    return {templates, getTemplates,pageSingle , getPage ,
        imageHeader , pageLength, filterField, pageList , getPageList,
        dataTableLength, page, header, loading, SliderHeader,getSliderList, sliderList,
        SliderSkuHeader, getSliderSkuList, skuList, addPerPageSlider }
}

