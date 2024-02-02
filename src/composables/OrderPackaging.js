import {ref} from 'vue';
import {PanelFilter} from '@/assets/js/filter.js'
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const orderList = ref([])
    const orderListDetail = ref([])
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const barcodeNum = ref([])
    const extractedIds = ref(null)

    const cargoReceivingHeader = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: ' شناسه سفارش', show: true, value: 'id', order: false},
        {name: ' نام خریدار', show: true, value: 'name', order: false},
        {name: ' روش ارسال ', show: true, value: 'is_active', order: false},
        {name: 'استان/شهر ', show: true, value: 'is_active', order: false},
    ]);

    const detailInfo = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: ' شناسه shps', show: true, value: 'id', order: false},
        {name: ' نام کالا ', show: true, value: 'name', order: false},
        {name: '  شناسه کالا', show: true, value: 'id', order: false},
        {name: '  تعداد در سفارش ', show: true, value: 'number', order: false},
        {name: 'تعداد اسکن شده ', show: true, value: 'number', order: false},
    ]);
    const item = []
    const loading = ref(false)
    const filter = new PanelFilter()
    async function getOrderListDetail(packageId = null) {
        loading.value = true;
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = cookies.cookies.get('adminToken');
        AxiosMethod.end_point = `admin/order/crud/shps/detail/${packageId}`;
        try {
            let response = await AxiosMethod.axios_get();
            loading.value = false;
            if (response) {
                pageLength.value = response.data.last_page;

                orderListDetail.value = response.data
                console.log('data',response.data);
                extractedIds.value = [];

                response.data.forEach(item => {
                     extractedIds.value.push(item.id);

                });


            } else {
                orderListDetail.value = [];
            }
        } catch (error) {
            console.error("Error in API call:", error);
            loading.value = false;
            return [];
        }
    }

    async function getShpsList(packageId = null) {
        loading.value = true;
        let params = packageId ? {id: packageId} : {};
        let paramsQuery = filter.params_generator(params);
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken');
        AxiosMethod.end_point = `admin/order/crud/index${paramsQuery}`;
        try {
            let response = await AxiosMethod.axios_get();
            loading.value = false;
            if (response) {
                pageLength.value = response.data.last_page;
                orderList.value = response.data.data

                barcodeNum.value = [];

                orderList.value.forEach(item => {
                    barcodeNum.value.push(item.barcode);
                });
            }
        } catch (error) {
            console.error("Error in API call:", error);
            loading.value = false;
        }
    }
    return {
        getShpsList,
        dataTableLength,
        item,
        orderList,
        orderListDetail,
        getOrderListDetail,
        loading,
        cargoReceivingHeader,
        detailInfo,
        barcodeNum,
        extractedIds
    }
}

