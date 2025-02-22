import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const itemList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'سریال کالا',title: 'سریال کالا', show: true , key:'shpss', sortable: false, align:'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true , key:'shps_label', sortable: false, align:'center'},
        { name: 'شناسه بسته',title: 'شناسه بسته', show: true , key:'package_id', sortable: false, align:'center'},
        { name: 'نوع بسته',title: 'نوع بسته', show: true, key:'package_type' , sortable: false, align:'center'},
        { name: 'شناسه محموله',title: 'شناسه محموله', show: true , key:'shipment_id', sortable: false, align:'center'},
        { name: 'نوع محموله',title: 'نوع محموله', show: true , key:'shipment_type', sortable: false, align:'center'},
        { name: 'نام فروشگاه',title: 'نام فروشگاه', show: true , key:'shopping_name', sortable: false, align:'center'},
        { name: 'نام سازنده',title: 'نام سازنده', show: true , key:'creator', sortable: false, align:'center'},
        { name: 'تاریخ افزودن به لیست',title: 'تاریخ افزودن به لیست', show: true , key:'created_at_fa', sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const createHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه بسته', show: true , value:'id', order: false},
        { name: 'نوع بسته', show: true, value:'type' , order: false},
        { name: 'نوع محموله', show: true , value:'shipment_type', order: false},
        { name: 'نام فروشگاه', show: true , value:'seller_name', order: false},
        { name: 'تامین کننده', show: true , value:'supplier', order: false},
        { name: 'سریال کالا', show: true , value:'license', order: false},
        { name: 'نام کالا', show: true , value:'shps_label', order: false},
        { name: 'نوع گزارش', show: true , value:'report_type', order: false},
        { name: 'تاریخ افزودن به لیست', show: true , value:'created_at', order: false},
    ]);

    const filterField = [
        { name: 'شناسه بسته', type:'text', value:'package_id'},
        { name: 'نوع بسته', type:'select', value:'type_package'},
        { name:'نوع محموله', type: 'select', value:'shipment_type'},
        { name: 'نام فروشگاه', type:'text', value:'shopping_name'},
        { name: 'تامین کننده', type:'select', value:'supplier_id'},
        { name: 'سریال کالا', type:'text', value:'shps_s'},
        { name: 'نام کالا', type:'text', value:'sku_label'},
        { name: 'نام ایجاد کننده', type:'select', value:'creator_id'},
        { name: 'تاریخ افزودن به لیست', type:'date', value:'created_at'},
    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getWasteAndLostList() {
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
                    order_type:'desc',
                    report_type:"wastage"
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    report_type:"wastage"
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
                    report_type:"wastage"
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    report_type:"wastage"
                }
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `report/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            itemList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    }

    return {pageLength, itemList , getWasteAndLostList, dataTableLength, page, header,loading, createHeader ,filterField}
}

