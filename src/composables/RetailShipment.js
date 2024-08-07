import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const retailShipments =ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()
    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'شناسه محموله',title: 'شناسه محموله', show: true , key:'id', sortable: false, align:'center'},
        { name: 'شناسه فاکتور',title: 'شناسه فاکتور', show: true , key:'factor_id', align:'center'},
        { name: 'تعداد آیتم',title: 'تعداد آیتم', show: true, key:'shps_count' , sortable: false, align:'center'},
        { name: 'تنوع آیتم',title: 'تنوع آیتم', show: true , key:'shps_variety', sortable: false, align:'center'},
        { name: 'نام سازنده',title: 'نام سازنده', show: true, key:'creator', sortable: false, align:'center'},
        { name: 'تاریخ ساخت',title: 'تاریخ ساخت', show: true, key:'created_at_fa', align:'center'},
        { name: 'تاریخ ویرایش',title: 'تاریخ ویرایش', show: true, key:'updated_at_fa', align:'center'},
        { name: 'وضعیت',title: 'وضعیت', show: true, key:'status', sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},

    ]);
    const headerShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: 'تلورانس پایین', show: true , value:'low_tolerance', order: false},
        { name: 'تلورانس بالا', show: true, value:'high_tolerance', order: false },
    ]);

    const filterFieldAllRetail = [
        {name:'شناسه محموله' , type:'text', value:'id' , place:'شناسه محموله'},
        { name:'تعداد آیتم' , type: 'text', value:'shps_count_from' , place:'از'},
        { name: 'تعداد آیتم', type:'text', value:'shps_count_to' , place:'تا'},
        { name: 'شناسه فاکتور', type:'text', value:'factor_id' , place:'شناسه فاکتور'},
        { name: 'تنوع آیتم', type:'text', value:'shps_variety_from', place:'از'},
        { name: 'تنوع آیتم', type:'text', value:'shps_variety_to', place:'تا'},
        { name: 'نام سازنده', type:'auto-complete', value:'creator_id', place:'نام سازنده'},
        { name: 'تاریخ ساخت', type:'date', value:'created_at', place:'تاریخ ساخت'},
        { name: 'وضعیت', type:'select', value:'status', place:'وضعیت'},
    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getRetailShipmentList() {
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
        AxiosMethod.end_point = `shipment/consignment/crud/index`
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
    }

    return {
        filterFieldAllRetail,
        getRetailShipmentList,
        retailShipments,
        pageLength ,
        dataTableLength,
        page,
        header,
        loading,
        headerShps
    }
}

