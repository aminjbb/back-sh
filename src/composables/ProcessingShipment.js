import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'

import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {RetailShipmentFilter} from "@/assets/js/retailShipmentFilter";
export default function setup() {
    const processingShipment =ref([
        {
            id: 21,
            sku_label: "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
            shps_count: 50,
            min_tolerance: 0,
            max_tolerance: 50,
            packed_count: 0,
            is_packed: 0
        },{
            id: 21,
            sku_label: "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
            shps_count: 50,
            min_tolerance: 0,
            max_tolerance: 50,
            packed_count: 0,
            is_packed: 0
        },{
            id: 21,
            sku_label: "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
            shps_count: 50,
            min_tolerance: 0,
            max_tolerance: 50,
            packed_count: 0,
            is_packed: 0
        },{
            id: 21,
            sku_label: "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
            shps_count: 50,
            min_tolerance: 0,
            max_tolerance: 50,
            packed_count: 0,
            is_packed: 0
        },

    ],)
    const shipmentShpsList =ref(null)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه محموله', show: true , value:'id', order: false},
        { name: 'شناسه فاکتور', show: true , value:'factor_id', order: false},
        { name: 'تعداد آیتم', show: true, value:'number' , order: false},
        { name: 'تنوع آیتم', show: true , value:'variety', order: false},
        { name: 'نام سازنده', show: true, value:'creator', order: false },
        { name: 'تاریخ ساخت', show: true, value:'created_at', order: true },
        { name: 'تاریخ ویرایش', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'status', order: false },
    ]);
    const headerShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد درخواستی', show: true, value:'number' , order: false},
        { name: 'تلورانس پایین', show: true , value:'low_tolerance', order: false},
        { name: 'تلورانس بالا', show: true, value:'high_tolerance', order: false },
        { name: 'تعداد تایید شده', show: true, value:'high_tolerance', order: false },
        { name: 'ذخیره', show: true, value:'high_tolerance', order: false },
    ]);
    const headerShpsSeller =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد درخواستی', show: true, value:'number' , order: false},
        { name: 'تعداد تایید شده', show: true, value:'high_tolerance', order: false },
        { name: 'ذخیره', show: true, value:'high_tolerance', order: false },
    ]);

    const headerDetailShipment =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه SHPS', show: true , value:'label', order: false},
        { name: 'نام کالا', show: true, value:'number' , order: false},
        { name: 'قیمت مصرف', show: true, value:'high_tolerance', order: false },
        { name: 'تعداد کالا', show: true, value:'high_tolerance', order: false },
        { name: 'قیمت مصرف کل', show: true, value:'high_tolerance', order: false },
    ]);

    const filterFieldAllRetail = [
        {name:'شناسه محموله' , type:'text', value:'retail_id' , place:'شناسه محموله'},
        { name:'تعداد آیتم' , type: 'text', value:'count_from' , place:'از'},
        { name: 'تعداد آیتم', type:'text', value:'count_to' , place:'تا'},
        { name: 'شناسه فاکتور', type:'text', value:'factor_id' , place:'شناسه فاکتور'},
        { name: 'تنوع آیتم', type:'text', value:'number_from', place:'از'},
        { name: 'تنوع آیتم', type:'text', value:'number_to', place:'تا'},
        { name: 'نام سازنده', type:'auto-complete', value:'admin', place:'نام سازنده'},
        { name: 'تاریخ ساخت', type:'date', value:'created_at', place:'تاریخ ساخت'},
        { name: 'وضعیت', type:'select', value:'status', place:'وضعیت'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new RetailShipmentFilter()
    async function getRetailShipmentList(query) {
        let paramsQuery = null
        filter.factor = route.params.factorId
        loading.value = true
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `cargo/crud/index/${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            retailShipments.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };
    async function getShipmentShpslist() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/packing/shps/list/${route.params.shipmentId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            shipmentShpsList.value = data.data

        }
    };


    return {filterFieldAllRetail, getRetailShipmentList,processingShipment,
          header, loading ,headerShps , getShipmentShpslist , shipmentShpsList , headerShpsSeller,
        headerDetailShipment}
}

