import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const factorList = ref([]);
    const priceList = ref([])
    const templates =ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    // Factor table header
    const header =ref([
        { name: 'ردیف', title: 'ردیف', show: true , sortable:false, align:'center', key:'row'},
        { name: 'شناسه فاکتور', title: 'شناسه فاکتور', show: true, align:'center', key:'id' },
        { name: 'تامین کننده', title: 'تامین کننده', show: true, sortable: false, align:'center', key:'supplier'},
        { name: 'سازنده', title: 'سازنده', show: true , sortable: false, align:'center', key:'creator'},
        { name: 'شماره فاکتور تامین کننده', title: 'شماره فاکتور تامین کننده', show: true, sortable: false, align:'center', key:'factor_number' },
        { name: 'تاریخ ساخت', title: 'تاریخ ساخت', show: true, sortable: false, align:'center', key:'created_at_fa' },
        { name: 'وضعیت', title: 'وضعیت', show: true, sortable: false, align:'center', key:'custom' },
        { name: 'عملیات',title: 'عملیات', show: true , align:'center', sortable: false, key:'action' ,fixed: true},
    ]);

    const pricingHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true, value:'sku' , order: false},
        { name: 'تعداد درخواستی کالا', show: true , value:'shps_requested_count', order: false},
        { name: 'تعداد دریافتی کالا', show: true , value:'shps_received_count', order: false},
        { name: 'قیمت خرید', show: true, value:'buying_price', order: false },
        { name: 'قیمت مصرف کننده', show: true, value:'customer_price', order: false },
        { name: 'مجموع قیمت خرید درخواستی', show: true, value:'buying_price', order: false },
        { name: 'مجموع قیمت خرید دریافتی', show: true, value:'buying_price', order: false },
        { name: 'مجموع قیمت مصرف کننده درخواستی', show: true, value:'buying_price', order: false },
        { name: 'مجموع قیمت مصرف کننده دریافتی', show: false, value:'buying_price', order: false },
        { name: 'مجموع قیمت خرید', show: true, value:'sum_buying_price', order: false },
        { name: 'مجموع قیمت مصرف کننده', show: true, value:'sum_customer_price', order: false },
        { name: 'درصد سود', show: true, value:'profit', order: false },
    ]);

    const filterField = [
        {name:'شناسه فاکتور' , type:'text', value:'id'},
        { name:'سازنده' , type: 'select', value:'creator_id'},
        { name: 'تامین کننده', type:'select', value:'supplier_id'},
        { name: 'شماره فاکتور تامین کننده', type:'text', value:'factor_number'},
        { name: 'تاریخ ساخت', type: 'date', value: 'created_at'},
        { name: 'وضعیت', type:'select', value:'status'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    /**
     * Get factor list
     * @param {*} query 
     */
    async function getFactorList() {
        factorList.value = []
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
        AxiosMethod.end_point = `factor/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            factorList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
            loading.value = false
        }
    };

    /**
     * Get Price list of a factor
     * @param {*} query 
     */
    async function getPricingList() {
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
        AxiosMethod.end_point = `factor/crud/detail/${route.params.id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            priceList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    }

    return {
        templates,
        pageLength,
        filterField,
        factorList,
        getFactorList,
        dataTableLength,
        page,
        header,
        loading,
        pricingHeader,
        getPricingList,
        priceList
    }
}

