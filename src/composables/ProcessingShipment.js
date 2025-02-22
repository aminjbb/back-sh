import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useRoute} from 'vue-router'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const processingShipment = ref([],)
    const shipmentShpsList = ref([])
    const assignShpsAcceptList = ref([])
    const pageLength = ref(1)
    const cookies = useCookies()
    const route = useRoute()

    const header = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه محموله', show: true, value: 'id', order: false},
        {name: 'شناسه فاکتور', show: true, value: 'factor_id', order: false},
        {name: 'تعداد آیتم', show: true, value: 'number', order: false},
        {name: 'تنوع آیتم', show: true, value: 'variety', order: false},
        {name: 'نام سازنده', show: true, value: 'creator', order: false},
        {name: 'تاریخ ساخت', show: true, value: 'created_at', order: true},
        {name: 'تاریخ ویرایش', show: true, value: 'updated_at', order: true},
        {name: 'وضعیت', show: true, value: 'status', order: false},
    ]);
    const headerShps = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'نام کالا', show: true, value: 'label', order: false},
        {name: 'تعداد درخواستی', show: true, value: 'number', order: false},
        {name: 'تلورانس پایین', show: true, value: 'low_tolerance', order: false},
        {name: 'تلورانس بالا', show: true, value: 'high_tolerance', order: false},
        {name: 'تعداد باقیمانده', show: true, value: 'high_tolerance', order: false},
        {name: 'تعداد تایید شده', show: true, value: 'high_tolerance', order: false},
        {name: 'بارکد کالا', show: true, value: 'high_tolerance', order: false},
        {name: 'عکس', show: true, value: 'image_url', order: false},
        {name: 'ذخیره', show: true, value: 'high_tolerance', order: false},
    ]);
    const headerShpsSellerUpcoming = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'نام کالا', show: true, value: 'label', order: false},
        {name: 'تعداد درخواستی', show: true, value: 'number', order: false},
        {name: 'تعداد تایید شده', show: true, value: 'count', order: false},
        {name: 'قیمت خرید', show: true, value: 'price', order: false},
        {name: 'ذخیره', show: true, value: 'save', order: false},
    ]);
    const headerShpsSeller = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'نام کالا', show: true, value: 'label', order: false},
        {name: 'تعداد درخواستی', show: true, value: 'number', order: false},
        {name: 'تعداد تایید شده', show: true, value: 'high_tolerance', order: false},
    ]);
    const headerDetailShipment = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه SHPS', show: true, value: 'label', order: false},
        {name: 'نام کالا', show: true, value: 'number', order: false},
        {name: 'قیمت مصرف', show: true, value: 'high_tolerance', order: false},
        {name: 'تعداد کالا', show: true, value: 'high_tolerance', order: false},
        {name: 'قیمت مصرف کل', show: true, value: 'high_tolerance', order: false},
    ]);
    const headerAssignShpsToPackageAccept =ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'نام کالا', show: true, value: 'label', order: false},
        {name: 'تعداد باقی مانده', show: true, value: 'number', order: false},
        {name: 'تعداد تایید شده', show: true, value: 'count', order: false},
        {name: 'ذخیره', show: true, value: 'save', order: false},
    ]);

    const filterFieldAllRetail = [
        {name: 'شناسه محموله', type: 'text', value: 'retail_id', place: 'شناسه محموله'},
        {name: 'تعداد آیتم', type: 'text', value: 'count_from', place: 'از'},
        {name: 'تعداد آیتم', type: 'text', value: 'count_to', place: 'تا'},
        {name: 'شناسه فاکتور', type: 'text', value: 'factor_id', place: 'شناسه فاکتور'},
        {name: 'تنوع آیتم', type: 'text', value: 'number_from', place: 'از'},
        {name: 'تنوع آیتم', type: 'text', value: 'number_to', place: 'تا'},
        {name: 'نام سازنده', type: 'auto-complete', value: 'admin', place: 'نام سازنده'},
        {name: 'تاریخ ساخت', type: 'date', value: 'created_at', place: 'تاریخ ساخت'},
        {name: 'وضعیت', type: 'select', value: 'status', place: 'وضعیت'},
    ];

    const loading = ref(false)
    const isFilter = ref(false)
    const isFilterPage = ref(false)

    async function getRetailShipmentList() {
        let paramsQuery = null
        filter.factor = route.params.factorId
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
        AxiosMethod.end_point = `cargo/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            retailShipments.value = data.data.data
            loading.value = false
            setTimeout(() => {
                isFilter.value = false
                isFilterPage.value = false
            }, 2000)
        }
    };

    async function getShipmentShpslist() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/shps/count/list/${route.params.shipmentId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            shipmentShpsList.value = data.data?.shps_items
        }
    };

    async function getAssignShpsAcceptList() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/shps/assign/list/${route.params.shipmentId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            assignShpsAcceptList.value = data.data
        }
    }


    return {
        filterFieldAllRetail, getRetailShipmentList, processingShipment,headerAssignShpsToPackageAccept, shipmentShpsList,
        getAssignShpsAcceptList, assignShpsAcceptList, header, loading, headerShps, getShipmentShpslist,
        headerShpsSeller, headerDetailShipment, headerShpsSellerUpcoming
    }
}

