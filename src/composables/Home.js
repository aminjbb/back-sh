import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
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
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', sortable: false, align: 'center'},
        {name: 'نام', title: 'نام', show: true , key:'label', sortable: false, align: 'center'},
        {name: 'عنوان', title: 'عنوان', show: true, key:'title' , sortable: false, align: 'center'},
        {name: 'نوع',  title: 'نوع', show: true , key:'type', sortable: false, align: 'center'},
        {name: 'تاریخ ویرایش', title: 'تاریخ ویرایش', show: true, key:'updated_at', align: 'center' },
        {name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center' },
        {name: 'عملیات', title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const bannerHeader =ref([
        { name: 'ردیف', title: 'ردیف', show: true , key:'row', sortable:false, align: 'center'},
        { name: 'تصویر', title: 'تصویر', show: true , key:'custom', sortable: false, align: 'center'},
        { name: 'دستگاه', title: 'دستگاه', show: true, key:'device_type' , sortable: false, align: 'center'},
        { name: 'لینک',  title: 'لینک', show: true , key:'link', sortable: false, align: 'center'},
        { name: 'ترتیب نمایش', title: 'ترتیب نمایش', show: true, key:'custom2', sortable: false, align: 'center' },
        { name: 'سازنده', title: 'سازنده', show: true, key:'admin', sortable: false, align: 'center' },
        { name: 'ذخیره', title: 'ذخیره', show: true, key:'custom3', sortable: false, align: 'center' },
        { name: 'وضعیت', title: 'وضعیت', show: true, key:'is_active', sortable: false, align: 'center' },
        { name: 'زمان ویرایش', title: 'زمان ویرایش', show: false, key:'updated_at', sortable: false, align: 'center' },
        { name: 'زمان شروع', title: 'زمان شروع', show: false, key:'started_at', sortable: false, align: 'center' },
        { name: 'زمان پایان', title: 'زمان پایان', show: false, key:'end_at', sortable: false, align: 'center' },
        { name: 'عملیات', title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const blogHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'تصویر', show: true , value:'image', order: false},
        { name: 'دستگاه', show: true, value:'device_type' , order: false},
        { name: 'لینک', show: true , value:'link', order: false},
        { name: 'ترتیب نمایش', show: true, value:'priority', order: false },
        { name: 'سازنده', show: true, value:'admin', order: false },
        { name: 'ذخیره', show: true, value:'save', order: false },
        { name: 'وضعیت', show: false, value:'is_active', order: false },
        { name: 'زمان ویرایش', show: false, value:'updated_at', order: false },
        { name: 'زمان شروع', show: false, value:'started_at', order: false },
        { name: 'زمان پایان', show: false, value:'end_at', order: false },
    ]);
    const brandHeader =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key:'row', sortable:false, align: 'center'},
        { name: 'تصویر',title: 'تصویر', show: true , key:'custom', sortable: false, align: 'center'},
        { name: 'نام برند',title: 'نام برند', show: true, key:'label' , sortable: false, align: 'center'},
        { name: 'توضیحات',title: 'توضیحات', show: true, key:'description' , sortable: false, align: 'center'},
        { name: 'لینک',title: 'لینک', show: true , key:'link', sortable: false, align: 'center'},
        { name: 'ترتیب نمایش',title: 'ترتیب نمایش', show: true, key:'custom2', sortable: false, align: 'center' },
        { name: 'سازنده',title: 'سازنده', show: true, key:'creator', sortable: false, align: 'center' },
        { name: 'ذخیره',title: 'ذخیره', show: true, key:'custom3', sortable: false, align: 'center' },
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true}
    ]);
    const categoryHeader =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'عنوان',title: 'عنوان', show: true , key:'label', sortable: false, align:'center'},
        { name: 'ترتیب نمایش',title: 'ترتیب نمایش', show: true, key:'custom' , sortable: false, align:'center'},
        { name: 'سازنده',title: 'سازنده', show: true , key:'creator', sortable: false, align:'center'},
        { name: 'دخیره',title: 'دخیره', show: true , key:'custom2', sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},

    ]);
    const homePageSkuHeader =ref([
        { name: 'ردیف',title: 'ردیف', show: true , value: 'row', sortable:false, align: 'center'},
        { name: 'شناسه کالا',title: 'شناسه کالا', show: true , value:'id', sortable: false, align: 'center'},
        { name: 'شناسه shps',title: 'شناسه shps', show: true, value:'shps' , sortable: false, align: 'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true , value:'label', sortable: false, align: 'center'},
        { name: 'نام فروشنده',title: 'نام فروشنده', show: true , value:'seller', sortable: false, align: 'center'},
        { name: 'قیمت فروش',title: 'قیمت فروش', show: true , value:'customer_price', sortable: false, align: 'center'},
        { name: 'ترتیب نمایش',title: 'ترتیب نمایش', show: true , value:'custom', sortable: false, align: 'center'},
        { name: 'ذخیره',title: 'ذخیره', show: true , value:'custom2', sortable: false, align: 'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const specialSalesHeader=ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align: 'center'},
        { name: 'عنوان',title: 'عنوان', show: true , key:'label', sortable: false, align: 'center'},
        { name: 'زمان شروع',title: 'زمان شروع', show: true, key:'start_time' , sortable: false, align: 'center'},
        { name: 'زمان پایان',title: 'زمان پایان', show: true , key:'end_time', sortable: false, align: 'center'},
        { name: 'سازنده',title: 'سازنده', show: true, key:'creator', sortable: false, align: 'center' },
        { name: 'وضعیت',title: 'وضعیت', show: true, key:'custom', sortable: false, align: 'center' },
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
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
        { name:'سازنده' , type: 'text', value:'admin'},
        { name:'ترتیب نمایش' , type: 'text', value:'priority'},
        { name:'وضعیت' , type: 'select', value:'active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

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
                    order_type:'desc',
                    homepage_section_id:route.params.sectionId,
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    homepage_section_id:route.params.sectionId,

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
                    order_type:'desc',
                    homepage_section_id:route.params.sectionId,

                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    homepage_section_id:route.params.sectionId,

                }
            }

        }
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/home/section/banner/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            loading.value = false
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            homePageBanner.value = data.data
        }
        else {
            loading.value = false
        }
    }

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
    }

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
    }

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
    };
    // function addPerPage(number){
    //     filter.page = 1
    //     filter.per_page =number
    //     router.push('/home-page/index'+ filter.params_generator(route.query))
    // }
    //
    // function addPagination(page){
    //     filter.page = page
    //     filter.per_page = dataTableLength.value
    //     router.push('/home-page/index'+ filter.params_generator(route.query))
    // }


    return {getHomeSection, getHomeSections,pageLength,filterBannerField, homeSection,homeSections,
        dataTableLength, page, sectionsHeader,loading , bannerHeader ,specialSalesHeader,specialSalesShpsHeader,
        getHomeBrand , homeBrand , homeSlider , brandHeader , getHomePartitionSlider , homePartitionSlider ,
        getHomePageCategory , homePageCategory , categoryHeader , getHomePageSingleCategory , homePageSingleCategory ,
        homePageSkuHeader , getHomePageBanner ,homePageBanner , homePageSingleSlider ,getHomePageSingleSlider ,
        getHomeSinglePartitionSlider , homeSinglePartitionSlider , blogHeader}
}

