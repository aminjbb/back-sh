import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const rominaList = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    const header =ref( [
        {name:'ردیف', title:'ردیف', key:'row', show:true, align:'center', sortable: false},
        {name:'شناسه سفارش' , title:'شناسه سفارش',key:'order_id', show:true, align:'center', sortable: false},
        {name:'شماره سفارش' , title:'شماره سفارش', key:'order_number', show:true, align:'center', sortable: false},
        {name:'نام کاربر' ,title:'نام کاربر', key:'user_name', show:true, align:'center', sortable: false},
        {name:'شماره کاربر' ,title:'شماره کاربر', key:'phone_number', show:true,  align:'center', sortable: false},
        {name: 'وضعیت بارگیری',title: 'وضعیت بارگیری', show: true, key: 'packed_status', sortable: false, align:'center', model:'icon'},
        {name:'روش ارسال' , title:'روش ارسال' , show:true, key:'new_sending_method', sortable: false, align:'center'},
        {name: 'تاریخ ثبت سفارش',title: 'تاریخ ثبت سفارش', show: true, key: 'submit_date_fa', align:'center'},
        {name:'تاریخ دریافت' , title:'تاریخ دریافت' ,key:'receive_date_fa', show:true, align:'center'},
        {name: 'تاریخ ارسال سفارش',title: 'تاریخ ارسال سفارش', show: true, key: 'send_date_fa', align:'center'},
        {name: 'استان',title: 'استان', show: true, key: 'state', sortable: false, align:'center'},
        {name: 'شهر',title: 'شهر', show: true, key: 'city', sortable: false, align:'center'},
        {name: 'پرینت برچسب ارسال',title: 'پرینت برچسب ارسال', show: true, key: 'label', sortable: false, align:'center', model:'icon'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'شماره سفارش' , type:'text', value:'order_number'},
        {name:'شماره کاربر' , type:'text', value:'phone_number'},
        {name:'نام کاربر' , type:'text', value:'user_id'},
        {name:'وضعیت بارگیری' , type:'select', value:'packed_status'},
        {name:'روش ارسال' , type: 'select', value:'new_sending_method'},
        {name:'تاریخ دریافت' , type:'date', value:'created_at'},
        {name:'تاریخ ثبت سفارش' , type:'date', value:'created_at'},
        {name:'تاریخ ارسال سفارش' , type:'date', value:'logistic_at'},
        {name:'استان' , type:'select', value:'receive_state_id'},
        {name:'شهر' , type:'select', value:'receive_city_id'},
        {name:'پرینت برچسب ارسال' , type: 'select', value:'new_sending_method'}
    ];

    async function getRominaCampaignList() {
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/crud/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            rominaList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    return {
        pageLength,
        getRominaCampaignList,
        rominaList,
        filterField,
        dataTableLength,
        page,
        header ,
        loading
    }
}

