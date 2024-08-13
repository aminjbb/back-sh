import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const driver = ref(null)
    const DriverManagementList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const headerDriver =ref([
        { title: 'ردیف', show: true , key: 'row', sortable: false, align:'center' },
        { title: ' شناسه راننده ', show: true , key:'id', sortable: false, align:'center'},
        { title: ' نام راننده', show: true,  key:'full_name', sortable: false, align:'center' },
        { title: '  کد ملی', show: true ,  key:'identification_code', sortable: false, align:'center' },
        { title: ' شماره موبایل', show: true,  key:'phone_number' , align:'center', sort: 'test' },
        { title: ' تاریخ ایجاد ', show: true, key:'created_at_fa' , sortable: false, align:'center' },
        { title: ' تاریخ ویرایش', show: true, key:'updated_at_fa' , sortable: false, align:'center' },
        { title: 'عملیات', key:'action', show: true, align:'center', sortable: false, fixed: true},
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
    const consignmentPrintList = ref([
        {
            id:28,
            shps_count:28,
            label: "کرم ضد آفتاب لافارر SPF 50 ظرفیت 40 میلی لیتر"
        },
        {
            id:28,
            shps_count:28,
            label: "مایع ظرفشویی گلرنگ حاوی رایحه پرتقال وزن 3500 گرم"
        },
        {
            id:28,
            shps_count:28,
            label:"دستمال توالت گلرنگ 3 لایه بسته2 عددی"
        },
        {
            id:28,
            shps_count:28,
            label: "سرم احیا کننده ابرو سریتا ظرفیت 8 میلی لیتر"
        },
        {
            id:28,
            shps_count:28,
            label: "رژ گونه مای مدل Natural کد 05"
        },
    ]);
    const headerConsignmentShipmentList = ref([
        { title: 'ردیف',key: 'row'},
        { title: 'شناسه محموله',key:'id' },
        { title:'تعداد آیتم' ,key:'shps_count' },
        { title:'تنوع آیتم' ,key:'shps_variety' },
        { title: 'تاریخ ساخت',key:'created_at'},
        { title: 'تاریخ ویرایش',key:'update_at'},
        { title: 'وضعیت',key:'status' },
        { title: 'عملیات', key:'action_shipment'},
    ])

    const headerQrcode =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: ' تعداد کلا ', show: true , value:'number', order: false},
    ]);
    
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    /**
     * Get page list
     * @param {*} query 
     */
    async function getDriverList() {
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

    async function getAllDriverList() {

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
    }

    return {   
         pageLength, filterField, headerShps, headerQrcode, DriverManagementList , getDriverList, getDriver,
        dataTableLength, page, headerDriver, loading, getAllDriverList, consignmentPrintList , headerConsignmentShipmentList
         }
}

