import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const homeSections = ref([]);
    const homeSection = ref(null);
    const homeSlider = ref(null)
    const homeBrand = ref([])
    const homePageBanner = ref([])
    const homePageCategory = ref([])
    const homePageSingleCategory = ref([])
    const homePageSingleSlider = ref([])
    const homePartitionSlider = ref([])
    const homeSinglePartitionSlider = ref(null)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()
    const sectionsHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام', show: true , value:'label', order: false},
        { name: 'عنوان', show: true, value:'title' , order: false},
        { name: 'نوع', show: true , value:'type', order: false},
        { name: 'تاریخ ویرایش', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);
    const bannerHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'تصویر', show: true , value:'image', order: false},
        { name: 'دستگاه', show: true, value:'device_type' , order: false},
        { name: 'لینک', show: true , value:'link', order: false},
        { name: 'ترتیب نمایش', show: true, value:'priority', order: false },
        { name: 'سازنده', show: true, value:'admin', order: false },
        { name: 'ذخیره', show: true, value:'save', order: false },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
        { name: 'زمان ویرایش', show: false, value:'updated_at', order: false },
        { name: 'زمان شروع', show: false, value:'started_at', order: false },
        { name: 'زمان پایان', show: false, value:'end_at', order: false },
    ]);
    const brandHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'تصویر', show: true , value:'image', order: false},
        { name: 'نام برند', show: true, value:'name' , order: false},
        { name: 'لینک', show: true , value:'link', order: false},
        { name: 'ترتیب نمایش', show: true, value:'priority', order: false },
        { name: 'سازنده', show: true, value:'admin', order: false },
        { name: 'ذخیره', show: true, value:'save', order: false },

    ]);
    const categoryHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'عنوان', show: true , value:'image', order: false},
        { name: 'ترتیب نمایش', show: true, value:'name' , order: false},
        { name: 'سازنده', show: true , value:'link', order: false},
        { name: 'دخیره', show: true , value:'link', order: false},

    ]);
    const homePageSkuHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه کالا', show: true , value:'id', order: false},
        { name: 'شناسه shps', show: true, value:'shps' , order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'نام فروشنده', show: true , value:'seller', order: false},
        { name: 'قیمت فروش', show: true , value:'site_price', order: false},
        { name: 'ترتیب نمایش', show: true , value:'priority', order: false},
        { name: 'ذخیره', show: true , value:'save', order: false},
    ]);
    const specialSalesHeader=ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'عنوان', show: true , value:'title', order: false},
        { name: 'زمان شروع', show: true, value:'start_date' , order: false},
        { name: 'زمان پایان', show: true , value:'end_date', order: false},
        { name: 'سازنده', show: true, value:'admin', order: false },
        { name: 'وضعیت', show: true, value:'status', order: false },
    ])

    const specialSalesShpsHeader=ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه کالا', show: true , value:'title', order: false},
        { name: 'شناسه shps', show: true, value:'start_date' , order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'نام فروشنده', show: true, value:'seller', order: false },
        { name: 'ترتیب نمایش', show: true, value:'priority', order: false },
        { name: 'ذخیره', show: true, value:'save', order: false },
    ])
    const filterBannerField = [
        {name:'دستگاه' , type:'select', value:'device_type'},
        {name:'زمان شروع' , type:'date', value:'start_date'},
        {name:'زمان پایان ' , type:'date', value:'end_date'},
        { name:'سازنده' , type: 'select', value:'admin'},
        { name:'ترتیب نمایش' , type: 'text', value:'priority'},
        { name:'وضعیت' , type: 'select', value:'active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getHomeSections() {
        loading.value = true
        const filter = {
            per_page:dataTableLength.value
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/crud/index`
        AxiosMethod.form=filter
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homeSections.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };

    async function getHomeSection() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/crud/get/${route.params.sectionId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            homeSection.value = data.data
        }
        else {
        }
    };
    async function getHomePageBanner() {
        const filter = {
            homepage_section_id: route.params.sectionId
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.form = filter
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/banner/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homePageBanner.value = data.data
        }

        else {
        }
    };
    async function getHomeSlider() {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/slider/get/${route.params.specialId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homeSlider.value = data.data
        }

        else {
        }
    };
    async function getHomeBrand() {

        const filter = {
            homepage_section_id: route.params.sectionId
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.form = filter
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/brand/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homeBrand.value = data.data
        }

        else {
        }
    };
    async function getHomePageCategory() {

        const filter = {
            homepage_section_id: route.params.sectionId
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.form = filter
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/category/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homePageCategory.value = data.data
        }

        else {
        }
    };
    async function getHomePageSingleCategory() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/category/get/${route.params.categoryId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            homePageSingleCategory.value = data.data
        }

        else {
        }
    };
    async function getHomePageSingleSlider() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/slider/get/${route.params.specialId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            homePageSingleSlider.value = data.data
        }

        else {
        }
    };
    async function getHomePartitionSlider(sliderId) {
        const filter = {
            slider_id: sliderId
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/slider/partition/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homePartitionSlider.value = data.data
        }

        else {
        }
    };

    async function getHomeSinglePartitionSlider() {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/slider/partition/${route.params.partitionId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            homeSinglePartitionSlider.value = data.data
        }

        else {
        }
    };
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/home/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/home/index'+ filter.params_generator(route.query))
    }


    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {getHomeSection, getHomeSections,pageLength,filterBannerField, homeSection,homeSections
        ,addPerPage, dataTableLength, page, sectionsHeader,loading , bannerHeader ,specialSalesHeader
        ,specialSalesShpsHeader,getHomeBrand , homeBrand , getHomeSlider, homeSlider , brandHeader ,
        getHomePartitionSlider , homePartitionSlider , getHomePageCategory , homePageCategory , categoryHeader ,
        getHomePageSingleCategory , homePageSingleCategory , homePageSkuHeader , getHomePageBanner ,homePageBanner ,
        homePageSingleSlider ,getHomePageSingleSlider , getHomeSinglePartitionSlider , homeSinglePartitionSlider}
}

