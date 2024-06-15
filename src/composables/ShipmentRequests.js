import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {RetailShipmentFilter} from "@/assets/js/filter_request_shipment";


export default function setup() {
    const ShipmentRequestsList = ref([]);
    const shipmentRequest = ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه محموله', show: true , value:'id', order: true},
        { name: 'نوع محموله', show: true, value:'type' , order: false},
        { name: ' تعداد آیتم', show: true , value:'id', order: false},
        { name: 'تنوع آیتم', show: true, value:'created_at', order: false },
        { name: 'نام فروشگاه ', show: true, value:'updated_at', order: false },
        { name: 'نام سازنده', show: true, value:'is_index', order: false },
        { name: 'تاریخ ارسال', show: true, value:'sent_at', order: true },
        { name: 'تاریخ ویرایش ', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);

    const filterField = [
        {name:'شناسه محموله' , type:'text', value:'id' , place:'شناسه محموله'},
        { name:'تعداد آیتم' , type: 'text', value:'shps_count_from' , place:'از'},
        { name: 'تعداد آیتم', type:'text', value:'shps_count_to' , place:'تا'},
        { name: 'شناسه فاکتور', type:'text', value:'factor_id' , place:'شناسه فاکتور'},
        { name: 'تنوع آیتم', type:'text', value:'shps_variety_from', place:'از'},
        { name: 'تنوع آیتم', type:'text', value:'shps_variety_to', place:'تا'},
        { name: 'نام سازنده', type:'auto-complete', value:'creator_id', place:'نام سازنده'},
        { name: 'تاریخ ارسال', type:'date', value:'created_at', place:'تاریخ ارسال'},
        { name: 'وضعیت', type:'select', value:'status', place:'وضعیت'},
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
    const filter = new RetailShipmentFilter()

    /**
     * Get page list
     * @param {*} query 
     */
    async function getShipmentRequestsList() {
        filter.factor = route.params.factorId
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
        AxiosMethod.end_point = `shipment/consignment/crud/requested/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            ShipmentRequestsList.value = data.data
            shipmentRequest.value = data.data.id


            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    }

    return {   
         pageLength, filterField, headerShps, headerQrcode, ShipmentRequestsList , getShipmentRequestsList,
        dataTableLength, page, header, loading, shipmentRequest
         }
}

