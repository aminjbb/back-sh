import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const orderList = ref([])
    const orderListDetail = ref([])
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)

   

    const cargoReceivingHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:' شناسه سفارش' , show:true , value:'id', order: false},
        {name:' نام خریدار' , show:true , value:'name', order: false},
        {name:' روش ارسال ' , show:true, value:'is_active', order: false},
        {name:'استان/شهر ' , show:true, value:'is_active', order: false},
    ]);

    const detailInfo = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:' شناسه shps' , show:true , value:'id', order: false},
        {name:' نام کالا ' , show:true , value:'name', order: false},
        {name:'  شناسه کالا' , show:true , value:'id', order: false},
        {name:'  تعداد در سفارش ' , show:true, value:'number', order: false},
        {name:'تعداد اسکن شده ' , show:true, value:'number', order: false},
    ]);


   

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    function extractNumberFromBarcode(barcode) {
        let parts = barcode.split("-");
        return parts.length >= 3 ? parts[1] : null;
    }

    async function getOrderListDetail(packageId = null) {
        loading.value = true;
       
        
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = cookies.cookies.get('adminToken');
        
        AxiosMethod.end_point = `admin/order/crud/shps/detail/${packageId}` ;
        
        try {
            let response = await AxiosMethod.axios_get();

    
            loading.value = false;
    
            if (response) {
                pageLength.value = response.data.last_page;
                this.$store.commit('set_shpsId',  item.shps);
                orderListDetail.value = response.data

               
            } else {
                orderListDetail.value = [];
            }
        } catch (error) {
            console.error("Error in API call:", error);
            loading.value = false;
            return [];
        }
    }
    async function getShpsList(packageId= null) {
        loading.value = true;
        let params = packageId ? { id: packageId } : {};
        let paramsQuery = filter.params_generator(params);
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken');
        AxiosMethod.end_point = `admin/order/crud/index${paramsQuery}`;
        try {
            let response = await AxiosMethod.axios_get();
            loading.value = false;
            if (response ) {

                pageLength.value = response.data.last_page;
                 orderList.value = response.data.data

                 orderList.value.forEach(item => {
                    let extractedNumber = extractNumberFromBarcode(item.barcode);
                    if (extractedNumber) {

                        console.log("Extracted:", item.barcode);
                        console.log("Extracted 11:", extractedNumber);
                        this.$store.commit('set_orderId',  extractedNumber);

                    }
                });


               
            } else {
                orderList.value = [];
            }
        } catch (error) {
            console.error("Error in API call:", error);
            loading.value = false;
            return [];
        }
    }

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/categories/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/categories/index'+ filter.params_generator(route.query))
    }


    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getCategories(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { pageLength,  addPerPage, getShpsList, dataTableLength , page   , item , orderList, orderListDetail, getOrderListDetail,
        loading  , cargoReceivingHeader, detailInfo}
}

