import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const cargoList = ref([]);
    const cargoReceivingList = ref([]);
    const cargo = ref(null);
    const packageCargo = ref(null);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)

    const header = ref([
        {name:'ردیف' ,title:'ردیف' , show:true , key:'row', sortable: false, align: 'center'},
        {name:'شناسه کارگو' ,title:'شناسه کارگو' , show:true , key:'id', sortable: false, align: 'center'},
        {name:'نوع خودرو' ,title:'نوع خودرو' , show:true , key:'vehicle_type', sortable: false, align: 'center'},
        {name:'شماره پلاک' ,title:'شماره پلاک' , show:true ,  key:'license', sortable: false, align: 'center'},
        {name:'نام راننده ' ,title:'نام راننده ' , show:true, key:'driver_name', sortable: false, align: 'center'},
        {name:'شماره موبایل راننده' ,title:'شماره موبایل راننده' , show:true, key:'phone_number', sortable: false, align: 'center'},
        {name:'تعداد بسته' ,title:'تعداد بسته' , show:true, key:'package_count', sortable: false, align: 'center'},
        {name:'تاریخ ساخت' ,title:'تاریخ ساخت' , show:true, key:'created_at_fa', sortable: false, align: 'center'},
        {name:'تاریخ ویرایش' ,title:'تاریخ ویرایش' , show:true, key:'updated_at_fa', align: 'center'},
        {name:'وضعیت' ,title:'وضعیت' , show:true, key:'custom', sortable: false, align: 'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const packageHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'id', order: false},
        // {name:'نوع بسته' , show:true , value:'name', order: false},
        {name:'تعداد کالا' , show:true ,  value:'shps_count', order: false},
        {name:'وضعیت ' , show:true, value:'status', order: false},
    ]);
    const detailCargoHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'id', order: false},
        {name:'نوع بسته' , show:true , value:'type', order: false},
        {name:'تعداد کالا' , show:true ,  value:'shps_count', order: false},
    ]);

    const cargoReceivingHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'id', order: false},
        // {name:'نوع بسته' , show:true ,  value:'label', order: false},
        {name:'تعداد آیتم ' , show:true, value:'shps_variety', order: false},
        {name:'تعداد کالا ' , show:true, value:'shps_count', order: false},
        {name:'وضعیت ' , show:true, value:'status', order: false},
    ]);

    const filterField = [
        {name:'شناسه کارگو' , type:'text', value:'id'},
        {name:'نوع خودرو' , type:'text', value:'vehicle_type'},
        {name:'شماره پلاک ' , type:'text', value:'license'},
        { name:'نام راننده' , type: 'text', value:'driver_name'},
        { name:'تعداد بسته(از)' , type: 'text', value:'package_count'},
        { name:'تعداد بسته(تا)' , type: 'text', value:'package_count'},
        { name:'تاریخ ساخت' , type: 'text', value:'created_at_fa'},
        { name:'تاریخ ویرایش' , type: 'date', value:'updated_at_fa'},
        { name:'وضعیت' , type: 'date', value:'status'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getCargoList() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
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
        AxiosMethod.using_auth =true
        AxiosMethod.end_point = `cargo/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            cargoList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function  getCargoReceivingList(id , store) {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =true
        AxiosMethod.toast_error = true
        AxiosMethod.store = store
        AxiosMethod.end_point = `cargo/receive/${id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            cargoReceivingList.value = data.data

        }
    };

    async function getCargo() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =true
        AxiosMethod.end_point = `cargo/crud/get/${route.params.cargoId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            cargo.value = data.data
            loading.value = false
        }
    };

    async function getPackageCargo(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =true
        AxiosMethod.end_point = `cargo/crud/packages/${route.params.cargoId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            packageCargo.value = data.data
        }
    }

    return {
        pageLength,
        cargoList,
        getCargoList,
        dataTableLength ,
        page  ,
        header  ,
        filterField ,
        loading ,
        packageHeader ,
        cargoReceivingHeader ,
        getCargo ,
        cargo ,
        getPackageCargo ,
        packageCargo ,
        detailCargoHeader ,
        getCargoReceivingList ,
        cargoReceivingList}
}

