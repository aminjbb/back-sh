import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_placement.js'
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
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه شلف', show: true , value:'id', order: false},
        { name: 'شماره ردیف', show: true, value:'row_number' , order: false},
        { name: 'شماره قفسه', show: true , value:'placement_number', order: false},
        { name: 'شماره طبقه', show: true, value:'step_number', order: false },
        { name: 'شماره شلف', show: true, value:'shelf_number', order: false },
        { name: 'تاریخ ایجاد', show: true, value:'created_at', order: false },
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
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'سریال shps', show: true , value:'shipment_id', order: false},
        { name: 'نام کالا', show: true, value:'sku_label' , order: false},
        { name: 'تعداد کالا', show: true , value:'count', order: false},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

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

