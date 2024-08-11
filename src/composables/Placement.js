import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const placementList = ref([]);
    const rowList = ref([]);
    const placement = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'شناسه شلف',title: 'شناسه شلف', show: true , key:'id', sortable: false, align:'center'},
        { name: 'شماره ردیف',title: 'شماره ردیف', show: true, key:'row_number' , sortable: false, align:'center'},
        { name: 'شماره قفسه',title: 'شماره قفسه', show: true , key:'placement_number', sortable: false, align:'center'},
        { name: 'شماره طبقه',title: 'شماره طبقه', show: true, key:'step_number', sortable: false, align:'center'},
        { name: 'شماره شلف',title: 'شماره شلف', show: true, key:'shelf_number', sortable: false, align:'center'},
        { name: 'تاریخ ایجاد',title: 'تاریخ ایجاد', show: true, key:'created_at_fa', sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        {name:'شناسه شلف' , type:'text', value:'id'},
        {name:'تاریخ ایجاد' , type:'date', value:'created_at'},
        {name:'شماره ردیف' , type:'text', value:'row_number_from'},
        {name:'شماره ردیف' , type:'text', value:'row_number_to'},
        {name:'شماره قفسه' , type: 'text', value:'placement_number_from'},
        {name:'شماره قفسه' , type: 'text', value:'placement_number_to'},
        {name:'شماره طبقه' , type: 'text', value:'step_number_from'},
        {name:'شماره طبقه' , type: 'text', value:'step_number_to'},
    ];

    const shpssHeader =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key:'row', sortable:false, align:'center'},
        { name: 'سریال shps',title: 'سریال shps', show: true , key:'id', sortable: false, align:'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true, key:'sku_label' , sortable: false, align:'center'},
        { name: 'تعداد کالا',title: 'تعداد کالا', show: true , key:'placement_count', sortable: false, align:'center'},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getPlacementList() {
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
        AxiosMethod.end_point = `placement/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            placementList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };

    async function getPlacement(id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `placement/crud/get/${id}`
        let data = await AxiosMethod.axios_get()
        if (data) {

            placement.value = data.data
        }
    };

    async function getRowList ( query) {
        const filter = {
            per_page : 1000000,
        }
        let rows = null;
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'placement/crud/index'
        AxiosMethod.form = filter
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            rows = data.data.data;

            rows.forEach(item => {
                if (!rowList.value.includes(item.row_number)) {
                    rowList.value.push(item.row_number);
                }
            })
        }
        else {
        }
    }

    return {pageLength,filterField, placementList , getPlacementList, dataTableLength, page, header,loading,
        shpssHeader  , getPlacement , placement,getRowList,rowList}
}

