import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'

import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {DriverFilter} from "@/assets/js/filter_driver.js";


export default function setup() {
    const driver = ref(null)
    const DriverManagementList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: ' شناسه راننده ', show: true , value:'label', order: false},
        { name: ' نام راننده', show: true, value:'type' , order: false},
        { name: '  کد ملی', show: true , value:'id', order: false},
        { name: ' شماره موبایل', show: true, value:'created_at', order: false },
        { name: ' تاریخ ایجاد ', show: true, value:'updated_at', order: false },
        { name: ' تاریخ ویرایش', show: true, value:'is_index', order: false },
       
    ]);

    const filterField = [
        {name:' نام راننده' , type:'text', value:'full_name'},
        { name:' کد ملی' , type: 'text', value:'identification_code' },
        { name: ' شماره موبایل', type:'text', value:'phone_number' },
        
    ];
    const headerShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: ' قیمت خرید', show: true , value:'number', order: false},
        { name: ' قیمت مصرف', show: true, value:'number' , order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: ' قیمت خرید کل  ', show: true, value:'number' , order: false},
        { name: ' قیمت مصرف کل  ', show: true, value:'number' , order: false},
        { name: ' درصد سود ', show: true, value:'number' , order: false},
        

    ]);
    const headerQrcode =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: ' تعداد کلا ', show: true , value:'number', order: false},
    ]);
    
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new DriverFilter()

    /**
     * Get page list
     * @param {*} query 
     */
    async function getDriverList(query) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.form = {...route.query}
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `driver/crud/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            DriverManagementList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    };

    async function getDriver(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `driver/crud/get/${route.params.driverId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            driver.value = data.data
        }

        else {
        }
    }

    async function getAllDriverList(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `driver/crud/index?per_page=100000`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            DriverManagementList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/driver-management/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/driver-management/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {   
         pageLength, filterField, headerShps, headerQrcode, DriverManagementList ,addPerPage, getDriverList, getDriver,
        dataTableLength, page, header, loading, getAllDriverList
         }
}

